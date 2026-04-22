import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreditDto, CreditSource } from './dto/credit.dto';
import { PrismaClient } from '@prisma/client';

interface LoyaltyRules {
  stampsRequired?: number;
  pointsRequired?: number;
  pointsPerCredit?: number;
}

@Injectable()
export class LoyaltyService {
  constructor(private prisma: PrismaService) {}

  async credit(merchantId: string, staffUserId: string, dto: CreditDto) {
    let resolvedCustomerId: string;

    if (dto.source === CreditSource.QR_SCAN) {
      if (!dto.qrPayload) throw new BadRequestException('qrPayload required for QR_SCAN');
      const pass = await this.prisma.walletPass.findFirst({
        where: { qrPayload: dto.qrPayload, status: 'ACTIVE' },
      });
      if (!pass) throw new BadRequestException('Invalid or expired QR code');
      resolvedCustomerId = pass.customerId;
    } else {
      if (!dto.customerId) throw new BadRequestException('customerId required');
      resolvedCustomerId = dto.customerId;
    }

    const customerId = resolvedCustomerId;

    return this.prisma.$transaction(async (tx: PrismaClient) => {
      const [program, customer] = await Promise.all([
        tx.loyaltyProgram.findFirst({ where: { merchantId, status: 'ACTIVE' } }),
        tx.customer.findUnique({ where: { id: customerId }, select: { id: true, firstName: true } }),
      ]);
      if (!program) throw new NotFoundException('No active loyalty program');
      if (!customer) throw new NotFoundException('Customer not found');

      const rules = program.rulesJson as LoyaltyRules;

      let account = await tx.loyaltyAccount.findUnique({
        where: {
          merchantId_customerId_loyaltyProgramId: {
            merchantId,
            customerId: customerId,
            loyaltyProgramId: program.id,
          },
        },
      });

      if (!account) {
        account = await tx.loyaltyAccount.create({
          data: {
            merchantId,
            customerId: customerId,
            loyaltyProgramId: program.id,
          },
        });
      }

      const isStamps = program.type === 'STAMPS';
      const stampsDelta = isStamps ? 1 : 0;
      const pointsDelta = !isStamps ? (rules.pointsPerCredit ?? 1) : 0;

      // Append event (immutable)
      await tx.loyaltyEvent.create({
        data: {
          merchantId,
          customerId: customerId,
          loyaltyProgramId: program.id,
          locationId: dto.locationId ?? null,
          staffUserId,
          source: dto.source,
          eventType: 'CREDIT',
          stampsDelta,
          pointsDelta,
          metadataJson: {},
        },
      });

      const newStamps = account.stampsBalance + stampsDelta;
      const newPoints = account.pointsBalance + pointsDelta;

      const updatedAccount = await tx.loyaltyAccount.update({
        where: { id: account.id },
        data: {
          stampsBalance: newStamps,
          pointsBalance: newPoints,
          totalEarned: { increment: 1 },
          lastActivityAt: new Date(),
        },
      });

      // Check reward threshold
      let rewardUnlocked: boolean = false;
      let rewardLabel: string | undefined;
      const threshold = isStamps
        ? rules.stampsRequired ?? 10
        : rules.pointsRequired ?? 100;

      const currentValue = isStamps ? newStamps : newPoints;
      const previousValue = isStamps
        ? account.stampsBalance
        : account.pointsBalance;

      if (Math.floor(currentValue / threshold) > Math.floor(previousValue / threshold)) {
        const policy = program.rewardPolicyJson as { label: string; value: string };

        await tx.reward.create({
          data: {
            merchantId,
            customerId: customerId,
            loyaltyProgramId: program.id,
            rewardType: policy.label ?? 'reward',
            rewardValue: policy.value ?? '',
            expiresAt: this.rewardExpiresAt(),
          },
        });

        // Append redeem event
        await tx.loyaltyEvent.create({
          data: {
            merchantId,
            customerId: customerId,
            loyaltyProgramId: program.id,
            locationId: dto.locationId ?? null,
            staffUserId,
            source: dto.source,
            eventType: 'REDEEM',
            stampsDelta: isStamps ? -threshold : 0,
            pointsDelta: !isStamps ? -threshold : 0,
            metadataJson: { reason: 'reward_unlocked' },
          },
        });

        // Reset balance after unlock
        await tx.loyaltyAccount.update({
          where: { id: account.id },
          data: {
            stampsBalance: isStamps ? newStamps - threshold : newStamps,
            pointsBalance: !isStamps ? newPoints - threshold : newPoints,
          },
        });

        rewardUnlocked = true;
        rewardLabel = policy.label;
      }

      const finalBalance = isStamps
        ? (rewardUnlocked ? newStamps - threshold : newStamps)
        : (rewardUnlocked ? newPoints - threshold : newPoints);

      return {
        customerId: customer.id,
        customerName: customer.firstName,
        stampsBalance: finalBalance,
        rewardUnlocked,
        rewardLabel,
        threshold,
      };
    });
  }

  async redeemReward(merchantId: string, staffUserId: string, rewardId: string) {
    const reward = await this.prisma.reward.findFirst({
      where: { id: rewardId, merchantId, status: 'AVAILABLE' },
    });
    if (!reward) throw new NotFoundException('Reward not found or already redeemed');

    if (reward.expiresAt && reward.expiresAt < new Date()) {
      throw new UnprocessableEntityException('Reward expired');
    }

    return this.prisma.$transaction(async (tx: PrismaClient) => {
      const updated = await tx.reward.update({
        where: { id: rewardId },
        data: { status: 'REDEEMED', redeemedAt: new Date() },
      });

      const program = await tx.loyaltyProgram.findUnique({
        where: { id: reward.loyaltyProgramId },
      });

      await tx.loyaltyEvent.create({
        data: {
          merchantId,
          customerId: reward.customerId,
          loyaltyProgramId: reward.loyaltyProgramId,
          staffUserId,
          source: 'REWARD_REDEEM',
          eventType: 'REDEEM',
          stampsDelta: 0,
          pointsDelta: 0,
          metadataJson: { rewardId, rewardValue: reward.rewardValue },
        },
      });

      return { reward: updated, program };
    });
  }

  async getAccount(merchantId: string, customerId: string) {
    const account = await this.prisma.loyaltyAccount.findFirst({
      where: { merchantId, customerId },
      include: { loyaltyProgram: true },
    });
    if (!account) throw new NotFoundException('Loyalty account not found');

    const availableRewards = await this.prisma.reward.findMany({
      where: { merchantId, customerId, status: 'AVAILABLE' },
    });

    const recentEvents = await this.prisma.loyaltyEvent.findMany({
      where: { merchantId, customerId },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });

    return { account, availableRewards, recentEvents };
  }

  private rewardExpiresAt(): Date {
    const d = new Date();
    d.setDate(d.getDate() + 90);
    return d;
  }
}

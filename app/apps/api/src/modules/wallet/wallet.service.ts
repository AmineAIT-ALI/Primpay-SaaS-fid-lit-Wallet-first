import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class WalletService {
  constructor(private prisma: PrismaService) {}

  async getCard(publicId: string) {
    const customer = await this.prisma.customer.findUnique({
      where: { publicId: publicId.toUpperCase() },
      include: {
        walletPasses: {
          where: { status: 'ACTIVE' },
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
        loyaltyAccounts: {
          include: {
            loyaltyProgram: {
              select: {
                name: true,
                type: true,
                rulesJson: true,
                rewardPolicyJson: true,
                merchant: { select: { name: true } },
              },
            },
          },
          take: 1,
        },
      },
    });

    if (!customer) throw new NotFoundException('Card not found');

    const pass = customer.walletPasses[0];
    const account = customer.loyaltyAccounts[0];
    const program = account?.loyaltyProgram;
    const rules = program?.rulesJson as { stampsRequired?: number } | undefined;

    return {
      customerId: customer.id,
      publicId: customer.publicId,
      firstName: customer.firstName,
      merchantName: program?.merchant.name ?? '',
      programName: program?.name ?? '',
      stampsBalance: account?.stampsBalance ?? 0,
      stampsRequired: rules?.stampsRequired ?? 10,
      rewardLabel: (program?.rewardPolicyJson as { label?: string } | undefined)?.label ?? '',
      qrPayload: pass?.qrPayload ?? null,
    };
  }
}

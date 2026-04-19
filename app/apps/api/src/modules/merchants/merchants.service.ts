import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import * as bcrypt from 'bcryptjs';

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

@Injectable()
export class MerchantsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateMerchantDto) {
    const slug = dto.slug ?? toSlug(dto.name);

    const existing = await this.prisma.merchant.findUnique({ where: { slug } });
    if (existing) throw new ConflictException(`Slug "${slug}" already taken`);

    const existingUser = await this.prisma.staffUser.findUnique({
      where: { email: dto.ownerEmail },
    });
    if (existingUser) throw new ConflictException('Email already registered');

    const passwordHash = await bcrypt.hash(dto.ownerPassword, 12);

    const trialEndsAt = new Date();
    trialEndsAt.setDate(trialEndsAt.getDate() + 14);

    return this.prisma.$transaction(async (tx) => {
      const merchant = await tx.merchant.create({
        data: {
          name: dto.name,
          slug,
          status: 'TRIAL',
          locations: {
            create: {
              name: dto.locationName,
              address: dto.address,
              city: dto.city,
            },
          },
        },
        include: { locations: true },
      });

      const location = merchant.locations[0];

      const owner = await tx.staffUser.create({
        data: {
          merchantId: merchant.id,
          locationId: location.id,
          email: dto.ownerEmail,
          passwordHash,
          role: 'OWNER',
          status: 'ACTIVE',
        },
      });

      const now = new Date();
      await tx.subscription.create({
        data: {
          merchantId: merchant.id,
          planCode: 'SOLO_29',
          status: 'TRIALING',
          trialEndsAt,
          currentPeriodStart: now,
          currentPeriodEnd: trialEndsAt,
        },
      });

      // Default loyalty program (stamps, 10 stamps = 1 reward)
      await tx.loyaltyProgram.create({
        data: {
          merchantId: merchant.id,
          name: 'Programme fidélité',
          type: 'STAMPS',
          status: 'ACTIVE',
          rulesJson: { stampsRequired: 10 },
          rewardPolicyJson: { label: 'Récompense offerte', value: '1 article offert' },
        },
      });

      return { merchant, owner: { id: owner.id, email: owner.email, role: owner.role } };
    });
  }

  async findById(merchantId: string) {
    const merchant = await this.prisma.merchant.findUnique({
      where: { id: merchantId },
      include: {
        locations: true,
        subscription: true,
        loyaltyPrograms: { where: { status: 'ACTIVE' } },
      },
    });
    if (!merchant) throw new NotFoundException('Merchant not found');
    return merchant;
  }

  async getStats(merchantId: string) {
    const [totalCustomers, totalEvents, activeRewards] = await Promise.all([
      this.prisma.loyaltyAccount.count({ where: { merchantId } }),
      this.prisma.loyaltyEvent.count({ where: { merchantId } }),
      this.prisma.reward.count({ where: { merchantId, status: 'AVAILABLE' } }),
    ]);

    const recentEvents = await this.prisma.loyaltyEvent.findMany({
      where: { merchantId },
      orderBy: { createdAt: 'desc' },
      take: 5,
      include: {
        customer: { select: { firstName: true, publicId: true } },
      },
    });

    return { totalCustomers, totalEvents, activeRewards, recentEvents };
  }
}

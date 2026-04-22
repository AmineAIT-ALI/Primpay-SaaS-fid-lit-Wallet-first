import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { SearchCustomerDto } from './dto/search-customer.dto';

function generatePublicId(firstName: string): string {
  const prefix = firstName.slice(0, 4).toUpperCase().padEnd(4, 'X');
  const suffix = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${suffix}`;
}

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  async create(merchantId: string, dto: CreateCustomerDto) {
    const existing = await this.prisma.customer.findFirst({
      where: { phone: dto.phone },
    });
    if (existing) throw new ConflictException('Phone already registered');

    let publicId: string;
    let attempts = 0;
    // Collision-safe publicId generation (extremely rare after ~1K customers)
    do {
      publicId = generatePublicId(dto.firstName);
      const taken = await this.prisma.customer.findUnique({ where: { publicId } });
      if (!taken) break;
      attempts++;
    } while (attempts < 5);

    const customer = await this.prisma.customer.create({
      data: {
        firstName: dto.firstName,
        phone: dto.phone,
        email: dto.email,
        publicId: publicId!,
      },
    });

    // Auto-enroll in the merchant's active loyalty program
    const program = await this.prisma.loyaltyProgram.findFirst({
      where: { merchantId, status: 'ACTIVE' },
    });

    if (program) {
      await this.prisma.loyaltyAccount.create({
        data: {
          merchantId,
          customerId: customer.id,
          loyaltyProgramId: program.id,
        },
      });
    }

    return customer;
  }

  async search(merchantId: string, dto: SearchCustomerDto) {
    const term = dto.q?.trim() ?? dto.phone ?? dto.publicId;
    if (!term) return [];

    const customers = await this.prisma.customer.findMany({
      where: {
        // IDOR fix: only return customers enrolled with this merchant
        loyaltyAccounts: { some: { merchantId } },
        OR: [
          { phone: { contains: term } },
          { firstName: { contains: term, mode: 'insensitive' } },
          { publicId: { equals: term.toUpperCase() } },
        ],
      },
      take: 10,
      include: {
        loyaltyAccounts: {
          where: { merchantId },
          select: { stampsBalance: true, pointsBalance: true },
        },
      },
    });

    return customers.map((c) => ({
      id: c.id,
      firstName: c.firstName,
      phone: c.phone,
      stampsBalance: c.loyaltyAccounts[0]?.stampsBalance ?? 0,
    }));
  }

  async findById(customerId: string, merchantId: string) {
    const customer = await this.prisma.customer.findUnique({
      where: { id: customerId },
      include: {
        loyaltyAccounts: {
          where: { merchantId },
          include: { loyaltyProgram: true },
        },
        rewards: {
          where: { merchantId, status: 'AVAILABLE' },
        },
      },
    });
    if (!customer) throw new NotFoundException('Customer not found');
    return customer;
  }

  // Recent customers for "derniers clients" quick-credit mode
  async getRecent(merchantId: string, limit = 10) {
    const recentEvents = await this.prisma.loyaltyEvent.findMany({
      where: { merchantId },
      orderBy: { createdAt: 'desc' },
      take: limit * 3, // over-fetch to deduplicate
      distinct: ['customerId'],
      include: {
        customer: {
          include: {
            loyaltyAccounts: {
              where: { merchantId },
              select: { stampsBalance: true, pointsBalance: true },
            },
          },
        },
      },
    });

    return recentEvents
      .map((e) => e.customer)
      .filter(Boolean)
      .slice(0, limit)
      .map((c) => ({
        id: c.id,
        firstName: c.firstName,
        phone: c.phone,
        stampsBalance: c.loyaltyAccounts[0]?.stampsBalance ?? 0,
        lastVisitAt: recentEvents.find((ev) => ev.customerId === c.id)?.createdAt,
      }));
  }
}

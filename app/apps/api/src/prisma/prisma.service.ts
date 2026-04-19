import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

function createPrismaClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error('DATABASE_URL is not set');
  const adapter = new PrismaPg({ connectionString });
  return new PrismaClient({ adapter });
}

@Injectable()
export class PrismaService implements OnModuleDestroy {
  readonly db: PrismaClient = createPrismaClient();

  get customer() { return this.db.customer; }
  get walletPass() { return this.db.walletPass; }
  get merchant() { return this.db.merchant; }
  get merchantLocation() { return this.db.merchantLocation; }
  get staffUser() { return this.db.staffUser; }
  get loyaltyProgram() { return this.db.loyaltyProgram; }
  get loyaltyAccount() { return this.db.loyaltyAccount; }
  get loyaltyEvent() { return this.db.loyaltyEvent; }
  get reward() { return this.db.reward; }
  get subscription() { return this.db.subscription; }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  $transaction(...args: any[]): any {
    return (this.db.$transaction as any)(...args);
  }

  async onModuleDestroy() {
    await this.db.$disconnect();
  }
}

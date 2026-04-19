import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcryptjs';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL ?? 'postgresql://primpay:primpay@localhost:5432/primpay_dev',
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Seeding...');

  const passwordHash = await bcrypt.hash('password123', 12);

  // Merchant pilote
  const merchant = await prisma.merchant.upsert({
    where: { slug: 'la-bonne-pizza' },
    update: {},
    create: {
      name: 'La Bonne Pizza',
      slug: 'la-bonne-pizza',
      status: 'ACTIVE',
    },
  });

  const location = await prisma.merchantLocation.upsert({
    where: { id: 'seed-location-001' },
    update: {},
    create: {
      id: 'seed-location-001',
      merchantId: merchant.id,
      name: 'La Bonne Pizza - Centre',
      address: '12 rue de la Paix',
      city: 'Lille',
    },
  });

  const owner = await prisma.staffUser.upsert({
    where: { email: 'owner@labonnepizza.fr' },
    update: {},
    create: {
      merchantId: merchant.id,
      locationId: location.id,
      email: 'owner@labonnepizza.fr',
      passwordHash,
      role: 'OWNER',
      status: 'ACTIVE',
    },
  });

  await prisma.staffUser.upsert({
    where: { email: 'staff@labonnepizza.fr' },
    update: {},
    create: {
      merchantId: merchant.id,
      locationId: location.id,
      email: 'staff@labonnepizza.fr',
      passwordHash,
      role: 'STAFF',
      status: 'ACTIVE',
    },
  });

  const now = new Date();
  const trialEnd = new Date(now);
  trialEnd.setDate(trialEnd.getDate() + 14);

  await prisma.subscription.upsert({
    where: { merchantId: merchant.id },
    update: {},
    create: {
      merchantId: merchant.id,
      planCode: 'SOLO_29',
      status: 'ACTIVE',
      currentPeriodStart: now,
      currentPeriodEnd: trialEnd,
    },
  });

  const program = await prisma.loyaltyProgram.upsert({
    where: { id: 'seed-program-001' },
    update: {},
    create: {
      id: 'seed-program-001',
      merchantId: merchant.id,
      name: 'Programme fidélité La Bonne Pizza',
      type: 'STAMPS',
      status: 'ACTIVE',
      rulesJson: { stampsRequired: 10 },
      rewardPolicyJson: { label: 'Pizza offerte', value: '1 pizza margherita offerte' },
    },
  });

  // 3 customers de test
  const customersData = [
    { firstName: 'Alice', phone: '+33600000001', publicId: 'ALIC-1001' },
    { firstName: 'Bob', phone: '+33600000002', publicId: 'BOB_-1002' },
    { firstName: 'Carlos', phone: '+33600000003', publicId: 'CARL-1003' },
  ];

  for (const c of customersData) {
    const customer = await prisma.customer.upsert({
      where: { publicId: c.publicId },
      update: {},
      create: { ...c },
    });

    await prisma.loyaltyAccount.upsert({
      where: {
        merchantId_customerId_loyaltyProgramId: {
          merchantId: merchant.id,
          customerId: customer.id,
          loyaltyProgramId: program.id,
        },
      },
      update: {},
      create: {
        merchantId: merchant.id,
        customerId: customer.id,
        loyaltyProgramId: program.id,
        stampsBalance: Math.floor(Math.random() * 8),
      },
    });
  }

  console.log('✅ Seed complete');
  console.log(`   Merchant: ${merchant.name} (id: ${merchant.id})`);
  console.log(`   Owner: owner@labonnepizza.fr / password123`);
  console.log(`   Staff:  staff@labonnepizza.fr / password123`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

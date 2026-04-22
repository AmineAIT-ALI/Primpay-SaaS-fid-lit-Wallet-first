import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as QRCode from 'qrcode';
import * as crypto from 'crypto';
import * as path from 'path';
import * as fs from 'fs';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL ?? 'postgresql://primpay:primpay@localhost:5432/primpay_dev',
});
const prisma = new PrismaClient({ adapter });

async function main() {
  const customers = await prisma.customer.findMany({
    select: { id: true, firstName: true, phone: true, publicId: true },
  });

  if (customers.length === 0) {
    console.error('No customers found — run pnpm db:seed first');
    process.exit(1);
  }

  console.log('\nClients disponibles:');
  customers.forEach((c, i) => console.log(`  ${i + 1}. ${c.firstName} (${c.phone}) — id: ${c.id}`));

  const outDir = path.join(__dirname, '../qr-codes');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

  for (const customer of customers) {
    // Check if already has an active pass
    let pass = await prisma.walletPass.findFirst({
      where: { customerId: customer.id, status: 'ACTIVE' },
    });

    if (!pass) {
      const qrPayload = `primpay:${crypto.randomUUID()}`;
      const qrSignature = crypto
        .createHmac('sha256', 'dev_secret')
        .update(qrPayload)
        .digest('hex');

      pass = await prisma.walletPass.create({
        data: {
          customerId: customer.id,
          qrPayload,
          qrSignature,
          status: 'ACTIVE',
        },
      });
      console.log(`\n✅ WalletPass créé pour ${customer.firstName}`);
    } else {
      console.log(`\nℹ️  WalletPass existant pour ${customer.firstName}`);
    }

    const outFile = path.join(outDir, `${customer.firstName.toLowerCase()}.png`);
    await QRCode.toFile(outFile, pass.qrPayload, {
      width: 400,
      margin: 2,
      color: { dark: '#1B2F5E', light: '#FFFFFF' },
    });

    console.log(`   qrPayload : ${pass.qrPayload}`);
    console.log(`   QR image  : ${outFile}`);
  }

  console.log('\n🎉 QR codes générés dans apps/api/qr-codes/');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

import { Injectable, Logger } from '@nestjs/common';
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import JSZip from 'jszip';

interface CardData {
  publicId: string;
  firstName: string;
  merchantName: string;
  programName: string;
  stampsBalance: number;
  stampsRequired: number;
  rewardLabel: string;
  qrPayload: string | null;
}

@Injectable()
export class PkpassService {
  private readonly logger = new Logger(PkpassService.name);

  async generate(card: CardData): Promise<Buffer> {
    const passJson = this.buildPassJson(card);
    const zip = new JSZip();

    zip.file('pass.json', JSON.stringify(passJson));

    // Manifest — SHA1 of each file
    const manifest: Record<string, string> = {
      'pass.json': crypto.createHash('sha1').update(JSON.stringify(passJson)).digest('hex'),
    };

    // Add icon placeholders (1x1 white PNG — replace with real assets for prod)
    const icon1px = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwADhQGAWjR9awAAAABJRU5ErkJggg==',
      'base64',
    );
    zip.file('icon.png', icon1px);
    zip.file('icon@2x.png', icon1px);
    zip.file('logo.png', icon1px);
    zip.file('logo@2x.png', icon1px);

    manifest['icon.png'] = crypto.createHash('sha1').update(icon1px).digest('hex');
    manifest['icon@2x.png'] = manifest['icon.png'];
    manifest['logo.png'] = manifest['icon.png'];
    manifest['logo@2x.png'] = manifest['icon.png'];

    zip.file('manifest.json', JSON.stringify(manifest));

    // Signature — use real cert if available, otherwise unsigned (dev only)
    const certPath = process.env.APPLE_PASS_CERT_PATH;
    const keyPath = process.env.APPLE_PASS_KEY_PATH;
    const wwdrPath = process.env.APPLE_WWDR_CERT_PATH;

    if (certPath && keyPath && wwdrPath) {
      try {
        const signature = this.signManifest(manifest, certPath, keyPath, wwdrPath);
        zip.file('signature', signature);
      } catch (err) {
        this.logger.warn('Pass signing failed, generating unsigned pass (dev only)', err);
        zip.file('signature', Buffer.alloc(0));
      }
    } else {
      this.logger.warn('Apple Wallet certs not configured — generating unsigned pass (dev only)');
      zip.file('signature', Buffer.alloc(0));
    }

    return zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' });
  }

  private buildPassJson(card: CardData) {
    const passTypeId = process.env.APPLE_PASS_TYPE_ID ?? 'pass.com.primpay.dev';
    const teamId = process.env.APPLE_TEAM_ID ?? 'DEVTEAMID';

    return {
      formatVersion: 1,
      passTypeIdentifier: passTypeId,
      serialNumber: card.publicId,
      teamIdentifier: teamId,
      organizationName: 'Primpay',
      description: `${card.merchantName} — Carte fidélité`,
      foregroundColor: 'rgb(255, 255, 255)',
      backgroundColor: 'rgb(27, 47, 94)',
      labelColor: 'rgb(255, 255, 255)',
      logoText: card.merchantName,
      storeCard: {
        headerFields: [
          {
            key: 'balance',
            label: 'TAMPONS',
            value: `${card.stampsBalance}/${card.stampsRequired}`,
          },
        ],
        primaryFields: [
          {
            key: 'name',
            label: 'CLIENT',
            value: card.firstName,
          },
        ],
        secondaryFields: [
          {
            key: 'reward',
            label: 'RÉCOMPENSE',
            value: card.rewardLabel || 'À débloquer',
          },
        ],
        auxiliaryFields: [
          {
            key: 'program',
            label: 'PROGRAMME',
            value: card.programName,
          },
        ],
        backFields: [
          {
            key: 'publicId',
            label: 'Code client',
            value: card.publicId,
          },
          {
            key: 'info',
            label: 'Info',
            value: 'Présentez ce QR code en caisse pour cumuler vos tampons.',
          },
        ],
      },
      barcode: card.qrPayload
        ? {
            message: card.qrPayload,
            format: 'PKBarcodeFormatQR',
            messageEncoding: 'iso-8859-1',
            altText: card.publicId,
          }
        : undefined,
    };
  }

  private signManifest(
    manifest: Record<string, string>,
    certPath: string,
    keyPath: string,
    wwdrPath: string,
  ): Buffer {
    const manifestStr = JSON.stringify(manifest);
    const cert = fs.readFileSync(path.resolve(certPath));
    const key = fs.readFileSync(path.resolve(keyPath));
    const wwdr = fs.readFileSync(path.resolve(wwdrPath));

    const sign = crypto.createSign('SHA1');
    sign.update(manifestStr);
    const signature = sign.sign({ key: key.toString(), passphrase: process.env.APPLE_PASS_KEY_PASSPHRASE });

    // DER-encoded PKCS#7 detached signature (simplified — use @peculiar/cms for full compliance in prod)
    return signature;
  }
}

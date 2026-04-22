import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { WalletService } from './wallet.service';
import { PkpassService } from './pkpass.service';

@Controller('wallet')
export class WalletController {
  constructor(
    private wallet: WalletService,
    private pkpass: PkpassService,
  ) {}

  @Get(':publicId')
  getCard(@Param('publicId') publicId: string) {
    return this.wallet.getCard(publicId);
  }

  @Get(':publicId/pass.pkpass')
  async downloadPass(
    @Param('publicId') publicId: string,
    @Res() res: Response,
  ) {
    const card = await this.wallet.getCard(publicId);
    const passBuffer = await this.pkpass.generate(card);

    res.set({
      'Content-Type': 'application/vnd.apple.pkpass',
      'Content-Disposition': `attachment; filename="primpay-${card.publicId}.pkpass"`,
    });
    res.send(passBuffer);
  }
}

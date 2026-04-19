import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { MerchantsService } from './merchants.service';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { MerchantId } from '../../common/decorators/merchant-id.decorator';

@Controller('merchants')
export class MerchantsController {
  constructor(private merchants: MerchantsService) {}

  // Public — called during signup / onboarding
  @Post()
  create(@Body() dto: CreateMerchantDto) {
    return this.merchants.create(dto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMe(@MerchantId() merchantId: string) {
    return this.merchants.findById(merchantId);
  }

  @Get('me/stats')
  @UseGuards(JwtAuthGuard)
  getStats(@MerchantId() merchantId: string) {
    return this.merchants.getStats(merchantId);
  }
}

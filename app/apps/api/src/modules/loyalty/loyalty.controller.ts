import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { LoyaltyService } from './loyalty.service';
import { CreditDto } from './dto/credit.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { MerchantId } from '../../common/decorators/merchant-id.decorator';

interface AuthRequest extends Request {
  user: { id: string; merchantId: string };
}

@Controller('loyalty')
@UseGuards(JwtAuthGuard)
export class LoyaltyController {
  constructor(private loyalty: LoyaltyService) {}

  @Post('credit')
  credit(
    @MerchantId() merchantId: string,
    @Request() req: AuthRequest,
    @Body() dto: CreditDto,
  ) {
    return this.loyalty.credit(merchantId, req.user.id, dto);
  }

  @Post('rewards/:rewardId/redeem')
  redeem(
    @MerchantId() merchantId: string,
    @Request() req: AuthRequest,
    @Param('rewardId') rewardId: string,
  ) {
    return this.loyalty.redeemReward(merchantId, req.user.id, rewardId);
  }

  @Get('customers/:customerId/account')
  getAccount(
    @MerchantId() merchantId: string,
    @Param('customerId') customerId: string,
  ) {
    return this.loyalty.getAccount(merchantId, customerId);
  }
}

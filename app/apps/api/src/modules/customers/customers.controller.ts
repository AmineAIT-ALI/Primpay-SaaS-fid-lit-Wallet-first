import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { SearchCustomerDto } from './dto/search-customer.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { MerchantId } from '../../common/decorators/merchant-id.decorator';

@Controller('customers')
@UseGuards(JwtAuthGuard)
export class CustomersController {
  constructor(private customers: CustomersService) {}

  @Post()
  create(@MerchantId() merchantId: string, @Body() dto: CreateCustomerDto) {
    return this.customers.create(merchantId, dto);
  }

  @Get('search')
  search(@MerchantId() merchantId: string, @Query() dto: SearchCustomerDto) {
    return this.customers.search(merchantId, dto);
  }

  @Get('recent')
  getRecent(@MerchantId() merchantId: string) {
    return this.customers.getRecent(merchantId);
  }

  @Get(':id')
  findById(@Param('id') id: string, @MerchantId() merchantId: string) {
    return this.customers.findById(id, merchantId);
  }
}

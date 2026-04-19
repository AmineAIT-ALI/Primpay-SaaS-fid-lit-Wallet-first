import { IsEnum, IsString, IsOptional, IsUUID } from 'class-validator';

export enum CreditSource {
  QR_SCAN = 'QR_SCAN',
  MANUAL_SEARCH_CREDIT = 'MANUAL_SEARCH_CREDIT',
  QUICK_ADD_RECENT_CUSTOMER = 'QUICK_ADD_RECENT_CUSTOMER',
}

export class CreditDto {
  @IsUUID()
  customerId: string;

  @IsEnum(CreditSource)
  source: CreditSource;

  @IsUUID()
  @IsOptional()
  locationId?: string;

  // QR scan — raw payload from camera scan
  @IsString()
  @IsOptional()
  qrPayload?: string;
}

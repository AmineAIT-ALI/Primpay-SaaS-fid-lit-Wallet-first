import { IsEnum, IsString, IsOptional, IsUUID, ValidateIf } from 'class-validator';

export enum CreditSource {
  QR_SCAN = 'QR_SCAN',
  MANUAL_SEARCH_CREDIT = 'MANUAL_SEARCH_CREDIT',
  QUICK_ADD_RECENT_CUSTOMER = 'QUICK_ADD_RECENT_CUSTOMER',
}

export class CreditDto {
  // Required for MANUAL_SEARCH_CREDIT / QUICK_ADD — resolved automatically for QR_SCAN
  @IsUUID()
  @ValidateIf((o) => o.source !== CreditSource.QR_SCAN)
  customerId?: string;

  @IsEnum(CreditSource)
  source: CreditSource;

  @IsUUID()
  @IsOptional()
  locationId?: string;

  @IsString()
  @ValidateIf((o) => o.source === CreditSource.QR_SCAN)
  qrPayload?: string;
}

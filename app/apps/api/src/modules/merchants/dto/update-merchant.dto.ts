import { IsString, MinLength, IsOptional } from 'class-validator';

export class UpdateMerchantDto {
  @IsString()
  @MinLength(2)
  @IsOptional()
  name?: string;
}

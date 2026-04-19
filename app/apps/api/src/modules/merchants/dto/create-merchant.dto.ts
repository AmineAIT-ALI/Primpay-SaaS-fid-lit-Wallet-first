import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';

export class CreateMerchantDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsString()
  @MinLength(2)
  locationName: string;

  @IsString()
  address: string;

  @IsString()
  city: string;

  @IsEmail()
  ownerEmail: string;

  @IsString()
  @MinLength(8)
  ownerPassword: string;

  @IsString()
  @IsOptional()
  slug?: string;
}

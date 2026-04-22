import { IsString, IsOptional } from 'class-validator';

export class SearchCustomerDto {
  @IsString()
  @IsOptional()
  q?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  publicId?: string;
}

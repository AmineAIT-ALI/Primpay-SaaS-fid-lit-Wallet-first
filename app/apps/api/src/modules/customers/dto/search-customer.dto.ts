import { IsString, IsOptional } from 'class-validator';

export class SearchCustomerDto {
  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  publicId?: string;
}

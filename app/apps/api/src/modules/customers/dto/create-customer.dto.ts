import { IsString, IsOptional, IsEmail, Matches, MinLength } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @MinLength(2)
  firstName: string;

  @IsString()
  @Matches(/^\+?[0-9]{8,15}$/, { message: 'Invalid phone number' })
  phone: string;

  @IsEmail()
  @IsOptional()
  email?: string;
}

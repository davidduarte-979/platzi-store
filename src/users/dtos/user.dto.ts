import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Length,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  @ApiProperty({ description: 'User email' })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6)
  readonly password: string;

  @IsNotEmpty()
  readonly role: string;

  @IsPositive()
  @IsOptional()
  @ApiProperty({ description: 'Customer associated to this user' })
  readonly customerId: number;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

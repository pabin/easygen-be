import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(64)
  @Transform(({ value }) => value.trim())
  firstName: string;

  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(64)
  @Transform(({ value }) => value.trim())
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }) => value.trim().toLowerCase())
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/[A-Za-z]/, { message: 'Password must contain at least one letter' })
  @Matches(/\d/, { message: 'Password must contain at least one number' })
  @Matches(/[^A-Za-z0-9]/, {
    message: 'Password must contain at least one special character',
  })
  @Transform(({ value }) => value.trim())
  password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

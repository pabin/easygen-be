import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
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
  @Transform(({ value }) => value.trim())
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(32)
  @Transform(({ value }) => value.trim())
  password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

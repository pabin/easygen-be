import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsString,
  Matches,
} from 'class-validator';

import { Transform } from 'class-transformer';

export class UserLoginDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Transform(({ value }) => value.trim())
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

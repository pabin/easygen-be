import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class UserLoginDto {
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

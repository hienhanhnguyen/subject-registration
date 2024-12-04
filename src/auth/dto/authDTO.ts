import { IsEmail, IsString } from 'class-validator';

export class AuthInput {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

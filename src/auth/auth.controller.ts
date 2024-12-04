import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthInput } from './dto/authDTO'; // Assuming you have a DTO for AuthInput
import { stat } from 'fs';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() input: AuthInput) {
    try {
      const result = await this.authService.validateUser(input);

      if (result == null) {
        return {
          status: HttpStatus.UNAUTHORIZED,
          error: 'Wrong email or password',
        };
      }

      return result;
    } catch (error) {
      console.log(error);
      if (error instanceof HttpException) {
        throw error;
      }
      throw {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'An unexpected error occurred',
      };
    }
  }

  @Post('signup')
  async signup(@Body() input: AuthInput) {
    return {
      status: HttpStatus.FORBIDDEN,
      error: "Can't create user on this site",
    };
  }
}

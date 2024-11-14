import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthInput } from './dto/authDTO'; // Assuming you have a DTO for AuthInput

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() input: AuthInput) {
    return this.authService.validateUser(input);
  }

  @Post('signup')
  async signup(@Body() input: AuthInput) {
    return this.authService.createUser(input);
  }
}

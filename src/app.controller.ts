import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Role } from './auth/decorators/role.decorator';
import { RolesGuard } from './auth/role.guard';
import { JwtGuard } from './auth/jwt.guard';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(JwtGuard, RolesGuard)
  @Role('student')
  @Get()
  getHello() {
    return this.appService.getHello();
  }
}

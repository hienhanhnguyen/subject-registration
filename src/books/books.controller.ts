import { Controller, Get, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { JwtGuard } from '../auth/jwt.guard';
import { RolesGuard } from 'src/auth/role.guard';
import { Role } from 'src/auth/decorators/role.decorator';

@Controller('test')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @UseGuards(JwtGuard, RolesGuard)
  @Get()
  @Role('admin')
  testRoute() {
    return { message: 'This is a protected route' };
  }
}

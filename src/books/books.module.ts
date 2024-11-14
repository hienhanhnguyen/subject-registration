import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}

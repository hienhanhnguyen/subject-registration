import { Module } from '@nestjs/common';
import { SubjectGradeService } from './subject-grade.service';
import { SubjectGradeController } from './subject-grade.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [SubjectGradeController],
  providers: [SubjectGradeService, PrismaService],
})
export class SubjectGradeModule { }

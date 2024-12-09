import { Module } from '@nestjs/common';
import { SubjectRegistrationService } from './subject-registration.service';
import { SubjectRegistrationController } from './subject-registration.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [SubjectRegistrationController],
  providers: [SubjectRegistrationService, PrismaService],
})
export class SubjectRegistrationModule {}

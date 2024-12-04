import {
  Controller,
  UseGuards,
  Request,
  Get,
  Param,
  HttpException,
  HttpStatus,
  Put,
  Body,
} from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { JwtGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/role.guard';
import { Role } from 'src/auth/decorators/role.decorator';
import { UpdateDTO } from './dto/updateDTO';
import { stat } from 'fs';
@Controller('user-profile')
@UseGuards(JwtGuard, RolesGuard)
@Role('student')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @Get()
  async getStudentProfile(@Request() req) {
    try {
      const mssv = req.user.ma_nguoi_dung;
      const profile = await this.userProfileService.getStudentProfile(mssv);
      if (!profile) {
        throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);
      }
      return profile;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put()
  async updateStudentProfile(@Request() req, @Body() updateDTO: UpdateDTO) {
    try {
      const userToUpdate = await this.userProfileService.getUser(
        req.user.ma_nguoi_dung,
      );
      if (!userToUpdate) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      const resultUpdate = await this.userProfileService.updateUser(
        req.user.ma_nguoi_dung,
        updateDTO,
      );
      if (!resultUpdate) {
        throw new HttpException('Update failed', HttpStatus.BAD_REQUEST);
      }
      return {
        stattus: 'success',
        info: resultUpdate,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

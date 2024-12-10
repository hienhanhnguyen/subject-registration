import { Controller, Request } from '@nestjs/common';
import { SubjectGradeService } from './subject-grade.service';
import { Get, Query, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/jwt.guard';

@Controller('grade')
export class SubjectGradeController {
  constructor(private readonly subjectGradeService: SubjectGradeService) { }


  @UseGuards(JwtGuard)
  @Get('get_semester_grades')
  // xem bang diem hoc ki
  async getStudentGrades(@Request() req) {
    try {
      const ma_sv = req.user.ma_nguoi_dung;
      const results = await this.subjectGradeService.getStudentGrades(ma_sv);
      return {
        error: false,
        message: 'success',
        data: results,
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
        data: null,
      };
    }
  }


  // diem tung mon trong bang diem hoc ki
  @UseGuards(JwtGuard)
  @Get('get_class_grades')
  async getClassGrades(
    @Request() req,
    @Query('ma_hk') ma_hk: string
  ) {
    try {
      console.log("here");
      const ma_sv = req.user.ma_nguoi_dung;
      const results = await this.subjectGradeService.getClassGrades(ma_sv, ma_hk);
      console.log(results);
      return {
        error: false,
        message: 'success',
        data: results,
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
        data: null,
      };
    }
  }
  // Xem GPA, tín chỉ tích lũy
  @UseGuards(JwtGuard)
  @Get('get_gpa_and_credits')
  async getGPAAndCredits(@Request() req) {
    try {
      const ma_sv = req.user.ma_nguoi_dung;
      const results = await this.subjectGradeService.getGPAAndCredits(ma_sv);
      return {
        error: false,
        message: 'success',
        data: results,
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
        data: null,
      };
    }
  }


  // Xem chi tiết điểm từng môn
  @UseGuards(JwtGuard)
  @Get('get_transcript')
  async getTranscript(@Request() req) {
    try {
      const ma_sv = req.user.ma_nguoi_dung;
      const results = await this.subjectGradeService.getTranscript(ma_sv);
      return {
        error: false,
        message: 'success',
        data: results,
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
        data: null,
      };
    }
  }
}

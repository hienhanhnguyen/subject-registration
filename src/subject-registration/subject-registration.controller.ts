import { Controller, Get, Param, Query } from "@nestjs/common";
import { SubjectRegistrationService } from "./subject-registration.service";

@Controller("subject-registration")
export class SubjectRegistrationController {
  constructor(
    private readonly subjectRegistrationService: SubjectRegistrationService,
  ) {}
  @Get()
  async getSubjectRegistration() {
    try {
      const subjectRegistration =
        await this.subjectRegistrationService.getAllRegistrations();
      console.log(subjectRegistration);
      return {
        error: false,
        message: "success",
        data: subjectRegistration,
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
        data: null,
      };
    }
  }

  @Get("checkvalidtimerange/:ma_dot_dk")
  async checkValidTimeRange(@Param("ma_dot_dk") ma_dot_dk: string) {
    try {
      const registrationPeriod =
        await this.subjectRegistrationService.getRegistrationPeriod(ma_dot_dk);

      if (!registrationPeriod) {
        return {
          error: true,
          message: "Registration period not found",
          valid: false,
        };
      }

      const checkDate = new Date();
      const isValid =
        checkDate >= registrationPeriod.thoi_gian_bat_dau &&
        checkDate <= registrationPeriod.thoi_gian_ket_thuc;

      return {
        error: false,
        message: "success",
        valid: isValid,
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
        valid: false,
      };
    }
  }

  @Get("search_subject/:subject")
  async searchSubject(@Param("subject") subject: string) {
    try {
      console.log(subject);
      const results =
        await this.subjectRegistrationService.searchSubject(subject);
      return {
        error: false,
        message: "success",
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
  @Get("class_details")
  async getClassDetails(
    @Query("ma_dot_dk") ma_dot_dk: string,
    @Query("ma_hk") ma_hk: string,
    @Query("ma_mon") ma_mon: string,
  ) {
    try {
      const results = await this.subjectRegistrationService.getClassDetails(
        ma_dot_dk,
        ma_hk,
        ma_mon,
      );
      return {
        error: false,
        message: "success",
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

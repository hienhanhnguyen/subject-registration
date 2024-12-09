import { Controller, Get, Param, Post, Query } from "@nestjs/common";
import { SubjectRegistrationService } from "./subject-registration.service";
import { JwtGuard } from "src/auth/jwt.guard";
import { UseGuards, Request } from "@nestjs/common";
@Controller("subject-registration")
export class SubjectRegistrationController {
  constructor(
    private readonly subjectRegistrationService: SubjectRegistrationService,
  ) { }
  // lấy tất cả đợt đăng ký
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
  // lấy tất cả lớp đã đăng ký. -- Note: lay mssv ở trong webtoken.
  // Ứng với mỗi lớp, lấy info của lớp đó
  @UseGuards(JwtGuard)
  @Get("registered_class")
  async getRegisteredClass(
    @Query("ma_dot_dk") ma_dot_dk: string,
    @Query("ma_hk") ma_hoc_ky: string, @Request() req,
  ) {

    try {
      const mssv = req.user.ma_nguoi_dung;
      console.log(mssv, ma_dot_dk, ma_hoc_ky);
      const creadit = await this.subjectRegistrationService.getCreditInOneRegistration(ma_dot_dk, ma_hoc_ky, mssv);
      const classInfo = await this.subjectRegistrationService.getClassInOneRegistration(ma_dot_dk, ma_hoc_ky, mssv);
      let classDetails = [];
      console.log(creadit);
      for (let i = 0; i < classInfo.length; i++) {
        console.log(classInfo[i].ma_mon_hoc, ma_hoc_ky, ma_dot_dk);
        const classDetail = await this.subjectRegistrationService.getClasseDetails(classInfo[i].ten_lop_hoc, classInfo[i].ma_mon_hoc, ma_hoc_ky);

        classDetails.push(classDetail);
      }

      return {
        error: false,
        message: "success",
        data: {
          totalCredit: creadit,
          class: classInfo,
          classDetails: classDetails,
        },
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
        data: null,
      };
    }
  }
  // when register/change check for validate
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

  // search for subjects in the period -- Note: empty string = return all
  @Get("search_subject")
  async searchSubject(@Query("ma_mon_hoc") subject: string, @Query("ma_dot_dk") ma_dot_dk: string,
  ) {
    try {
      console.log(subject);
      const results =
        await this.subjectRegistrationService.searchSubject(subject, ma_dot_dk);
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
  async getClassDetails(@Query("ma_dot_dk") ma_dot_dk: string, @Query("ma_hk") ma_hk: string, @Query("ma_mon") ma_mon: string,
  ) {
    try {
      const results = await this.subjectRegistrationService.getClassesAvailableInSubject(
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

  // @Post("register_class")
  // async registerClass(
  //   @Query("ma_lop_hoc") ma_lop_hoc: string,
  //   @Query("ma_dot_dk") ma_dot_dk: string,
  //   @Request() req,
  // ) {
  //   try {
  //     const mssv = req.user.mssv;
  //     const result = await this.subjectRegistrationService.registerClass(
  //       ma_lop_hoc,
  //       ma_dot_dk,
  //       mssv,
  //     );
  //     return {
  //       error: false,
  //       message: "success",
  //       data: result,
  //     };
  //   } catch (error) {
  //     return {
  //       error: true,
  //       message: error.message,
  //       data: null,
  //     };
  //   }
  // }
}

import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
@Injectable()
export class SubjectRegistrationService {
  constructor(private prisma: PrismaService) { }

  async getClassDetails1(inTenLop: string, inMaMon: string, inMaHk: string) {
    try {
      const result = await this.prisma.$queryRaw<any[]>`CALL GetThongTinLopHoc(${inTenLop}, ${inMaMon}, ${inMaHk});`;
      if (result.length === 0) {
        throw new Error("Class not found");
      }
      return result;
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching class information");
    }
  }

  async getClasseDetails(inTenLop: string, inMaMon: string, inMaHk: string) {
    try {
      console.log(inTenLop, inMaMon, inMaHk);
      // Fetch class information along with schedule
      const classInfo = await this.prisma.lop_hoc.findFirst({
        where: {
          ten_lop: inTenLop,
          ma_mon: inMaMon,
          ma_hk: inMaHk,
        },
        select: {
          ten_lop: true,
          ma_mon: true,
          ma_he_dao_tao: true,
          loai_lop: true,
          si_so_hien_tai: true,
          si_so_min: true,
          si_so_max: true,
          ten_lop_pt: true,
          mon_hoc: {
            select: {
              ten_mon_hoc_VIE: true,
            },
          },
          lich_lop_hoc: {
            select: {
              ma_dia_diem: true,
              ngay: true,
              tuan: true,
              tiet_bat_dau: true,
              tiet_ket_thuc: true,
            },
          },
        },
      });

      if (!classInfo) {
        throw new Error("Class not found");
      }

      // Process the schedule data into grouped JSON objects
      const schedule = classInfo.lich_lop_hoc?.reduce(
        (acc: any[], item: any) => {
          const existing = acc.find(
            (entry) =>
              entry.ma_dia_diem === item.ma_dia_diem &&
              entry.ngay === item.ngay &&
              entry.tiet_bat_dau === item.tiet_bat_dau &&
              entry.tiet_ket_thuc === item.tiet_ket_thuc,
          );

          if (existing) {
            existing.tuan_list.push(item.tuan);
          } else {
            acc.push({
              ma_dia_diem: item.ma_dia_diem,
              ngay: item.ngay,
              tuan_list: [item.tuan],
              tiet_bat_dau: item.tiet_bat_dau,
              tiet_ket_thuc: item.tiet_ket_thuc,
            });
          }

          return acc;
        },
        [],
      );

      // Format the result as JSON
      return {
        ...classInfo,
        ten_mon_hoc_VIE: classInfo.mon_hoc.ten_mon_hoc_VIE,
        lich_lop_hoc: schedule.map((item) => ({
          ...item,
          tuan_list: item.tuan_list.join("-"),
        })),
      };
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching class information");
    }
  }

  async getAllRegistrations() {
    const rawResult = await this.prisma.$queryRaw<any[]>`CALL GetDotDangKyMon();`;
    // Map the raw result to meaningful field names
    const mappedResult = rawResult.map((row) => ({
      ma_dot_dk: row.f0,
      ma_hoc_ky: row.f1,
      ten_dot_dk: row.f2,
      thoi_gian_bat_dau: row.f3,
      thoi_gian_ket_thuc: row.f4,
    }));

    return mappedResult;
  }
  async getCreditInOneRegistration(
    ma_dot_dk: string,
    ma_hoc_ky: string,
    mssv: number,
  ) {
    const result = await this.prisma.ket_qua_dk_mon.findFirst({
      where: {
        ma_dot_dk: ma_dot_dk,
        ma_hoc_ky: ma_hoc_ky,
        ma_sv: mssv,
      },
      select: {
        tong_tin_chi: true,
      },
    });
    return result;
  }

  async getClassInOneRegistration(ma_dot_dk: string, ma_hoc_ky: string, mssv: number) {
    // const results = await this.prisma.lop_hoc_sv_dang_ky.findMany({
    //   where: {
    //     ma_dot_dk: ma_dot_dk,
    //     ma_hoc_ky: ma_hoc_ky,
    //     ma_sv: mssv,
    //   },
    //   select: {
    //     ten_lop_hoc: true,
    //     ma_mon_hoc: true,
    //     ma_hoc_ky: true,
    //     ma_dot_dk: true,
    //   },
    // });
    const results = await this.prisma.$queryRaw<any[]>`CALL GetLopHocSvDangKy(${ma_dot_dk}, ${ma_hoc_ky}, ${mssv});`;
    const mappedResults = results.map(row => ({
      ten_lop_hoc: row.f0,
      ma_mon_hoc: row.f1,
      ma_hoc_ky: row.f2,
    }));

    return mappedResults;

  }
  async getRegistrationPeriod(ma_dot_dk: string) {
    const result = await this.prisma.dot_dang_ky_mon.findUnique({
      where: {
        ma_dot_dk: ma_dot_dk,
      },
      select: {
        thoi_gian_bat_dau: true,
        thoi_gian_ket_thuc: true,
      },
    });

    return result;
  }
  async searchSubject(subjectName: string, ma_dot_dk: string) {
    if (subjectName === "") {
      // Return all records if the search term is an empty string
      return await this.prisma.mon_hoc.findMany({
        select: {
          ma_mon_hoc: true,
          ten_mon_hoc_VIE: true,
          ten_mon_hoc_ENG: true,
          tin_chi: true,
        },
      });
    }

    // Perform search with the given search term and filter by ma_dot_dk
    const results = await this.prisma.mon_hoc.findMany({
      where: {
        AND: [
          {
            OR: [
              {
                ma_mon_hoc: {
                  contains: subjectName,
                },
              },
              {
                ten_mon_hoc_VIE: {
                  contains: subjectName,
                },
              },
              {
                ten_mon_hoc_ENG: {
                  contains: subjectName,
                },
              },
            ],
          },
          {
            lop_hoc: {
              some: {
                ma_dot_dk: ma_dot_dk,
              },
            },
          },
        ],
      },
      select: {
        ma_mon_hoc: true,
        ten_mon_hoc_VIE: true,
        ten_mon_hoc_ENG: true,
        tin_chi: true,
      },
    });

    return results;
  }
  async getClassesAvailableInSubject(ma_dot_dk: string, ma_hk: string, ma_mon: string) {
    const results = await this.prisma.lop_hoc.findMany({
      where: {
        ma_dot_dk: ma_dot_dk,
        ma_hk: ma_hk,
        ma_mon: ma_mon,
      },
      select: {
        ten_lop: true,
        ma_mon: true,
        ma_hk: true,
      },
    });

    return results;
  }

  async registerStudentForClass(ma_sv: number, ma_dot_dk: string, ten_lop: string, ma_mon: string, ma_hk: string) {
    try {
      await this.prisma.$executeRaw`CALL SVChonLopHoc1(${ma_sv}, ${ma_dot_dk}, ${ten_lop}, ${ma_mon}, ${ma_hk});`;
      return { message: "Student registered for class successfully" };
    } catch (error) {
      console.error(error);
      throw new Error("Error registering student for class");
    }
  }
  async unregisterStudentFromClass(ma_sv: number, ma_dot_dk: string, ten_lop: string, ma_mon: string, ma_hk: string) {
    try {
      await this.prisma.$executeRaw`CALL SVXoaLopHoc1(${ma_sv}, ${ma_dot_dk}, ${ten_lop}, ${ma_mon}, ${ma_hk});`;
      return { message: "Student unregistered from class successfully" };
    } catch (error) {
      console.error(error);
      throw new Error("Error unregistering student from class");
    }
  }
  async findStudent(p_khoa: string, p_khoa_sv: string, p_he_dao_tao: string, p_gvcn: number, p_chuan_av: string, p_chuan_sv: string) {
    try {
      const rawResults = await this.prisma.$queryRaw<any[]>`CALL FILTER_SINHVIEN(${p_khoa}, ${p_khoa_sv}, ${p_he_dao_tao}, ${p_gvcn}, ${p_chuan_av}, ${p_chuan_sv});`;

      // Map the raw result to meaningful field names
      const mappedResults = rawResults.map(row => ({
        ma_nguoi_dung: row.f0,
        ma_gvcn: row.f1,
        ma_he_dao_tao: row.f2,
        ma_khoa_sv: row.f3,
        ma_chuan_av: row.f4,
        ma_chuan_sv: row.f5,
        ma_ctdt: row.f6,
        ngay_ctxh: row.f7,
        gpa_tichluy: parseFloat(row.f8),
        tinchi_tichluy: row.f9,
        ngay_nhap_hoc: row.f10 ? row.f10 : null,
        han_dao_tao_sv: row.f11 ? row.f11 : null,
        thoi_gian_bao_luu: row.f12,
        ma_khoa: row.f14,
        ho: row.f15,
        ten: row.f16,
        email: row.f17,
        password: row.f18,
        gioi_tinh: row.f19,
        dia_chi: row.f20,
        sdt: row.f21,
        cccd: row.f22,
        ngay_sinh: row.f23 ? row.f23 : null,
      }));

      return mappedResults;
    } catch (error) {
      console.error(error);
      throw new Error("Error finding student");
    }
  }
  async findStudentByMssv(mssv: number) {
    try {
      const rawResult = await this.prisma.$queryRaw<any[]>`CALL FIND_SV_BY_MSSV(${mssv});`;

      if (rawResult.length === 0) {
        throw new Error("Student not found");
      }

      const student = rawResult[0];
      return {
        ma_nguoi_dung: student.f0,
        ma_gvcn: student.f1,
        ma_he_dao_tao: student.f2,
        ma_khoa_sv: student.f3,
        ma_chuan_av: student.f4,
        ma_chuan_sv: student.f5,
        ma_ctdt: student.f6,
        ngay_ctxh: student.f7,
        gpa_tichluy: parseFloat(student.f8),
        tinchi_tichluy: student.f9,
        ngay_nhap_hoc: student.f10 ? student.f10 : null,
        han_dao_tao_sv: student.f11 ? student.f11 : null,
        thoi_gian_bao_luu: student.f12,
        ma_khoa: student.f14,
        ho: student.f15,
        ten: student.f16,
        email: student.f17,
        password: student.f18 ? null : null,
        gioi_tinh: student.f19,
        dia_chi: student.f20,
        sdt: student.f21,
        cccd: student.f22,
        ngay_sinh: student.f23 ? student.f23 : null,
      };
    } catch (error) {
      console.error(error);
      throw new Error("Error finding student by MSSV");
    }
  }

  async updateStudent(
    p_ma_nguoi_dung: number,
    p_ten_khoa: number,
    p_email: string,
    p_gioi_tinh: 'Nam' | 'Nữ',
    p_dia_chi: string,
    p_sdt: string,
    p_cccd: string,
    p_ngay_sinh: string,
    p_ma_gvcn: number,
    p_ma_he_dao_tao: string,
    p_ma_khoa_sv: string,
    p_ma_chuan_av: number,
    p_ma_chuan_sv: number,
    p_ma_ctdt: string
  ) {
    try {
      await this.prisma.$executeRaw`
        CALL CAPNHAT_SINHVIEN(
          ${p_ma_nguoi_dung}, 
          ${p_ten_khoa}, 
          ${p_email}, 
          ${p_gioi_tinh}, 
          ${p_dia_chi}, 
          ${p_sdt}, 
          ${p_cccd}, 
          ${p_ngay_sinh}, 
          ${p_ma_gvcn}, 
          ${p_ma_he_dao_tao}, 
          ${p_ma_khoa_sv}, 
          ${p_ma_chuan_av}, 
          ${p_ma_chuan_sv}, 
          ${p_ma_ctdt}
        );
      `;
      return { message: "Student information updated successfully" };
    } catch (error) {
      console.error(error);
      throw new Error("Error updating student information");
    }
  }
  async createStudent(
    p_ho: string,
    p_ten: string,
    p_email: string,
    p_password: string,
    p_gioi_tinh: 'Nam' | 'Nữ',
    p_dia_chi: string,
    p_sdt: string,
    p_cccd: string,
    p_ngay_sinh: string,
    p_ma_gvcn: number,
    p_ma_he_dao_tao: string,
    p_ma_khoa_sv: string,
    p_ma_chuan_av: number,
    p_ma_chuan_sv: number,
    p_ma_ctdt: string,
    p_ngay_ctxh: number,
    p_gpa_tichluy: number,
    p_tinchi_tichluy: number,
    p_ngay_nhap_hoc: string,
    p_han_dao_tao_sv: string,
    p_thoi_gian_bao_luu: string
  ) {
    try {
      await this.prisma.$executeRaw`
        CALL TAO_SVIEN1(
          ${p_ho}, 
          ${p_ten}, 
          ${p_email}, 
          ${p_password}, 
          ${p_gioi_tinh}, 
          ${p_dia_chi}, 
          ${p_sdt}, 
          ${p_cccd}, 
          ${p_ngay_sinh}, 
          ${p_ma_gvcn}, 
          ${p_ma_he_dao_tao}, 
          ${p_ma_khoa_sv}, 
          ${p_ma_chuan_av}, 
          ${p_ma_chuan_sv}, 
          ${p_ma_ctdt}, 
          ${p_ngay_ctxh}, 
          ${p_gpa_tichluy}, 
          ${p_tinchi_tichluy}, 
          ${p_ngay_nhap_hoc}, 
          ${p_han_dao_tao_sv}, 
          ${p_thoi_gian_bao_luu}
        );
      `;
      return { message: "Student created successfully" };
    } catch (error) {
      console.error(error);
      throw new Error("Error creating student");
    }
  }
  async deleteStudent(p_ma_nguoi_dung: number) {
    try {
      await this.prisma.$executeRaw`
        CALL XOA_SVIEN(${p_ma_nguoi_dung});
      `;
      return { message: "Student deleted successfully" };
    } catch (error) {
      console.error(error);
      throw new Error("Error deleting student");
    }
  }
}
// async function testFunction() {
//   const service = new SubjectRegistrationService(PrismaService);

//   try {
//     const result = await service.getClassInformation(); // Replace with your actual method name
//     console.log('Result:', result);
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }

// testFunction();

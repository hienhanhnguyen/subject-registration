import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
@Injectable()
export class SubjectRegistrationService {
  constructor(private prisma: PrismaService) { }

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
    const results = await this.prisma.lop_hoc_sv_dang_ky.findMany({
      where: {
        ma_dot_dk: ma_dot_dk,
        ma_hoc_ky: ma_hoc_ky,
        ma_sv: mssv,
      },
      select: {
        ten_lop_hoc: true,
        ma_mon_hoc: true,
        ma_hoc_ky: true,
      },
    });
    console.log(results);
    return results;
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
  async getClasses(ma_dot_dk: string, ma_hk: string, ma_mon: string) {
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

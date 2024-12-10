import { Injectable } from '@nestjs/common';
import { PrismaService } from "src/prisma/prisma.service";
@Injectable()
export class SubjectGradeService {

    constructor(private prisma: PrismaService) { }
    async getStudentGrades(ma_sv_input: number) {
        try {
            const rawResults = await this.prisma.$queryRaw<any[]>`
        CALL GetBangDiemHK(${ma_sv_input});
      `;

            // Map the raw result to meaningful field names
            const mappedResults = rawResults.map(row => ({
                MaHK: row.f0,
                GPA_10: row.f1,
                GPA_4: row.f2,
                TinChiHocKy: row.f3,
            }));

            return mappedResults;
        } catch (error) {
            console.error(error);
            throw new Error("Error retrieving student grades");
        }
    }

    async getClassGrades(ma_sv_input: number, ma_hk_input: string) {
        try {
            console.log(ma_sv_input, ma_hk_input);
            const results = await this.prisma.$queryRaw<any[]>`
        CALL GetDiemLopHoc(${ma_sv_input}, ${ma_hk_input});
      `;
            console.log(results);
            return results;
        } catch (error) {
            console.error(error);
            throw new Error("Error retrieving class grades");
        }
    }
    async getGPAAndCredits(ma_sv_input: number) {
        try {
            const results = await this.prisma.$queryRaw<any[]>`
        CALL GetGPAAndTinChiTK(${ma_sv_input});
      `;
            return results;
        } catch (error) {
            console.error(error);
            throw new Error("Error retrieving GPA and credits");
        }
    }
    async getTranscript(ma_sv_input: number) {
        try {
            const results = await this.prisma.$queryRaw<any[]>`
        CALL GetBangDiemTK(${ma_sv_input});
      `;
            return results;
        } catch (error) {
            console.error(error);
            throw new Error("Error retrieving transcript");
        }
    }
}

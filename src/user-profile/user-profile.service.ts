import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { khoa, nguoi_dung, sinh_vien } from '@prisma/client';
import { UpdateDTO } from './dto/updateDTO';
import * as moment from 'moment';
@Injectable()
export class UserProfileService {
  constructor(private prisma: PrismaService) { }
  async getUser(mssv: number): Promise<nguoi_dung> {
    const resultUser = this.prisma.nguoi_dung.findUnique({
      where: { ma_nguoi_dung: mssv },
    });
    if (!resultUser) {
      return null;
    } else {
      return resultUser;
    }
  }
  async getDepartment(ma_khoa: number): Promise<khoa> {
    const resultDepartment = this.prisma.khoa.findUnique({
      where: { ma_khoa: ma_khoa },
    });
    if (!resultDepartment) {
      return null;
    } else {
      return resultDepartment;
    }
  }
  async getStudent(mssv: number): Promise<sinh_vien> {
    const resultStudent = this.prisma.sinh_vien.findUnique({
      where: { ma_nguoi_dung: mssv },
    });
    if (!resultStudent) {
      return null;
    } else {
      return resultStudent;
    }
  }

  async getStudentProfile(mssv: number): Promise<any> {
    const studentProfile1 = await this.prisma.nguoi_dung.findUnique({
      where: { ma_nguoi_dung: mssv },
      select: {
        ho: true,
        ten: true,
        email: true,
        dia_chi: true,
        sdt: true,
        cccd: true,
        ngay_sinh: true,
        khoa: {
          select: {
            ten_khoa: true,
          },
        },
      },
    });

    const studentProfile2 = await this.prisma.sinh_vien.findUnique({
      where: { ma_nguoi_dung: mssv },
      select: {
        ma_nguoi_dung: true,
        he_dao_tao: {
          select: {
            ten_he_dao_tao: true,
          },
        },
        ma_khoa_sv: true,
        ma_chuan_av: true,
        ma_chuan_sv: true,
        ma_ctdt: true,
        ngay_ctxh: true,
        gpa_tichluy: true,
        tinchi_tichluy: true,
        ngay_nhap_hoc: true,
        han_dao_tao_sv: true,
        thoi_gian_bao_luu: true,
        giang_vien: {
          select: {
            nguoi_dung: {
              select: {
                ho: true,
                ten: true,
              },
            },
          },
        },
      },
    });
    return { ...studentProfile1, ...studentProfile2 };
  }

  async updateUser(mssv: number, updateDTO: UpdateDTO): Promise<any> {
    const userToUpdate = await this.prisma.nguoi_dung.findUnique({
      where: { ma_nguoi_dung: mssv },
    });
    if (!userToUpdate) {
      return null;
    } else {


      const resultUpdate = await this.prisma.nguoi_dung.update({
        where: { ma_nguoi_dung: mssv },
        data: {
          email: updateDTO.email,
          dia_chi: updateDTO.dia_chi,
          sdt: updateDTO.sdt,
          cccd: updateDTO.cccd,

        },
      });
      delete resultUpdate.password;
      return resultUpdate;
    }
  }
}

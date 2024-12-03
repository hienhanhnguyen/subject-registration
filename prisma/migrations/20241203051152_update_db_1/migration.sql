/*
  Warnings:

  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable

-- CreateTable
CREATE TABLE `bang_diem_hoc_ky` (
    `ma_sv` INTEGER NOT NULL,
    `ma_hoc_ky` VARCHAR(50) NOT NULL,
    `ma_bang_diem_hoc_ky` INTEGER NOT NULL DEFAULT 1,
    `gpa_10_hoc_ky` DECIMAL(4, 2) NOT NULL DEFAULT 0.00,
    `gpa_4_hoc_ky` DECIMAL(4, 2) NOT NULL DEFAULT 0.00,
    `tin_chi_hoc_ky` INTEGER NOT NULL DEFAULT 0,

    INDEX `FK_bang_diem_hoc_ky_hoc_ky`(`ma_hoc_ky`),
    PRIMARY KEY (`ma_sv`, `ma_hoc_ky`, `ma_bang_diem_hoc_ky`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bang_diem_tong_ket` (
    `ma_sv` INTEGER NOT NULL,
    `ma_bang_diem_tk` INTEGER NOT NULL DEFAULT 1,
    `gpa_4` DECIMAL(4, 2) NOT NULL DEFAULT 0.00,
    `gpa_10` DECIMAL(4, 2) NOT NULL DEFAULT 0.00,
    `tong_tin_chi` INTEGER NOT NULL DEFAULT 0,
    `ngay_cap_nhat` DATE NOT NULL DEFAULT (curdate()),

    PRIMARY KEY (`ma_sv`, `ma_bang_diem_tk`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bang_tieng_anh_sv` (
    `ma_cc` INTEGER NOT NULL,
    `ma_sv` INTEGER NOT NULL,
    `ma_lich_su` VARCHAR(36) NOT NULL DEFAULT '',
    `diem` DECIMAL(5, 2) NOT NULL DEFAULT 0.00,
    `ngay_cap` DATE NOT NULL,
    `ngay_het_han` DATE NOT NULL,
    `trang_thai` ENUM('Y', 'N') NULL,

    INDEX `FK_bang_tieng_anh_sv_lich_su`(`ma_lich_su`),
    INDEX `FK_bang_tieng_anh_sv_sinh_vien`(`ma_sv`),
    PRIMARY KEY (`ma_cc`, `ma_sv`, `ma_lich_su`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `chi_tiet_diem_hk` (
    `ma_sv` INTEGER NOT NULL,
    `ma_hk` VARCHAR(50) NOT NULL,
    `ma_bang_diem_hk` INTEGER NOT NULL,
    `ten_lop` VARCHAR(50) NOT NULL,
    `ma_mon` VARCHAR(50) NOT NULL,
    `ma_hkL` VARCHAR(50) NOT NULL,
    `diem_BT` DECIMAL(4, 2) NOT NULL DEFAULT 0.00,
    `diem_BTL` DECIMAL(4, 2) NOT NULL DEFAULT 0.00,
    `diem_TN` DECIMAL(4, 2) NOT NULL DEFAULT 0.00,
    `diem_GK` DECIMAL(4, 2) NOT NULL DEFAULT 0.00,
    `diem_CK` DECIMAL(4, 2) NOT NULL DEFAULT 0.00,
    `diem_10_TK` DECIMAL(4, 2) NOT NULL DEFAULT 0.00,
    `diem_4_TK` DECIMAL(4, 2) NOT NULL DEFAULT 0.00,
    `diem_chu_TK` VARCHAR(50) NOT NULL DEFAULT '0',

    INDEX `FK_chi_tiet_diem_hk_lop_hoc`(`ten_lop`, `ma_mon`, `ma_hkL`),
    INDEX `ma_sv_ma_hk_ma_bang_diem_hk`(`ma_sv`, `ma_hk`, `ma_bang_diem_hk`),
    PRIMARY KEY (`ma_sv`, `ma_hk`, `ma_bang_diem_hk`, `ten_lop`, `ma_mon`, `ma_hkL`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `chi_tiet_diem_tk` (
    `ma_chi_tiet` INTEGER NOT NULL AUTO_INCREMENT,
    `ma_sv` INTEGER NOT NULL,
    `ma_bang_diem_tk` INTEGER NOT NULL,
    `ma_mon_hoc` VARCHAR(50) NOT NULL,
    `thoi_diem_hoc` DATE NOT NULL,
    `diem_10_cao_nhat` DECIMAL(4, 2) NOT NULL DEFAULT 0.00,
    `diem_4_cao_nhat` DECIMAL(4, 2) NOT NULL DEFAULT 0.00,
    `diem_chu_cao_nhat` VARCHAR(50) NOT NULL,

    INDEX `FK_chi_tiet_diem_tk_bang_diem_tong_ket`(`ma_sv`, `ma_bang_diem_tk`),
    INDEX `FK_chi_tiet_diem_tk_mon_hoc`(`ma_mon_hoc`),
    PRIMARY KEY (`ma_chi_tiet`, `ma_sv`, `ma_bang_diem_tk`, `ma_mon_hoc`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `chuan_anh_van` (
    `ma_chuan_anh_van` INTEGER NOT NULL,
    `ten_chuan_anh_van` VARCHAR(50) NULL,

    PRIMARY KEY (`ma_chuan_anh_van`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `chuan_sv` (
    `ma_chuan_sv` INTEGER NOT NULL,
    `ten_chuan_sv` VARCHAR(50) NULL,
    `ma_chuan_anh_van` INTEGER NULL,
    `ctxh_yeu_cau` INTEGER NOT NULL DEFAULT 0,
    `tin_chi_tich_luy` INTEGER NOT NULL DEFAULT 0,

    INDEX `fk_chuan_sv_ma_chuan_anh_van`(`ma_chuan_anh_van`),
    PRIMARY KEY (`ma_chuan_sv`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `chung_chi_tieng_anh` (
    `ma_cc` INTEGER NOT NULL AUTO_INCREMENT,
    `ten_cc` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`ma_cc`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `chuong_trinh_dao_tao` (
    `ma_ctdt` VARCHAR(50) NOT NULL,
    `ma_khoa_sv` VARCHAR(5) NOT NULL,
    `loai_sv_ap_dung` VARCHAR(4) NOT NULL,
    `ma_chuyen_nganh` VARCHAR(36) NOT NULL DEFAULT '',
    `ten_ctdt` VARCHAR(100) NOT NULL DEFAULT '',
    `thoi_gian_bat_dau` DATE NULL,
    `thoi_gian_ket_thuc` DATE NOT NULL DEFAULT ('2030-08-01'),
    `thoi_gian_ap_dung` DATE NULL,
    `tong_tin_chi_ctdt` INTEGER NOT NULL DEFAULT 0,
    `ghi_chu` VARCHAR(50) NULL,

    INDEX `FK_chuong_trinh_dao_tao_chuyen_nganh`(`ma_chuyen_nganh`),
    INDEX `FK_chuong_trinh_dao_tao_he_dao_tao`(`loai_sv_ap_dung`),
    INDEX `FK_chuong_trinh_dao_tao_khoa_sv`(`ma_khoa_sv`),
    PRIMARY KEY (`ma_ctdt`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `chuyen_nganh` (
    `ten_chuyen_nganh` VARCHAR(50) NULL,
    `ma_chuyen_nganh` VARCHAR(50) NOT NULL DEFAULT '',
    `ma_khoa` INTEGER NULL,

    INDEX `FK_chuyen_nganh_khoa`(`ma_khoa`),
    PRIMARY KEY (`ma_chuyen_nganh`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `chuyen_vien_phong_dao_tao` (
    `ma_nguoi_dung` INTEGER NOT NULL,

    PRIMARY KEY (`ma_nguoi_dung`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dia_diem_hoc` (
    `ma_dia_diem` VARCHAR(191) NOT NULL,
    `suc_chua` INTEGER NOT NULL DEFAULT 20,

    PRIMARY KEY (`ma_dia_diem`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dot_dang_ky_mon` (
    `ma_dot_dk` VARCHAR(50) NOT NULL,
    `ma_hoc_ky` VARCHAR(50) NOT NULL,
    `ten_dot_dk` VARCHAR(50) NOT NULL,
    `du_thinh` ENUM('Y', 'N') NOT NULL,
    `thoi_gian_bat_dau` DATE NOT NULL,
    `thoi_gian_ket_thuc` DATE NOT NULL,
    `ma_lich_su` VARCHAR(36) NOT NULL DEFAULT '',

    INDEX `FK_dot_dang_ky_mon_hoc_ky`(`ma_hoc_ky`),
    INDEX `FK_dot_dang_ky_mon_lich_su`(`ma_lich_su`),
    PRIMARY KEY (`ma_dot_dk`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `giang_vien` (
    `ma_nguoi_dung` INTEGER NOT NULL,
    `bang_cap` VARCHAR(50) NULL,
    `hoc_vi` ENUM('Thạc sĩ', 'Tiến sĩ', 'Cử nhân', 'Kỹ sư') NOT NULL DEFAULT 'Cử nhân',
    `hoc_ham` ENUM('Giáo sư', 'Phó giáo sư') NULL,

    PRIMARY KEY (`ma_nguoi_dung`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `giang_vien_day_lop_hoc` (
    `ma_gv` INTEGER NOT NULL,
    `ten_lop` VARCHAR(50) NOT NULL,
    `ma_mon` VARCHAR(50) NOT NULL,
    `ma_hk` VARCHAR(50) NOT NULL,

    INDEX `FK_giang_vien_day_lop_hoc_lop_hoc`(`ten_lop`, `ma_mon`, `ma_hk`),
    PRIMARY KEY (`ma_gv`, `ma_hk`, `ma_mon`, `ten_lop`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `he_dao_tao` (
    `ma_he_dao_tao` VARCHAR(4) NOT NULL,
    `ten_he_dao_tao` VARCHAR(50) NULL,

    PRIMARY KEY (`ma_he_dao_tao`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hoc_ky` (
    `ma_hk` VARCHAR(10) NOT NULL,
    `ten_hk` VARCHAR(30) NULL,
    `ngay_bat_dau` DATE NULL,
    `ngay_ket_thuc` DATE NULL,

    PRIMARY KEY (`ma_hk`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ke_hoach_giang_day` (
    `ma_ctdt` VARCHAR(50) NOT NULL DEFAULT '',
    `ma_mon` VARCHAR(10) NOT NULL,
    `tu_chon` ENUM('Y', 'N') NOT NULL,

    INDEX `FK_ke_hoach_giang_day_chuong_trinh_dao_tao`(`ma_ctdt`),
    PRIMARY KEY (`ma_mon`, `ma_ctdt`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ket_qua_dk_mon` (
    `ma_ket_qua_dkmh` INTEGER NOT NULL AUTO_INCREMENT,
    `ma_dot_dk` VARCHAR(50) NOT NULL,
    `ma_hoc_ky` VARCHAR(50) NOT NULL,
    `ma_sv` INTEGER NOT NULL,
    `tong_tin_chi` INTEGER NOT NULL DEFAULT 0,

    INDEX `FK__dot_dang_ky_mon`(`ma_dot_dk`, `ma_hoc_ky`),
    INDEX `FK__sinh_vien`(`ma_sv`),
    PRIMARY KEY (`ma_ket_qua_dkmh`, `ma_dot_dk`, `ma_hoc_ky`, `ma_sv`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `khoa` (
    `ma_khoa` INTEGER NOT NULL AUTO_INCREMENT,
    `ten_khoa` VARCHAR(40) NOT NULL,

    PRIMARY KEY (`ma_khoa`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `khoa_sv` (
    `ma_khoa_sv` VARCHAR(5) NOT NULL DEFAULT 'None',
    `han_dao_tao` DATE NULL,

    PRIMARY KEY (`ma_khoa_sv`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `khuyen_nghi` (
    `ma_mon` VARCHAR(10) NOT NULL,
    `ma_mon_kn` VARCHAR(10) NOT NULL,

    INDEX `FK_tien_quyet_mon_hoc_2`(`ma_mon_kn`),
    PRIMARY KEY (`ma_mon`, `ma_mon_kn`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lich_lop_hoc` (
    `ma_lich` VARCHAR(191) NOT NULL DEFAULT (uuid()),
    `ma_dia_diem` VARCHAR(191) NOT NULL,
    `nam` YEAR NOT NULL DEFAULT (year(curdate())),
    `tuan` INTEGER NOT NULL,
    `ngay` ENUM('2', '3', '4', '5', '6', '7', 'CN') NOT NULL,
    `tiet_bat_dau` INTEGER NOT NULL,
    `tiet_ket_thuc` INTEGER NOT NULL,
    `ten_lop` VARCHAR(50) NULL,
    `ma_mon` VARCHAR(50) NULL,
    `ma_hk` VARCHAR(50) NULL,

    INDEX `FK_lich_lop_hoc_dia_diem_hoc`(`ma_dia_diem`),
    INDEX `FK_lich_lop_hoc_lop_hoc`(`ten_lop`, `ma_mon`, `ma_hk`),
    INDEX `FK_lich_lop_hoc_tiet_hoc`(`tiet_bat_dau`),
    INDEX `FK_lich_lop_hoc_tiet_hoc_2`(`tiet_ket_thuc`),
    PRIMARY KEY (`ma_lich`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lich_su` (
    `ma_lich_su` VARCHAR(36) NOT NULL,
    `ma_cvpdt` INTEGER NULL,
    `hanh_dong` VARCHAR(50) NULL,
    `mo_ta` VARCHAR(50) NULL,
    `ngay_cap_nhat` DATE NULL,
    `gia_tri_cu` VARCHAR(50) NULL,
    `gia_tri_moi` VARCHAR(50) NULL,

    INDEX `FK_lich_su_chuyen_vien_phong_dao_tao`(`ma_cvpdt`),
    PRIMARY KEY (`ma_lich_su`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `link_hoc_online` (
    `ma_dia_diem` VARCHAR(191) NOT NULL,
    `link_cuoc_hop` VARCHAR(50) NOT NULL,
    `gioi_han_nguoi` INTEGER NOT NULL DEFAULT 100,

    PRIMARY KEY (`ma_dia_diem`, `link_cuoc_hop`, `gioi_han_nguoi`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `loai_ngoai_le` (
    `ma_loai_nl` VARCHAR(191) NOT NULL DEFAULT (uuid()),
    `ten` VARCHAR(50) NOT NULL,
    `mo_ta` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`ma_loai_nl`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lop_hoc` (
    `ten_lop` VARCHAR(50) NOT NULL,
    `ma_mon` VARCHAR(50) NOT NULL,
    `ma_hk` VARCHAR(50) NOT NULL,
    `ma_dot_dk` VARCHAR(50) NULL,
    `ma_he_dao_tao` VARCHAR(50) NULL,
    `loai_lop` ENUM('CQ', 'DT') NULL DEFAULT 'CQ',
    `si_so_hien_tai` INTEGER NULL,
    `si_so_min` INTEGER NULL,
    `si_so_max` INTEGER NULL,
    `ten_lop_pt` VARCHAR(50) NULL,
    `ma_mon_pt` VARCHAR(50) NULL,
    `ma_hk_pt` VARCHAR(50) NULL,

    INDEX `FK__he_dao_tao`(`ma_he_dao_tao`),
    INDEX `FK_lop_hoc_dot_dang_ky_mon`(`ma_dot_dk`),
    INDEX `FK_lop_hoc_hoc_ky`(`ma_hk`),
    INDEX `FK_lop_hoc_lop_hoc`(`ten_lop_pt`, `ma_mon_pt`, `ma_hk_pt`),
    INDEX `FK_lop_hoc_mon_hoc`(`ma_mon`),
    PRIMARY KEY (`ten_lop`, `ma_mon`, `ma_hk`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lop_hoc_sv_dang_ky` (
    `ten_lop_hoc` VARCHAR(50) NOT NULL,
    `ma_mon_hoc` VARCHAR(50) NOT NULL,
    `ma_hoc_ky` VARCHAR(50) NOT NULL,
    `ma_ket_qua` INTEGER NOT NULL,
    `ma_dot_dk` VARCHAR(50) NOT NULL,
    `ma_hoc_ky1` VARCHAR(50) NOT NULL,
    `ma_sv` INTEGER NOT NULL,

    INDEX `FK_lop_hoc_sv_dang_ky_ket_qua_dk_mon`(`ma_ket_qua`, `ma_dot_dk`, `ma_hoc_ky1`, `ma_sv`),
    PRIMARY KEY (`ten_lop_hoc`, `ma_mon_hoc`, `ma_hoc_ky`, `ma_ket_qua`, `ma_dot_dk`, `ma_hoc_ky1`, `ma_sv`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mon_hoc` (
    `ma_mon_hoc` VARCHAR(10) NOT NULL,
    `ten_mon_hoc_VIE` CHAR(100) NOT NULL,
    `ten_mon_hoc_ENG` CHAR(100) NOT NULL,
    `ma_khoa` INTEGER NOT NULL,
    `tin_chi` INTEGER NOT NULL,
    `chuan_mon_hoc` INTEGER NULL DEFAULT 1,
    `co_lop_phu_thuoc` INTEGER NULL DEFAULT 0,
    `he_so_BT` DECIMAL(3, 2) NOT NULL DEFAULT 0.00,
    `he_so_BTL` DECIMAL(3, 2) NOT NULL DEFAULT 0.00,
    `he_so_TN` DECIMAL(3, 2) NOT NULL DEFAULT 0.00,
    `he_so_GK` DECIMAL(3, 2) NOT NULL DEFAULT 0.00,
    `he_so_CK` DECIMAL(3, 2) NOT NULL DEFAULT 0.00,

    INDEX `FK_monhoc_khoa`(`ma_khoa`),
    PRIMARY KEY (`ma_mon_hoc`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ngoai_le` (
    `ma_nl` VARCHAR(191) NOT NULL DEFAULT (uuid()),
    `ma_loai_nl` VARCHAR(191) NOT NULL,
    `ma_lich_su` VARCHAR(36) NOT NULL DEFAULT '',
    `ma_sinh_vien` INTEGER NOT NULL,
    `ma_cvpdt` INTEGER NOT NULL,
    `mo_ta` VARCHAR(50) NOT NULL,
    `ly_do` VARCHAR(50) NOT NULL,
    `ngay_ra_quyet_dinh` DATE NOT NULL DEFAULT (curdate()),

    INDEX `FK_ngoai_le_chuyen_vien_phong_dao_tao`(`ma_cvpdt`),
    INDEX `FK_ngoai_le_lich_su`(`ma_lich_su`),
    INDEX `FK_ngoai_le_loai_ngoai_le`(`ma_loai_nl`),
    INDEX `FK_ngoai_le_sinh_vien`(`ma_sinh_vien`),
    PRIMARY KEY (`ma_nl`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `nguoi_dung` (
    `ma_nguoi_dung` INTEGER NOT NULL,
    `ma_khoa` INTEGER NULL,
    `ho` VARCHAR(50) NOT NULL,
    `ten` VARCHAR(50) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `gioi_tinh` ENUM('Nam', 'Nữ') NOT NULL,
    `dia_chi` VARCHAR(255) NOT NULL,
    `sdt` VARCHAR(12) NOT NULL,
    `cccd` VARCHAR(12) NOT NULL,
    `ngay_sinh` DATE NOT NULL,

    INDEX `fk_ma_khoa`(`ma_khoa`),
    PRIMARY KEY (`ma_nguoi_dung`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `phong_hoc` (
    `ma_dia_diem` VARCHAR(191) NOT NULL,
    `ten` VARCHAR(10) NOT NULL,
    `toa` VARCHAR(10) NOT NULL,
    `co_so` ENUM('CS_LTK', 'CS_DiAn') NOT NULL DEFAULT 'CS_LTK',
    `tang` INTEGER NOT NULL DEFAULT 0,
    `loai_phong` ENUM('LT', 'TN') NOT NULL DEFAULT 'LT',
    `soluong_bang` INTEGER NOT NULL DEFAULT 1,
    `soluong_ban` INTEGER NOT NULL DEFAULT 10,
    `soluong_ghe` INTEGER NOT NULL DEFAULT 20,
    `soluong_mic` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`ma_dia_diem`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `phong_hoc_ngoai_troi` (
    `ma_dia_diem` VARCHAR(191) NOT NULL,
    `ten` VARCHAR(20) NOT NULL DEFAULT '',
    `dia_chi` VARCHAR(20) NOT NULL DEFAULT '',
    `loai` VARCHAR(20) NULL,

    PRIMARY KEY (`ma_dia_diem`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `phong_hoc_online` (
    `ma_dia_diem` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ma_dia_diem`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sinh_vien` (
    `ma_nguoi_dung` INTEGER NOT NULL,
    `ma_gvcn` INTEGER NOT NULL,
    `ma_he_dao_tao` VARCHAR(4) NOT NULL,
    `ma_khoa_sv` VARCHAR(5) NOT NULL,
    `ma_chuan_av` INTEGER NOT NULL,
    `ma_chuan_sv` INTEGER NOT NULL DEFAULT 0,
    `ma_ctdt` VARCHAR(50) NULL,
    `ngay_ctxh` INTEGER NOT NULL DEFAULT 0,
    `gpa_tichluy` DECIMAL(3, 2) NULL DEFAULT 0.00,
    `tinchi_tichluy` INTEGER NULL DEFAULT 0,
    `ngay_nhap_hoc` DATE NULL,
    `han_dao_tao_sv` DATE NULL,
    `thoi_gian_bao_luu` DATE NULL,

    INDEX `FK_sinh_vien_chuan_anh_van`(`ma_chuan_av`),
    INDEX `FK_sinh_vien_chuan_sv`(`ma_chuan_sv`),
    INDEX `FK_sinh_vien_chuong_trinh_dao_tao`(`ma_ctdt`),
    INDEX `FK_sinh_vien_giang_vien`(`ma_gvcn`),
    INDEX `FK_sinh_vien_he_dao_tao`(`ma_he_dao_tao`),
    INDEX `FK_sinh_vien_khoa_sv`(`ma_khoa_sv`),
    PRIMARY KEY (`ma_nguoi_dung`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `song_hanh` (
    `ma_mon` VARCHAR(10) NOT NULL,
    `ma_mon_sh` VARCHAR(10) NOT NULL,

    INDEX `FK_tien_quyet_mon_hoc_2`(`ma_mon_sh`),
    PRIMARY KEY (`ma_mon`, `ma_mon_sh`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tien_quyet` (
    `ma_mon` VARCHAR(10) NOT NULL,
    `ma_mon_tq` VARCHAR(10) NOT NULL,

    INDEX `FK_tien_quyet_mon_hoc_2`(`ma_mon_tq`),
    PRIMARY KEY (`ma_mon`, `ma_mon_tq`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tiet_hoc` (
    `ma_tiet` INTEGER NOT NULL,
    `gio_bat_dau` TIME(0) NOT NULL,
    `gio_ket_thuc` TIME(0) NOT NULL,
    `giao_lao` TIME(0) NOT NULL DEFAULT ('00:10:00'),
    `buoi` ENUM('Sáng', 'Chiều', 'Tối') NOT NULL DEFAULT 'Sáng',

    PRIMARY KEY (`ma_tiet`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tuong_duong` (
    `ma_mon` VARCHAR(10) NOT NULL,
    `ma_mon_td` VARCHAR(10) NOT NULL,

    INDEX `FK_tien_quyet_mon_hoc_2`(`ma_mon_td`),
    PRIMARY KEY (`ma_mon`, `ma_mon_td`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `yeu_cau_anh_van` (
    `ma_chuan_anh_van` INTEGER NOT NULL,
    `ma_he_dao_tao` VARCHAR(4) NOT NULL,
    `ma_khoa_sv` VARCHAR(3) NOT NULL,
    `ten_chung_chi` VARCHAR(10) NOT NULL,
    `diem_toi_thieu` DECIMAL(4, 1) NULL,

    INDEX `FK_yeu_cau_anh_van_he_dao_tao`(`ma_he_dao_tao`),
    INDEX `FK_yeu_cau_anh_van_khoa_sv`(`ma_khoa_sv`),
    PRIMARY KEY (`ma_chuan_anh_van`, `ma_he_dao_tao`, `ma_khoa_sv`, `ten_chung_chi`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `bang_diem_hoc_ky` ADD CONSTRAINT `FK_bang_diem_hoc_ky_hoc_ky` FOREIGN KEY (`ma_hoc_ky`) REFERENCES `hoc_ky`(`ma_hk`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bang_diem_hoc_ky` ADD CONSTRAINT `FK_bang_diem_hoc_ky_sinh_vien` FOREIGN KEY (`ma_sv`) REFERENCES `sinh_vien`(`ma_nguoi_dung`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bang_diem_tong_ket` ADD CONSTRAINT `FK_bang_diem_tong_ket_sinh_vien` FOREIGN KEY (`ma_sv`) REFERENCES `sinh_vien`(`ma_nguoi_dung`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bang_tieng_anh_sv` ADD CONSTRAINT `FK_bang_tieng_anh_sv_chung_chi_tieng_anh` FOREIGN KEY (`ma_cc`) REFERENCES `chung_chi_tieng_anh`(`ma_cc`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bang_tieng_anh_sv` ADD CONSTRAINT `FK_bang_tieng_anh_sv_lich_su` FOREIGN KEY (`ma_lich_su`) REFERENCES `lich_su`(`ma_lich_su`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bang_tieng_anh_sv` ADD CONSTRAINT `FK_bang_tieng_anh_sv_sinh_vien` FOREIGN KEY (`ma_sv`) REFERENCES `sinh_vien`(`ma_nguoi_dung`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chi_tiet_diem_hk` ADD CONSTRAINT `FK_chi_tiet_diem_hk_bang_diem_hoc_ky` FOREIGN KEY (`ma_sv`, `ma_hk`, `ma_bang_diem_hk`) REFERENCES `bang_diem_hoc_ky`(`ma_sv`, `ma_hoc_ky`, `ma_bang_diem_hoc_ky`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chi_tiet_diem_hk` ADD CONSTRAINT `FK_chi_tiet_diem_hk_lop_hoc` FOREIGN KEY (`ten_lop`, `ma_mon`, `ma_hkL`) REFERENCES `lop_hoc`(`ten_lop`, `ma_mon`, `ma_hk`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chi_tiet_diem_tk` ADD CONSTRAINT `FK_chi_tiet_diem_tk_bang_diem_tong_ket` FOREIGN KEY (`ma_sv`, `ma_bang_diem_tk`) REFERENCES `bang_diem_tong_ket`(`ma_sv`, `ma_bang_diem_tk`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chi_tiet_diem_tk` ADD CONSTRAINT `FK_chi_tiet_diem_tk_mon_hoc` FOREIGN KEY (`ma_mon_hoc`) REFERENCES `mon_hoc`(`ma_mon_hoc`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chuan_sv` ADD CONSTRAINT `fk_chuan_sv_ma_chuan_anh_van` FOREIGN KEY (`ma_chuan_anh_van`) REFERENCES `chuan_anh_van`(`ma_chuan_anh_van`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chuong_trinh_dao_tao` ADD CONSTRAINT `FK_chuong_trinh_dao_tao_chuyen_nganh` FOREIGN KEY (`ma_chuyen_nganh`) REFERENCES `chuyen_nganh`(`ma_chuyen_nganh`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chuong_trinh_dao_tao` ADD CONSTRAINT `FK_chuong_trinh_dao_tao_he_dao_tao` FOREIGN KEY (`loai_sv_ap_dung`) REFERENCES `he_dao_tao`(`ma_he_dao_tao`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chuong_trinh_dao_tao` ADD CONSTRAINT `FK_chuong_trinh_dao_tao_khoa_sv` FOREIGN KEY (`ma_khoa_sv`) REFERENCES `khoa_sv`(`ma_khoa_sv`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chuyen_nganh` ADD CONSTRAINT `FK_chuyen_nganh_khoa` FOREIGN KEY (`ma_khoa`) REFERENCES `khoa`(`ma_khoa`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chuyen_vien_phong_dao_tao` ADD CONSTRAINT `fk_ma_nguoi_dung_chuyen_vien_pdt` FOREIGN KEY (`ma_nguoi_dung`) REFERENCES `nguoi_dung`(`ma_nguoi_dung`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dot_dang_ky_mon` ADD CONSTRAINT `FK_dot_dang_ky_mon_hoc_ky` FOREIGN KEY (`ma_hoc_ky`) REFERENCES `hoc_ky`(`ma_hk`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dot_dang_ky_mon` ADD CONSTRAINT `FK_dot_dang_ky_mon_lich_su` FOREIGN KEY (`ma_lich_su`) REFERENCES `lich_su`(`ma_lich_su`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `giang_vien` ADD CONSTRAINT `fk_ma_nguoi_dung_giang_vien` FOREIGN KEY (`ma_nguoi_dung`) REFERENCES `nguoi_dung`(`ma_nguoi_dung`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `giang_vien_day_lop_hoc` ADD CONSTRAINT `FK_giang_vien_day_lop_hoc_lop_hoc` FOREIGN KEY (`ten_lop`, `ma_mon`, `ma_hk`) REFERENCES `lop_hoc`(`ten_lop`, `ma_mon`, `ma_hk`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ke_hoach_giang_day` ADD CONSTRAINT `FK_ke_hoach_giang_day_chuong_trinh_dao_tao` FOREIGN KEY (`ma_ctdt`) REFERENCES `chuong_trinh_dao_tao`(`ma_ctdt`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ke_hoach_giang_day` ADD CONSTRAINT `FK_ke_hoach_giang_day_mon_hoc` FOREIGN KEY (`ma_mon`) REFERENCES `mon_hoc`(`ma_mon_hoc`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ket_qua_dk_mon` ADD CONSTRAINT `FK__dot_dang_ky_mon` FOREIGN KEY (`ma_dot_dk`) REFERENCES `dot_dang_ky_mon`(`ma_dot_dk`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `khuyen_nghi` ADD CONSTRAINT `khuyen_nghi_ibfk_1` FOREIGN KEY (`ma_mon`) REFERENCES `mon_hoc`(`ma_mon_hoc`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `khuyen_nghi` ADD CONSTRAINT `khuyen_nghi_ibfk_2` FOREIGN KEY (`ma_mon_kn`) REFERENCES `mon_hoc`(`ma_mon_hoc`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lich_lop_hoc` ADD CONSTRAINT `FK_lich_lop_hoc_dia_diem_hoc` FOREIGN KEY (`ma_dia_diem`) REFERENCES `dia_diem_hoc`(`ma_dia_diem`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lich_lop_hoc` ADD CONSTRAINT `FK_lich_lop_hoc_lop_hoc` FOREIGN KEY (`ten_lop`, `ma_mon`, `ma_hk`) REFERENCES `lop_hoc`(`ten_lop`, `ma_mon`, `ma_hk`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lich_lop_hoc` ADD CONSTRAINT `FK_lich_lop_hoc_tiet_hoc` FOREIGN KEY (`tiet_bat_dau`) REFERENCES `tiet_hoc`(`ma_tiet`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lich_lop_hoc` ADD CONSTRAINT `FK_lich_lop_hoc_tiet_hoc_2` FOREIGN KEY (`tiet_ket_thuc`) REFERENCES `tiet_hoc`(`ma_tiet`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lich_su` ADD CONSTRAINT `FK_lich_su_chuyen_vien_phong_dao_tao` FOREIGN KEY (`ma_cvpdt`) REFERENCES `chuyen_vien_phong_dao_tao`(`ma_nguoi_dung`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `link_hoc_online` ADD CONSTRAINT `FK__phong_hoc_online` FOREIGN KEY (`ma_dia_diem`) REFERENCES `phong_hoc_online`(`ma_dia_diem`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lop_hoc` ADD CONSTRAINT `FK__he_dao_tao` FOREIGN KEY (`ma_he_dao_tao`) REFERENCES `he_dao_tao`(`ma_he_dao_tao`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lop_hoc` ADD CONSTRAINT `FK_lop_hoc_dot_dang_ky_mon` FOREIGN KEY (`ma_dot_dk`) REFERENCES `dot_dang_ky_mon`(`ma_dot_dk`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lop_hoc` ADD CONSTRAINT `FK_lop_hoc_hoc_ky` FOREIGN KEY (`ma_hk`) REFERENCES `hoc_ky`(`ma_hk`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lop_hoc` ADD CONSTRAINT `FK_lop_hoc_lop_hoc` FOREIGN KEY (`ten_lop_pt`, `ma_mon_pt`, `ma_hk_pt`) REFERENCES `lop_hoc`(`ten_lop`, `ma_mon`, `ma_hk`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lop_hoc` ADD CONSTRAINT `FK_lop_hoc_mon_hoc` FOREIGN KEY (`ma_mon`) REFERENCES `mon_hoc`(`ma_mon_hoc`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lop_hoc_sv_dang_ky` ADD CONSTRAINT `FK_lop_hoc_sv_dang_ky_ket_qua_dk_mon` FOREIGN KEY (`ma_ket_qua`, `ma_dot_dk`, `ma_hoc_ky1`, `ma_sv`) REFERENCES `ket_qua_dk_mon`(`ma_ket_qua_dkmh`, `ma_dot_dk`, `ma_hoc_ky`, `ma_sv`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lop_hoc_sv_dang_ky` ADD CONSTRAINT `FK_lop_hoc_sv_dang_ky_lop_hoc` FOREIGN KEY (`ten_lop_hoc`, `ma_mon_hoc`, `ma_hoc_ky`) REFERENCES `lop_hoc`(`ten_lop`, `ma_mon`, `ma_hk`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mon_hoc` ADD CONSTRAINT `FK_monhoc_khoa` FOREIGN KEY (`ma_khoa`) REFERENCES `khoa`(`ma_khoa`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ngoai_le` ADD CONSTRAINT `FK_ngoai_le_chuyen_vien_phong_dao_tao` FOREIGN KEY (`ma_cvpdt`) REFERENCES `chuyen_vien_phong_dao_tao`(`ma_nguoi_dung`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ngoai_le` ADD CONSTRAINT `FK_ngoai_le_lich_su` FOREIGN KEY (`ma_lich_su`) REFERENCES `lich_su`(`ma_lich_su`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ngoai_le` ADD CONSTRAINT `FK_ngoai_le_loai_ngoai_le` FOREIGN KEY (`ma_loai_nl`) REFERENCES `loai_ngoai_le`(`ma_loai_nl`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ngoai_le` ADD CONSTRAINT `FK_ngoai_le_sinh_vien` FOREIGN KEY (`ma_sinh_vien`) REFERENCES `sinh_vien`(`ma_nguoi_dung`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `nguoi_dung` ADD CONSTRAINT `fk_ma_khoa` FOREIGN KEY (`ma_khoa`) REFERENCES `khoa`(`ma_khoa`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `phong_hoc` ADD CONSTRAINT `FK_phong_hoc_dia_diem_hoc` FOREIGN KEY (`ma_dia_diem`) REFERENCES `dia_diem_hoc`(`ma_dia_diem`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `phong_hoc_ngoai_troi` ADD CONSTRAINT `FK_phong_hoc_ngoai_troi_dia_diem_hoc` FOREIGN KEY (`ma_dia_diem`) REFERENCES `dia_diem_hoc`(`ma_dia_diem`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `phong_hoc_online` ADD CONSTRAINT `FK__dia_diem_hoc` FOREIGN KEY (`ma_dia_diem`) REFERENCES `dia_diem_hoc`(`ma_dia_diem`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sinh_vien` ADD CONSTRAINT `FK_sinh_vien_chuan_anh_van` FOREIGN KEY (`ma_chuan_av`) REFERENCES `chuan_anh_van`(`ma_chuan_anh_van`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sinh_vien` ADD CONSTRAINT `FK_sinh_vien_chuan_sv` FOREIGN KEY (`ma_chuan_sv`) REFERENCES `chuan_sv`(`ma_chuan_sv`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sinh_vien` ADD CONSTRAINT `FK_sinh_vien_chuong_trinh_dao_tao` FOREIGN KEY (`ma_ctdt`) REFERENCES `chuong_trinh_dao_tao`(`ma_ctdt`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sinh_vien` ADD CONSTRAINT `FK_sinh_vien_giang_vien` FOREIGN KEY (`ma_gvcn`) REFERENCES `giang_vien`(`ma_nguoi_dung`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sinh_vien` ADD CONSTRAINT `FK_sinh_vien_he_dao_tao` FOREIGN KEY (`ma_he_dao_tao`) REFERENCES `he_dao_tao`(`ma_he_dao_tao`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sinh_vien` ADD CONSTRAINT `FK_sinh_vien_khoa_sv` FOREIGN KEY (`ma_khoa_sv`) REFERENCES `khoa_sv`(`ma_khoa_sv`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `song_hanh` ADD CONSTRAINT `song_hanh_ibfk_1` FOREIGN KEY (`ma_mon`) REFERENCES `mon_hoc`(`ma_mon_hoc`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `song_hanh` ADD CONSTRAINT `song_hanh_ibfk_2` FOREIGN KEY (`ma_mon_sh`) REFERENCES `mon_hoc`(`ma_mon_hoc`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tien_quyet` ADD CONSTRAINT `FK_tien_quyet_mon_hoc` FOREIGN KEY (`ma_mon`) REFERENCES `mon_hoc`(`ma_mon_hoc`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tien_quyet` ADD CONSTRAINT `FK_tien_quyet_mon_hoc_2` FOREIGN KEY (`ma_mon_tq`) REFERENCES `mon_hoc`(`ma_mon_hoc`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tuong_duong` ADD CONSTRAINT `tuong_duong_ibfk_1` FOREIGN KEY (`ma_mon`) REFERENCES `mon_hoc`(`ma_mon_hoc`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tuong_duong` ADD CONSTRAINT `tuong_duong_ibfk_2` FOREIGN KEY (`ma_mon_td`) REFERENCES `mon_hoc`(`ma_mon_hoc`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `yeu_cau_anh_van` ADD CONSTRAINT `FK_yeu_cau_anh_van_he_dao_tao` FOREIGN KEY (`ma_he_dao_tao`) REFERENCES `he_dao_tao`(`ma_he_dao_tao`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `yeu_cau_anh_van` ADD CONSTRAINT `FK_yeu_cau_anh_van_khoa_sv` FOREIGN KEY (`ma_khoa_sv`) REFERENCES `khoa_sv`(`ma_khoa_sv`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `yeu_cau_anh_van` ADD CONSTRAINT `fk_ma_chuan_anh_van_yeu_cau_anh_van` FOREIGN KEY (`ma_chuan_anh_van`) REFERENCES `chuan_anh_van`(`ma_chuan_anh_van`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AlterTable
ALTER TABLE `chuong_trinh_dao_tao` MODIFY `thoi_gian_ket_thuc` DATE NOT NULL DEFAULT ('2030-08-01');

-- AlterTable
ALTER TABLE `tiet_hoc` MODIFY `giao_lao` TIME(0) NOT NULL DEFAULT ('00:10:00');

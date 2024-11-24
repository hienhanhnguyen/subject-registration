SELECT * FROM course_registration_system.chuan_sv;

ALTER TABLE `chuan_sv` MODIFY `ten_chuan_sv` VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci;
truncate table chuan_sv;
INSERT INTO `chuan_sv` (`ma_chuan_sv`, `ten_chuan_sv`, `tin_chi_tich_luy`, `ma_chuan_anh_van`, `ctxh_yeu_cau`) VALUES
(1, 'SV trình độ năm 1', 0, 0, 0),
(2, 'SV trình độ năm 2', 28, 1, 0),
(3, 'SV trình độ năm 3', 56, 2, 0),
(4, 'SV trình độ năm 4', 84, 3, 0),
(5, 'Đăng ký thực tập ngoài trường', 100, 5, 0),
(6, 'Đăng ký đồ án chuyên ngành', 100, 4, 0),
(7, 'Đăng ký đồ án tốt nghiệp', 110, 6, 10),
(8, 'Tốt nghiệp', 128, 7, 15);



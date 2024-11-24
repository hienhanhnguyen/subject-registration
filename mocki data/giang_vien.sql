
use course_registration_system;
ALTER TABLE giang_vien MODIFY bang_cap VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci;
ALTER TABLE nguoi_dung MODIFY sdt VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci;

-- select * from nguoi_dung;
-- select * from giang_vien;
-- truncate table giang_vien;
-- truncate table nguoi_dung;

-- teacher 
-- Điện - Điện tử - 1
INSERT INTO nguoi_dung
VALUES
(10001, 1, 'Nguyễn', 'Văn An', 'nguyen.vanan@hcmut.edu.vn', '10001', 'Nam', 'TP.HCM', '038 647 2581', '0912345678', '1989-03-02'),
(10002, 1, 'Trần', 'Thị Bích', 'tran.thibich@hcmut.edu.vn', '10002', 'Nữ', 'TP.HCM', '038 647 2592', '0908765432', '1991-04-10'),
(10003, 1, 'Phạm', 'Minh Hoàng', 'pham.minhhoang@hcmut.edu.vn', '10003', 'Nam', 'TP.HCM', '038 647 2603', '0938765432', '1988-11-22'),
(10004, 1, 'Hoàng', 'Ngọc Lan', 'hoang.ngoclan@hcmut.edu.vn', '10004', 'Nữ', 'TP.HCM', '038 647 2614', '0987654321', '1992-07-15'),
(10005, 1, 'Lý', 'Quốc Khánh', 'ly.quockhanh@hcmut.edu.vn', '10005', 'Nam', 'TP.HCM', '038 647 2625', '0976543210', '1990-12-05');

INSERT INTO giang_vien (ma_nguoi_dung, bang_cap, hoc_vi, hoc_ham) 
VALUES
(10001, 'Cử nhân Điện - Điện tử', 'Thạc sĩ', 'Phó giáo sư'),
(10002, 'Cử nhân Viễn thông', 'Tiến sĩ', 'Giáo sư'),
(10003, 'Kỹ sư Điện tử công nghiệp', 'Thạc sĩ', NULL),
(10004, 'Cử nhân Điện tử truyền thông', 'Cử nhân', NULL),
(10005, 'Cử nhân Kỹ thuật viễn thông', 'Kỹ sư', 'Phó giáo sư');

-- Xây dựng - 2
INSERT INTO nguoi_dung
VALUES
(10006, 2, 'Lương', 'Văn Hải', 'luong.vanhai@hcmut.edu.vn', '10006', 'Nam', 'TP.HCM', '038 647 2636', '0911111111', '1985-05-01'),
(10007, 2, 'Lê', 'Hoài Long', 'le.hoailong@hcmut.edu.vn', '10007', 'Nam', 'TP.HCM', '038 647 2647', '0922222222', '1986-06-15'),
(10008, 2, 'Lương', 'Đức Long', 'luong.duclong@hcmut.edu.vn', '10008', 'Nam', 'TP.HCM', '038 647 2658', '0933333333', '1984-07-20'),
(10009, 2, 'Nguyễn', 'Anh Thư', 'nguyen.anhthu@hcmut.edu.vn', '10009', 'Nữ', 'TP.HCM', '038 647 2669', '0944444444', '1990-09-30'),
(10010, 2, 'Đỗ', 'Tiến Sỹ', 'do.tiensy@hcmut.edu.vn', '10010', 'Nam', 'TP.HCM', '038 647 2670', '0955555555', '1987-08-25'),
(10011, 2, 'Nguyễn', 'Thanh Phong', 'nguyen.thanhphong@hcmut.edu.vn', '10011', 'Nam', 'TP.HCM', '038 647 2681', '0966666666', '1989-12-10');

INSERT INTO giang_vien (ma_nguoi_dung, bang_cap, hoc_vi, hoc_ham) 
VALUES
(10006, 'Cử nhân Kỹ thuật xây dựng', 'Thạc sĩ', NULL),
(10007, 'Cử nhân Xây dựng dân dụng', 'Tiến sĩ', 'Giáo sư'),
(10008, 'Kỹ sư Xây dựng công trình', 'Thạc sĩ', 'Phó giáo sư'),
(10009, 'Cử nhân Kỹ thuật cầu đường', 'Cử nhân', NULL),
(10010, 'Kỹ sư Kết cấu xây dựng', 'Tiến sĩ', 'Phó giáo sư'),
(10011, 'Cử nhân Kỹ thuật vật liệu', 'Thạc sĩ', NULL);

-- Cơ khí - 3
INSERT INTO nguoi_dung
VALUES
(10012, 3, 'Lương', 'Vũ An', 'luong.vuan@hcmut.edu.vn', '10012', 'Nam', 'TP.HCM', '038 647 2636', '0911111112', '1985-05-01'),
(10013, 3, 'Lê', 'Triết Hưng', 'le.triethung@hcmut.edu.vn', '10013', 'Nam', 'TP.HCM', '038 647 2647', '0922222322', '1986-06-15'),
(10014, 3, 'Lương', 'Hoàng Long', 'luong.hoanglong@hcmut.edu.vn', '10014', 'Nam', 'TP.HCM', '038 647 2658', '0943333333', '1984-07-20'),
(10015, 3, 'Nguyễn', 'Hải Nam', 'nguyen.hainam@hcmut.edu.vn', '10015', 'Nữ', 'TP.HCM', '038 647 2669', '0944444544', '1990-09-30'),
(10016, 3, 'Đỗ', 'Hữu Nghị', 'do.huunghi@hcmut.edu.vn', '10016', 'Nam', 'TP.HCM', '038 647 2670', '0955555556', '1987-08-25'),
(10017, 3, 'Nguyễn', 'Quốc Nguyên', 'nguyen.quocnguyen@hcmut.edu.vn', '10017', 'Nam', 'TP.HCM', '038 647 2681', '0976666666', '1989-12-10');

INSERT INTO giang_vien (ma_nguoi_dung, bang_cap, hoc_vi, hoc_ham)  
VALUES 
(10012, 'Cử nhân Kỹ thuật cơ khí', 'Thạc sĩ', NULL),
(10013, 'Kỹ sư Cơ khí chế tạo', 'Tiến sĩ', 'Giáo sư'),
(10014, 'Cử nhân Cơ khí động lực', 'Thạc sĩ', 'Phó giáo sư'),
(10015, 'Kỹ sư Công nghệ cơ khí', 'Cử nhân', NULL),
(10016, 'Cử nhân Kỹ thuật cơ khí', 'Tiến sĩ', 'Phó giáo sư'), -- Rút ngắn lại
(10017, 'Kỹ sư Cơ khí ứng dụng', 'Thạc sĩ', NULL);

-- Ki thuat hoa hoc - 4
INSERT INTO nguoi_dung
VALUES
(10018, 4, 'Lương', 'Thu Trà', 'luong.thutra@hcmut.edu.vn', '10018', 'Nam', 'TP.HCM', '038 647 2636', '0911111122', '1985-05-01'),
(10019, 4, 'Lê', 'Quang Long', 'le.quanglong@hcmut.edu.vn', '10019', 'Nam', 'TP.HCM', '038 647 2647', '0922222332', '1986-06-15'),
(10020, 4, 'Lương', 'Tấn Việt', 'luong.tanviet@hcmut.edu.vn', '10020', 'Nam', 'TP.HCM', '038 647 2658', '0943334333', '1984-07-20'),
(10021, 4, 'Nguyễn', 'Lệ Tâm', 'nguyen.letam@hcmut.edu.vn', '10021', 'Nữ', 'TP.HCM', '038 647 2669', '0944444554', '1990-09-30'),
(10022, 4, 'Đỗ', 'Minh Kha', 'do.minhkha@hcmut.edu.vn', '10022', 'Nam', 'TP.HCM', '038 647 2670', '0955555576', '1987-08-25');

INSERT INTO giang_vien (ma_nguoi_dung, bang_cap, hoc_vi, hoc_ham) 
VALUES
(10018, 'Cử nhân Kỹ thuật hóa học', 'Thạc sĩ', NULL),
(10019, 'Kỹ sư Hóa công nghiệp', 'Tiến sĩ', 'Giáo sư'),
(10020, 'Cử nhân Công nghệ hóa học', 'Thạc sĩ', 'Phó giáo sư'),
(10021, 'Kỹ sư Kỹ thuật hóa phân tích', 'Cử nhân', NULL),
(10022, 'Cử nhân Kỹ thuật hóa môi trường', 'Tiến sĩ', 'Phó giáo sư');


-- khoa may tinh - 5
INSERT INTO nguoi_dung
VALUES
(10024, 5, 'Phạm', 'Trần Vũ', 'pham.tranvu@hcmut.edu.vn', '10023', 'Nam', 'TP.HCM', '038 647 2681', '0966666678', '1975-04-10'),
(10025, 5, 'Quản', 'Thành Thơ', 'quan.thanhtho@hcmut.edu.vn', '10024', 'Nam', 'TP.HCM', '038 647 2682', '0977777789', '1978-12-22'),
(10026, 5, 'Trần', 'Ngọc Thịnh', 'tran.ngocthinh@hcmut.edu.vn', '10025', 'Nam', 'TP.HCM', '038 647 2683', '0988888890', '1980-03-15'),
(10027, 5, 'Huỳnh', 'Tường Nguyên', 'huynh.tuongnguyen@hcmut.edu.vn', '10026', 'Nam', 'TP.HCM', '038 647 2684', '0999999901', '1982-07-18'),
(10028, 5, 'Trương', 'Tuấn Anh', 'truong.tuananh@hcmut.edu.vn', '10027', 'Nam', 'TP.HCM', '038 647 2685', '0910101011', '1985-11-05'),
(10029, 5, 'Nguyễn', 'Đức Thái', 'nguyen.ducthai@hcmut.edu.vn', '10028', 'Nam', 'TP.HCM', '038 647 2686', '0921212122', '1979-01-25');

INSERT INTO giang_vien (ma_nguoi_dung, bang_cap, hoc_vi, hoc_ham) 
VALUES
(10024, 'Cử nhân Khoa học máy tính', 'Thạc sĩ', 'Giáo sư'),
(10025, 'Kỹ sư Kỹ thuật phần mềm', 'Tiến sĩ', NULL),
(10026, 'Cử nhân Trí tuệ nhân tạo', 'Thạc sĩ', 'Phó giáo sư'),
(10027, 'Kỹ sư Hệ thống nhúng', 'Cử nhân', NULL),
(10028, 'Cử nhân An toàn thông tin', 'Tiến sĩ', 'Phó giáo sư'),
(10029, 'Kỹ sư Mạng máy tính', 'Thạc sĩ', NULL);


-- Cong nghe vat lieu - 6
INSERT INTO nguoi_dung
VALUES
(10030, 6, 'Nguyễn', 'Khánh Sơn', 'ksnguyen@hcmut.edu.vn', '10029', 'Nam', 'TP.HCM', '0933623629', '0933623629', '1976-10-20'),
(10031, 6, 'Cao', 'Xuân Việt', 'caoxuanviet@hcmut.edu.vn', '10030', 'Nam', 'TP.HCM', '0903055520', '0903055520', '1982-09-15'),
(10032, 6, 'Phạm', 'Trung Kiên', 'phamtrungkien@hcmut.edu.vn', '10031', 'Nam', 'TP.HCM', '0936310185', '0936310185', '1978-05-10');

INSERT INTO giang_vien (ma_nguoi_dung, bang_cap, hoc_vi, hoc_ham) 
VALUES
(10030, 'Cử nhân Kỹ thuật vật liệu', 'Thạc sĩ', NULL),
(10031, 'Kỹ sư Công nghệ vật liệu composite', 'Tiến sĩ', 'Phó giáo sư'),
(10032, 'Cử nhân Vật liệu Nano', 'Thạc sĩ', 'Giáo sư');

-- Khoa Khoa học Ứng dụng - 7
INSERT INTO nguoi_dung
VALUES
(10037, 7, 'Lê', 'Dương Hùng Anh', 'leduonghunganh@hcmut.edu.vn', '10032', 'Nam', 'TP.HCM', '038 647 2691', '0967777788', '1983-04-15'),
(10038, 7, 'Trần', 'Kim Bằng', 'trankimbang@hcmut.edu.vn', '10033', 'Nam', 'TP.HCM', '038 647 2692', '0978888899', '1984-06-20'),
(10039, 7, 'Nguyễn', 'Thái Hiền', 'nguyenthaihien@hcmut.edu.vn', '10034', 'Nam', 'TP.HCM', '038 647 2693', '0989999900', '1985-09-12'),
(10040, 7, 'Phạm', 'Quốc Hưng', 'phamquochung@hcmut.edu.vn', '10035', 'Nam', 'TP.HCM', '038 647 2694', '0991111222', '1982-12-05'),
(10041, 7, 'Nguyễn', 'Duy Khương', 'nguyenduykhuong@hcmut.edu.vn', '10036', 'Nam', 'TP.HCM', '038 647 2695', '0912222333', '1980-11-28'),
(10042, 7, 'Nguyễn', 'Tường Long', 'nguyentuonglong@hcmut.edu.vn', '10037', 'Nam', 'TP.HCM', '038 647 2696', '0923333444', '1979-03-10'),
(10043, 7, 'Nguyễn', 'Thanh Nhã', 'nguyenthanhnhat@hcmut.edu.vn', '10038', 'Nam', 'TP.HCM', '038 647 2697', '0934444555', '1981-08-01'),
(10044, 7, 'Trương', 'Tích Thiện', 'truongtichthien@hcmut.edu.vn', '10039', 'Nam', 'TP.HCM', '038 647 2698', '0945555666', '1977-02-14');

INSERT INTO giang_vien (ma_nguoi_dung, bang_cap, hoc_vi, hoc_ham) 
VALUES
(10037, 'Cử nhân Vật lý kỹ thuật', 'Thạc sĩ', NULL),
(10038, 'Kỹ sư Quang học ứng dụng', 'Tiến sĩ', 'Phó giáo sư'),
(10039, 'Cử nhân Toán ứng dụng', 'Thạc sĩ', 'Giáo sư'),
(10040, 'Kỹ sư Vật lý y sinh', 'Cử nhân', NULL),
(10041, 'Cử nhân Hóa lý', 'Tiến sĩ', NULL),
(10042, 'Kỹ sư Cơ lý thuyết', 'Thạc sĩ', 'Phó giáo sư'),
(10043, 'Cử nhân Sinh học phân tử', 'Tiến sĩ', 'Phó giáo sư'),
(10044, 'Kỹ sư Công nghệ sinh học', 'Thạc sĩ', NULL);

-- Khoa Kỹ thuật Giao thông - 8
INSERT INTO nguoi_dung
VALUES
(10045, 8, 'Bùi', 'Minh Trí', 'bui.minhtri@hcmut.edu.vn', '10040', 'Nam', 'TP.HCM', '038 647 2700', '0971234567', '1983-04-15'),
(10046, 8, 'Đoàn', 'Văn Kiệt', 'doan.vankiet@hcmut.edu.vn', '10041', 'Nam', 'TP.HCM', '038 647 2701', '0977654321', '1984-06-20'),
(10047, 8, 'Trịnh', 'Hoàng Anh', 'trinh.hoanganh@hcmut.edu.vn', '10042', 'Nam', 'TP.HCM', '038 647 2702', '0988765432', '1985-09-12'),
(10048, 8, 'Võ', 'Quốc Cường', 'vo.quoccuong@hcmut.edu.vn', '10043', 'Nam', 'TP.HCM', '038 647 2703', '0992345678', '1982-12-05'),
(10049, 8, 'Phan', 'Đình Khang', 'phan.dinhkhang@hcmut.edu.vn', '10044', 'Nam', 'TP.HCM', '038 647 2704', '0913456789', '1980-11-28'),
(10050, 8, 'Lâm', 'Văn Nhân', 'lam.vannhan@hcmut.edu.vn', '10045', 'Nam', 'TP.HCM', '038 647 2705', '0924567890', '1979-03-10'),
(10051, 8, 'Tô', 'Phúc Thịnh', 'to.phucthinh@hcmut.edu.vn', '10046', 'Nam', 'TP.HCM', '038 647 2706', '0935678901', '1981-08-01'),
(10052, 8, 'Dương', 'Thành Nam', 'duong.thanhnam@hcmut.edu.vn', '10047', 'Nam', 'TP.HCM', '038 647 2707', '0946789012', '1977-02-14');

INSERT INTO giang_vien (ma_nguoi_dung, bang_cap, hoc_vi, hoc_ham) 
VALUES
(10045, 'Cử nhân Kỹ thuật cầu đường', 'Thạc sĩ', 'Phó giáo sư'),
(10046, 'Kỹ sư Giao thông vận tải', 'Tiến sĩ', 'Giáo sư'),
(10047, 'Cử nhân Kỹ thuật hạ tầng đô thị', 'Thạc sĩ', NULL),
(10048, 'Kỹ sư Cơ khí giao thông', 'Cử nhân', NULL),
(10049, 'Cử nhân Kỹ thuật đường sắt', 'Tiến sĩ', 'Phó giáo sư'),
(10050, 'Kỹ sư Công trình giao thông', 'Thạc sĩ', NULL),
(10051, 'Cử nhân Kỹ thuật đường bộ', 'Thạc sĩ', 'Phó giáo sư'),
(10052, 'Kỹ sư Cầu cảng và bến bãi', 'Tiến sĩ', 'Giáo sư');

-- Khoa Quản lý công nghiệp - 9 
INSERT INTO nguoi_dung
VALUES
(10053, 9, 'Nguyễn', 'Hồng Phong', 'nguyen.hongphong@hcmut.edu.vn', '10048', 'Nam', 'TP.HCM', '038 647 2708', '0969876543', '1984-01-22'),
(10054, 9, 'Trần', 'Bảo Ngọc', 'tran.baongoc@hcmut.edu.vn', '10049', 'Nữ', 'TP.HCM', '038 647 2709', '0978765432', '1986-05-18'),
(10055, 9, 'Lê', 'Thanh Tú', 'le.thanhtu@hcmut.edu.vn', '10050', 'Nam', 'TP.HCM', '038 647 2710', '0987654321', '1983-11-29'),
(10056, 9, 'Phạm', 'Thị Thu Hà', 'pham.thuha@hcmut.edu.vn', '10051', 'Nữ', 'TP.HCM', '038 647 2711', '0912345678', '1985-02-14'),
(10057, 9, 'Hoàng', 'Xuân Lâm', 'hoang.xuanlam@hcmut.edu.vn', '10052', 'Nam', 'TP.HCM', '038 647 2712', '0923456789', '1987-03-09'),
(10058, 9, 'Vũ', 'Minh Hải', 'vu.minhhai@hcmut.edu.vn', '10053', 'Nam', 'TP.HCM', '038 647 2713', '0934567890', '1982-07-24'),
(10059, 9, 'Đặng', 'Thu Phương', 'dang.thuphuong@hcmut.edu.vn', '10054', 'Nữ', 'TP.HCM', '038 647 2714', '0945678901', '1986-10-05'),
(10060, 9, 'Bùi', 'Trung Hiếu', 'bui.trunghieu@hcmut.edu.vn', '10055', 'Nam', 'TP.HCM', '038 647 2715', '0956789012', '1981-09-17');

INSERT INTO giang_vien (ma_nguoi_dung, bang_cap, hoc_vi, hoc_ham) 
VALUES
(10053, 'Cử nhân Quản lý công nghiệp', 'Thạc sĩ', NULL),
(10054, 'Kỹ sư Quản lý sản xuất', 'Tiến sĩ', 'Phó giáo sư'),
(10055, 'Cử nhân Quản lý dự án', 'Thạc sĩ', 'Giáo sư'),
(10056, 'Kỹ sư Logistics và chuỗi cung ứng', 'Cử nhân', NULL),
(10057, 'Cử nhân Quản lý chất lượng', 'Tiến sĩ', 'Phó giáo sư'),
(10058, 'Kỹ sư Công nghệ công nghiệp', 'Thạc sĩ', NULL),
(10059, 'Cử nhân Quản lý tài nguyên', 'Tiến sĩ', 'Phó giáo sư'),
(10060, 'Kỹ sư Công nghệ và đổi mới', 'Thạc sĩ', NULL);

-- Khoa Kỹ thuật Địa chất và Dầu khí - 10
INSERT INTO nguoi_dung
VALUES
(10061, 10, 'Đặng', 'Minh Châu', 'dang.minhchau@hcmut.edu.vn', '10056', 'Nữ', 'TP.HCM', '038 647 2716', '0962345678', '1983-06-13'),
(10062, 10, 'Ngô', 'Văn Hoàng', 'ngo.vanhoang@hcmut.edu.vn', '10057', 'Nam', 'TP.HCM', '038 647 2717', '0973456789', '1985-09-25'),
(10063, 10, 'Trần', 'Quốc Huy', 'tran.quochuy@hcmut.edu.vn', '10058', 'Nam', 'TP.HCM', '038 647 2718', '0984567890', '1981-02-28'),
(10064, 10, 'Lý', 'Thị Thanh Hương', 'ly.thanhuong@hcmut.edu.vn', '10059', 'Nữ', 'TP.HCM', '038 647 2719', '0915678901', '1984-11-12');

INSERT INTO giang_vien (ma_nguoi_dung, bang_cap, hoc_vi, hoc_ham) 
VALUES
(10061, 'Cử nhân Kỹ thuật địa chất', 'Thạc sĩ', NULL),
(10062, 'Kỹ sư Địa chất dầu khí', 'Tiến sĩ', 'Phó giáo sư'),
(10063, 'Cử nhân Kỹ thuật khoáng sản', 'Thạc sĩ', 'Giáo sư'),
(10064, 'Kỹ sư Địa chất công trình', 'Cử nhân', NULL);

-- Khoa Môi trường và Tài nguyên - 11
INSERT INTO nguoi_dung
VALUES
(10065, 11, 'Phạm', 'Ngọc Anh', 'pham.ngocanh@hcmut.edu.vn', '10060', 'Nữ', 'TP.HCM', '038 647 2720', '0926789012', '1982-08-03'),
(10066, 11, 'Nguyễn', 'Hải Đăng', 'nguyen.haidang@hcmut.edu.vn', '10061', 'Nam', 'TP.HCM', '038 647 2721', '0937890123', '1986-12-21'),
(10067, 11, 'Lê', 'Thu Hằng', 'le.thuhang@hcmut.edu.vn', '10062', 'Nữ', 'TP.HCM', '038 647 2722', '0948901234', '1983-04-17'),
(10068, 11, 'Vũ', 'Minh Tùng', 'vu.minhtung@hcmut.edu.vn', '10063', 'Nam', 'TP.HCM', '038 647 2723', '0959012345', '1984-10-30');

INSERT INTO giang_vien (ma_nguoi_dung, bang_cap, hoc_vi, hoc_ham) 
VALUES
(10065, 'Cử nhân Kỹ thuật môi trường', 'Thạc sĩ', NULL),
(10066, 'Kỹ sư Quản lý tài nguyên', 'Tiến sĩ', 'Phó giáo sư'),
(10067, 'Cử nhân Khoa học môi trường', 'Thạc sĩ', 'Giáo sư'),
(10068, 'Kỹ sư Công nghệ môi trường', 'Cử nhân', NULL);

-- Trung tâm Bảo dưỡng Công nghiệp - 12
INSERT INTO nguoi_dung
VALUES
(10069, 12, 'Bùi', 'Thành Công', 'bui.thanhcong@hcmut.edu.vn', '10064', 'Nam', 'TP.HCM', '038 647 2724', '0960123456', '1985-01-05'),
(10070, 12, 'Đỗ', 'Bảo Khánh', 'do.baokhanh@hcmut.edu.vn', '10065', 'Nam', 'TP.HCM', '038 647 2725', '0971234567', '1986-07-14'),
(10071, 12, 'Hồ', 'Mỹ Linh', 'ho.mylinh@hcmut.edu.vn', '10066', 'Nữ', 'TP.HCM', '038 647 2726', '0982345678', '1982-03-23'),
(10072, 12, 'Trương', 'Văn Nam', 'truong.vannam@hcmut.edu.vn', '10067', 'Nam', 'TP.HCM', '038 647 2727', '0993456789', '1984-09-08');

INSERT INTO giang_vien (ma_nguoi_dung, bang_cap, hoc_vi, hoc_ham) 
VALUES
(10069, 'Cử nhân Kỹ thuật bảo trì', 'Thạc sĩ', NULL),
(10070, 'Kỹ sư Quản lý bảo trì công nghiệp', 'Tiến sĩ', 'Phó giáo sư'),
(10071, 'Cử nhân Bảo dưỡng công nghiệp', 'Thạc sĩ', 'Giáo sư'),
(10072, 'Kỹ sư Công nghệ bảo trì', 'Cử nhân', NULL);
-- Trung tâm Ngoại ngữ - 13
INSERT INTO nguoi_dung
VALUES
(10073, 13, 'Phan', 'Hương Giang', 'phan.huonggiang@hcmut.edu.vn', '10068', 'Nữ', 'TP.HCM', '038 647 2728', '0914567890', '1983-05-16'),
(10074, 13, 'Trịnh', 'Quốc Thắng', 'trinhquocthang@hcmut.edu.vn', '10069', 'Nam', 'TP.HCM', '038 647 2729', '0925678901', '1985-08-11'),
(10075, 13, 'Nguyễn', 'Lan Phương', 'nguyen.lanphuong@hcmut.edu.vn', '10070', 'Nữ', 'TP.HCM', '038 647 2730', '0936789012', '1986-03-04'),
(10076, 13, 'Hoàng', 'Minh Quân', 'hoang.minhquan@hcmut.edu.vn', '10071', 'Nam', 'TP.HCM', '038 647 2731', '0947890123', '1981-12-20');
	

INSERT INTO giang_vien (ma_nguoi_dung, bang_cap, hoc_vi, hoc_ham) 
VALUES
(10073, 'Cử nhân Tiếng Anh chuyên ngành kỹ thuật', 'Thạc sĩ', NULL),
(10074, 'Cử nhân Ngôn ngữ học ứng dụng', 'Tiến sĩ', 'Giáo sư'),
(10075, 'Cử nhân Giảng dạy ngoại ngữ', 'Thạc sĩ', 'Phó giáo sư'),
(10076, 'Cử nhân Ngôn ngữ học', 'Cử nhân', NULL);





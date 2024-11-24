
-- select * from lich_su;
-- describe lich_su;
ALTER TABLE lich_su 
MODIFY COLUMN gia_tri_cu VARCHAR(50),
MODIFY COLUMN gia_tri_moi VARCHAR(50);
ALTER TABLE lich_su MODIFY COLUMN hanh_dong VARCHAR(50);

INSERT INTO lich_su (ma_lich_su, ma_cvpdt, hanh_dong, mo_ta, ngay_cap_nhat, gia_tri_cu, gia_tri_moi) VALUES
("NL_1", 99001,'Cho phép ngoại lệ','Create','2023-01-15',NULL, 'APPROVED');

INSERT INTO lich_su (ma_lich_su, ma_cvpdt, hanh_dong, mo_ta, ngay_cap_nhat, gia_tri_cu, gia_tri_moi) VALUES
("LS_HK241_D1", 99002,'Mở đăng kí môn','Create','2023-01-15',NULL, 'APPROVED');

INSERT INTO lich_su (ma_lich_su, ma_cvpdt, hanh_dong, mo_ta, ngay_cap_nhat, gia_tri_cu, gia_tri_moi) VALUES
(3, 99003,'Cập nhật bằng tiếng anh','Create','2023-01-15',NULL, 'APPROVED');



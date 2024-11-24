

CREATE TABLE IF NOT EXISTS `ket_qua_dk_mon` (
  `ma_ket_qua_dkmh` int(11) NOT NULL AUTO_INCREMENT,
  `ma_dot_dk` varchar(50) NOT NULL,
  `ma_hoc_ky` varchar(50) NOT NULL,
  `ma_sv` int(11) NOT NULL,
  `tong_tin_chi` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`ma_ket_qua_dkmh`,`ma_dot_dk`,`ma_hoc_ky`,`ma_sv`),
  KEY `FK__dot_dang_ky_mon` (`ma_dot_dk`,`ma_hoc_ky`),
  KEY `FK__sinh_vien` (`ma_sv`),
  CONSTRAINT `FK__dot_dang_ky_mon` FOREIGN KEY (`ma_dot_dk`, `ma_hoc_ky`) REFERENCES `dot_dang_ky_mon` (`ma_dot_dk`, `ma_hoc_ky`) ON UPDATE CASCADE,
  CONSTRAINT `FK__sinh_vien` FOREIGN KEY (`ma_sv`) REFERENCES `sinh_vien` (`ma_nguoi_dung`) ON UPDATE CASCADE
);

describe ket_qua_dk_mon;
select * from dot_dang_ky_mon;
select * from sinh_vien;
select * from ket_qua_dk_mon;
select * from lop_hoc;

INSERT INTO ket_qua_dk_mon (ma_dot_dk, ma_hoc_ky, ma_sv, tong_tin_chi)
SELECT 
    ddk.ma_dot_dk, 
    ddk.ma_hoc_ky, 
    sv.ma_nguoi_dung, 
    14
FROM 
    sinh_vien sv
CROSS JOIN 
    dot_dang_ky_mon ddk
WHERE 
    CAST(SUBSTRING(ddk.ma_hoc_ky, 3, 2) AS UNSIGNED) >= CAST(SUBSTRING(sv.ma_nguoi_dung, 1, 2) AS UNSIGNED);


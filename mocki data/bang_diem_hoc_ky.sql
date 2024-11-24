
CREATE TABLE IF NOT EXISTS `bang_diem_hoc_ky` (
  `ma_sv` int(11) NOT NULL,
  `ma_hoc_ky` varchar(50) NOT NULL,
  `ma_bang_diem_hoc_ky` int(11) NOT NULL DEFAULT 1,
  `gpa_4_hoc_ky` decimal(4,2) NOT NULL DEFAULT 0.00,
  `gpa_10_hoc_ky` decimal(4,2) NOT NULL DEFAULT 0.00,
  `tin_chi_hoc_ky` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`ma_sv`,`ma_hoc_ky`,`ma_bang_diem_hoc_ky`),
  KEY `FK_bang_diem_hoc_ky_hoc_ky` (`ma_hoc_ky`),
  CONSTRAINT `FK_bang_diem_hoc_ky_hoc_ky` FOREIGN KEY (`ma_hoc_ky`) REFERENCES `hoc_ky` (`ma_hk`) ON UPDATE CASCADE,
  CONSTRAINT `FK_bang_diem_hoc_ky_sinh_vien` FOREIGN KEY (`ma_sv`) REFERENCES `sinh_vien` (`ma_nguoi_dung`) ON UPDATE CASCADE
) ;


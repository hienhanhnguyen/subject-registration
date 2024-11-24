
CREATE TABLE IF NOT EXISTS `giang_vien_day_lop_hoc` (
  `ma_gv` int(11) NOT NULL,
  `ten_lop` varchar(50) NOT NULL,
  `ma_mon` varchar(50) NOT NULL,
  `ma_hk` varchar(50) NOT NULL,
  PRIMARY KEY (`ma_gv`,`ma_hk`,`ma_mon`,`ten_lop`),
  KEY `FK_giang_vien_day_lop_hoc_lop_hoc` (`ten_lop`,`ma_mon`,`ma_hk`),
  CONSTRAINT `FK__giang_vien` FOREIGN KEY (`ma_gv`) REFERENCES `giang_vien` (`ma_nguoi_dung`) ON UPDATE CASCADE,
  CONSTRAINT `FK_giang_vien_day_lop_hoc_lop_hoc` FOREIGN KEY (`ten_lop`, `ma_mon`, `ma_hk`) REFERENCES `lop_hoc` (`ten_lop`, `ma_mon`, `ma_hk`) ON UPDATE CASCADE
);

select * from giang_vien;
select * from mon_hoc;


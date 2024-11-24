

CREATE TABLE IF NOT EXISTS `lop_hoc_sv_dang_ky` (
  `ten_lop_hoc` varchar(50) NOT NULL,
  `ma_mon_hoc` varchar(50) NOT NULL,
  `ma_hoc_ky` varchar(50) NOT NULL,
  `ma_ket_qua` int(11) NOT NULL,
  `ma_dot_dk` varchar(50) NOT NULL,
  `ma_hoc_ky1` varchar(50) NOT NULL,
  `ma_sv` int(11) NOT NULL,
  PRIMARY KEY (`ten_lop_hoc`,`ma_mon_hoc`,`ma_hoc_ky`,`ma_ket_qua`,`ma_dot_dk`,`ma_hoc_ky1`,`ma_sv`),
  KEY `FK_lop_hoc_sv_dang_ky_ket_qua_dk_mon` (`ma_ket_qua`,`ma_dot_dk`,`ma_hoc_ky1`,`ma_sv`),
  CONSTRAINT `FK_lop_hoc_sv_	dang_ky_ket_qua_dk_mon` FOREIGN KEY (`ma_ket_qua`, `ma_dot_dk`, `ma_hoc_ky1`, `ma_sv`) REFERENCES `ket_qua_dk_mon` (`ma_ket_qua_dkmh`, `ma_dot_dk`, `ma_hoc_ky`, `ma_sv`) ON UPDATE CASCADE,
  CONSTRAINT `FK_lop_hoc_sv_dang_ky_lop_hoc` FOREIGN KEY (`ten_lop_hoc`, `ma_mon_hoc`, `ma_hoc_ky`) REFERENCES `lop_hoc` (`ten_lop`, `ma_mon`, `ma_hk`) ON UPDATE CASCADE
) ;

INSERT INTO lop_hoc_sv_dang_ky (ten_lop_hoc, ma_mon_hoc, ma_hoc_ky, ma_ket_qua, ma_dot_dk, ma_hoc_ky1, ma_sv)
SELECT 'L01' AS ten_lop_hoc, 
       hardcoded.ma_mon_hoc, 
       kqdm.ma_hoc_ky AS ma_hoc_ky, 
       kqdm.ma_ket_qua_dkmh AS ma_ket_qua, 
       kqdm.ma_dot_dk, 
       kqdm.ma_hoc_ky AS ma_hoc_ky1, 
       kqdm.ma_sv
FROM ket_qua_dk_mon kqdm
JOIN (
    SELECT '007303' AS ma_mon_hoc
    UNION SELECT '0X6603'
    UNION SELECT '216303'
    UNION SELECT 'AS1001'
) hardcoded
ON kqdm.ma_hoc_ky = kqdm.ma_hoc_ky;

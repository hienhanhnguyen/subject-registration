
-- select * from yeu_cau_anh_van;
-- describe yeu_cau_anh_van;

-- truncate table yeu_cau_anh_van;

INSERT INTO yeu_cau_anh_van (ma_khoa_sv, ma_he_dao_tao, ten_chung_chi, ma_chuan_anh_van, diem_toi_thieu)
VALUES 
-- Chính quy đại trà: Khóa 2018 về trước: 500, Khóa 2019: 550, Từ Khóa 2020 về sau: 600
('K22', 'CQ', 'TOEIC_RL', 4, 550),
('K16', 'CQ', 'TOEIC_RL', 7, 500),
('K17', 'CQ', 'TOEIC_RL', 7, 500),
('K18', 'CQ', 'TOEIC_RL', 7, 500),
('K20', 'CQ', 'TOEIC_RL', 7, 600),
('K21', 'CQ', 'TOEIC_RL', 7, 600),
('K22', 'CQ', 'TOEIC_RL', 7, 600),
('K23', 'CQ', 'TOEIC_RL', 7, 600),
('K24', 'CQ', 'TOEIC_RL', 7, 600),
('K20', 'CQ', 'IELTS', 4, 5.0),
('K21', 'CQ', 'IELTS', 4, 5.0),
('K23', 'CQ', 'IELTS', 4, 5.0),
('K24', 'CQ', 'IELTS', 4, 5.0),
('K22', 'CQ', 'IELTS', 4, 5.0);

INSERT INTO yeu_cau_anh_van (ma_he_dao_tao,ma_khoa_sv, ten_chung_chi, ma_chuan_anh_van, diem_toi_thieu)
values
('VP', 'K18', 'TOEIC_RL', 7, 600),
('VP', 'K19', 'TOEIC_RL', 7, 650),
('VP', 'K20', 'TOEIC_RL', 7, 700),
('VHVL', 'K18', 'TOEIC_RL', 7, 400),
('VHVL', 'K19', 'TOEIC_RL', 7, 450),
('VHVL', 'K20', 'TOEIC_RL', 7, 500),
('DTTX', 'K20', 'TOEIC_RL', 7, 600),
('CQ', 'K18', 'TOEIC_SW', 7, 200),
('CQ', 'K19', 'TOEIC_SW', 7, 200),
('CQ', 'K20', 'TOEIC_SW', 7, 200),
('CQ', 'K21', 'TOEIC_SW', 7, 200),
('CQ', 'K22', 'TOEIC_SW', 7, 200),
('CQ', 'K23', 'TOEIC_SW', 7, 200),
('CQ', 'K24', 'TOEIC_SW', 7, 200),
('VP', 'K18', 'TOEIC_SW', 7, 245),
('VP', 'K19', 'TOEIC_SW', 7, 245),
('VP', 'K20', 'TOEIC_SW', 7, 245),
('VP', 'K21', 'TOEIC_SW', 7, 245),
('VP', 'K22', 'TOEIC_SW', 7, 245),
('VP', 'K23', 'TOEIC_SW', 7, 245),
('VP', 'K24', 'TOEIC_SW', 7, 245),
('VN', 'K18', 'TOEIC_SW', 7, 200),
('VN', 'K19', 'TOEIC_SW', 7, 200),
('VN', 'K20', 'TOEIC_SW', 7, 200),
('VN', 'K21', 'TOEIC_SW', 7, 200),
('VN', 'K22', 'TOEIC_SW', 7, 200),
('VN', 'K23', 'TOEIC_SW', 7, 200),
('VN', 'K24', 'TOEIC_SW', 7, 200);


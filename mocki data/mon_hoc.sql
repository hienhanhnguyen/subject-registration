

use course_registration_system;
SET FOREIGN_KEY_CHECKS = 0;

INSERT INTO `mon_hoc` (
    `ma_mon_hoc`,
    `ten_mon_hoc_VIE`,
    `ten_mon_hoc_ENG`,
    `ma_khoa`,
    `chuan_mon_hoc`,
    `co_lop_phu_thuoc`,
    `he_so_BT`,
    `he_so_BTL`,
    `tin_chi`,
    `he_so_TN`,
    `he_so_GK`,
    `he_so_CK`
)
VALUES
	('AS2053', 'T/bị chẩn đoán h/ảnh yh', 'Medical Imaging Devices', 1, 1, 0, 0.20, 0.25, 3, 0.15, 0.15, 0.25),
    ('AS2055', 'Cơ kỹ thuật đại cương', 'General Engineering Mechanics', 2, 1, 0, 0.20, 0.20, 3, 0.20, 0.20, 0.20),
    ('AS2057', 'P/pháp phầntử hữuhạn ckt', 'Finite Element Methods in Mech Eng', 3, 1, 0, 0.20, 0.20, 3, 0.20, 0.20, 0.20),
    ('AS2059', 'Quang học kỹ thuật & ứ/dụng', 'Technical Optics and Applications', 4, 1, 0, 0.15, 0.25, 3, 0.20, 0.15, 0.25),
    ('AS2061', 'Dao động cơ sở', 'Basic Oscillations', 5, 1, 0, 0.20, 0.20, 3, 0.20, 0.15, 0.25),
    ('AS2063', 'Lập trình tính toán ckt', 'Computational Programming for Mech Eng', 6, 1, 0, 0.20, 0.25, 3, 0.15, 0.15, 0.25),
    ('AS3001', 'Động học robot', 'Robot Kinematics', 7, 1, 0, 0.15, 0.30, 3, 0.15, 0.10, 0.30),
    ('AS3003', 'Cơ học môi trường liên tục', 'Continuum Mechanics', 8, 1, 0, 0.15, 0.25, 3, 0.20, 0.10, 0.30),
    ('AS3011', 'Thực tập cơ kỹ thuật 2', 'Practical Mechanical Engineering 2', 9, 1, 1, 0.10, 0.10, 1, 0.20, 0.10, 0.50),
    ('AS3013', 'Tính toán kết cấu', 'Structural Computation', 10, 1, 0, 0.15, 0.25, 3, 0.20, 0.15, 0.25),
    ('AS3015', 'P/pháp phầntử hữuhạn ckt', 'Finite Element Methods in Mech Eng', 11, 1, 0, 0.20, 0.30, 3, 0.10, 0.10, 0.30),
    ('AS3017', 'Kỹ thuật thiết bị y học - tn', 'Medical Device Techniques - Lab', 12, 1, 0, 0.15, 0.25, 3, 0.15, 0.15, 0.30);
    
INSERT INTO `mon_hoc` (
    `ma_mon_hoc`,
    `ten_mon_hoc_VIE`,
    `ten_mon_hoc_ENG`,
    `ma_khoa`,
    `chuan_mon_hoc`,
    `co_lop_phu_thuoc`,
    `he_so_BT`,
    `he_so_BTL`,
    `tin_chi`,
    `he_so_TN`,
    `he_so_GK`,
    `he_so_CK`
)
values
    ('AS3019', 'Pt sl thực nghiệm cơ học', 'Experimental Mechanics', 13, 1, 0, 0.20, 0.20, 3, 0.20, 0.10, 0.30),
    ('AS3021', 'Động lực học hệ nhiều vật', 'Multibody Dynamics', 1, 1, 0, 0.15, 0.30, 3, 0.15, 0.10, 0.30),
    ('AS3023', 'Lý thuyết ổn định', 'Stability Theory', 2, 1, 0, 0.20, 0.25, 3, 0.15, 0.15, 0.25),
    ('AS3025', 'Quang học kỹ thuật & ứ/dụng', 'Technical Optics and Applications', 3, 1, 0, 0.10, 0.30, 3, 0.15, 0.15, 0.30),
    ('AS3027', 'Dao động kỹ thuật', 'Technical Vibrations', 4, 1, 0, 0.20, 0.20, 3, 0.20, 0.10, 0.30),
    ('AS3029', 'Lý thuyết dẻo kỹ thuật', 'Technical Plasticity Theory', 5, 1, 0, 0.15, 0.25, 3, 0.15, 0.10, 0.35),
	 ('AS3031', 'Đo lường các đại lượng pđ', 'Measurement of Physical Quantities', 6, 1, 0, 0.15, 0.20, 3, 0.15, 0.15, 0.35),
    ('AS3035', 'Tính toán động lực học lưu chất', 'Fluid Dynamics Calculations', 7, 1, 0, 0.20, 0.30, 3, 0.15, 0.10, 0.25),
    ('AS3083', 'Cơ học vật rắn biến dạng', 'Deformable Solid Mechanics', 1, 1, 0, 0.10, 0.20, 4, 0.10, 0.20, 0.40),
    ('AS3085', 'Lập trình tính toán ckt', 'Computational Programming for Mech Eng', 2, 1, 0, 0.15, 0.25, 3, 0.20, 0.10, 0.30),
    ('AS3087', 'Cơ sở vật lý y sinh', 'Fundamentals of Biophysics', 3, 1, 0, 0.10, 0.30, 3, 0.15, 0.15, 0.30),
    ('AS3089', 'Thực tập kỹ thuật (nt)', 'Technical Practice (Internship)', 4, 1, 1, 0.00, 0.10, 1, 0.30, 0.10, 0.50),
    ('AS3091', 'Phân tích số liệu tnnc', 'Research Data Analysis', 5, 1, 0, 0.15, 0.20, 3, 0.20, 0.15, 0.30),
    ('AS3093', 'Phương pháp phần tử hhưd', 'Advanced Finite Element Methods', 6, 1, 0, 0.15, 0.25, 3, 0.10, 0.20, 0.30),
    ('AS3097', 'Ứng xử cơ học của vật liệu', 'Mechanical Behavior of Materials', 7, 1, 0, 0.20, 0.30, 3, 0.15, 0.10, 0.25),
    ('AS3099', 'Các pm tt mp trong vật lý', 'Physics Simulation Tools', 8, 1, 0, 0.15, 0.20, 3, 0.15, 0.10, 0.40),
    ('AS3101', 'Lập trình tt hiệu năng cao', 'High-Performance Programming', 9, 1, 0, 0.10, 0.20, 3, 0.20, 0.10, 0.40),
    ('AS3103', 'Kỹ thuật thiết bị y học - tn', 'Medical Device Techniques - Lab', 10, 1, 0, 0.20, 0.25, 4, 0.10, 0.10, 0.35),
    ('AS3105', 'Cơ sở y khoa', 'Fundamentals of Medicine', 11, 1, 0, 0.15, 0.20, 4, 0.15, 0.10, 0.40),
    ('AS3107', 'Kỹ thuật lập trình (vltt)', 'Computational Programming in Physics', 12, 1, 0, 0.20, 0.20, 4, 0.10, 0.20, 0.30),
   ('AS3109', 'Cs vật lý tính toán & mpvl', 'Computational Physics and Materials Science', 13, 1, 0, 0.15, 0.20, 4, 0.10, 0.15, 0.40),
    ('AS3111', 'Cơ sở thiết kế kỹ thuật', 'Fundamentals of Engineering Design', 1, 1, 0, 0.20, 0.25, 3, 0.10, 0.10, 0.35),
    ('AS3113', 'Phân loại, kđ & ql ttb y tế', 'Classification, Calibration, and Management of Medical Equipment', 2, 1, 0, 0.15, 0.25, 3, 0.15, 0.15, 0.30),
    ('AS3115', 'Ứng dụng VXL trong KTYT', 'Application of Microcontrollers in Biomedical Engineering', 3, 1, 0, 0.20, 0.30, 3, 0.15, 0.10, 0.25),
    ('AS3117', 'Mạng máy tính & an ninh mạng', 'Computer Networks and Cybersecurity', 4, 1, 0, 0.15, 0.20, 3, 0.20, 0.10, 0.35),
    ('AS3119', 'Cơ học tính toán', 'Computational Mechanics', 5, 1, 0, 0.20, 0.30, 3, 0.15, 0.10, 0.25),
    ('AS3121', 'Y-sinh học tính toán', 'Computational Bioinformatics', 6, 1, 0, 0.10, 0.20, 3, 0.20, 0.10, 0.40),
    ('AS3123', 'Cơ học lượng tử nâng cao', 'Advanced Quantum Mechanics', 7, 1, 0, 0.15, 0.25, 3, 0.15, 0.10, 0.35),
    ('AS3125', 'Cơ sở mô hình hóa phân tử', 'Molecular Modeling Foundations', 8, 1, 0, 0.15, 0.25, 3, 0.20, 0.10, 0.30);
    
    
    
INSERT INTO `mon_hoc` (
    `ma_mon_hoc`,
    `ten_mon_hoc_VIE`,
    `ten_mon_hoc_ENG`,
    `ma_khoa`,
    `chuan_mon_hoc`,
    `co_lop_phu_thuoc`,
    `he_so_BT`,
    `he_so_BTL`,
    `tin_chi`,
    `he_so_TN`,
    `he_so_GK`,
    `he_so_CK`
)
values   
    ('AS3127', 'Công nghệ vật liệu điện tử', 'Electronic Materials Technology', 9, 1, 0, 0.20, 0.20, 3, 0.15, 0.15, 0.30),
    ('AS3129', 'Các pp tiệt trùng cho vật lý', 'Sterilization Methods in Physics', 10, 1, 0, 0.20, 0.25, 3, 0.15, 0.10, 0.30),
    ('AS3131', 'Cơ sở hóa học & vật liệu nano', 'Nano Chemistry and Materials Science', 11, 1, 0, 0.15, 0.20, 3, 0.20, 0.10, 0.35),
    ('007303', 'Luận văn tốt nghiệp', 'Graduation Thesis', 1, 1, 0, 0.20, 0.30, 10, 0.10, 0.20, 0.20),
    ('0X6603', 'Giải Tích 1', 'Calculus 1', 2, 1, 0, 0.10, 0.20, 4, 0.20, 0.10, 0.40),
    ('216303', 'Luận văn tốt nghiệp', 'Graduation Thesis', 1, 1, 0, 0.20, 0.30, 10, 0.10, 0.20, 0.20),
    ('AS1001', 'Nhập môn về kỹ thuật', 'Introduction to Engineering', 3, 1, 0, 0.10, 0.20, 3, 0.20, 0.15, 0.35),
    ('AS1003', 'Cơ lý thuyết', 'Theoretical Mechanics', 3, 1, 0, 0.15, 0.25, 3, 0.15, 0.10, 0.35),
    ('AS1005', 'Nhập môn về kỹ thuật (vlkt)', 'Intro to Engineering (Mech Eng)', 2, 1, 0, 0.20, 0.30, 3, 0.10, 0.10, 0.30),
    ('AS1007', 'Phương pháp số trong cơ kỹ thuật', 'Numerical Methods in Mech Eng', 3, 1, 0, 0.10, 0.20, 3, 0.20, 0.10, 0.40),
    ('CH5283', 'P/p số & mô phỏng tcntp', 'Numerical Methods & Simulation in Food Technology', 11, 1, 0, 0.15, 0.20, 3, 0.20, 0.15, 0.30),
    ('CH5285', 'Luật &quản trị anninh tp', 'Law & Food Safety Management', 2, 1, 0, 0.20, 0.25, 3, 0.15, 0.10, 0.30),
    ('CH5287', 'Truy xuất nguồn gốc tp', 'Food Traceability', 3, 1, 0, 0.15, 0.30, 3, 0.20, 0.10, 0.25);
    

INSERT INTO `mon_hoc` (
    `ma_mon_hoc`,
    `ten_mon_hoc_VIE`,
    `ten_mon_hoc_ENG`,
    `ma_khoa`,
    `chuan_mon_hoc`,
    `co_lop_phu_thuoc`,
    `he_so_BT`,
    `he_so_BTL`,
    `tin_chi`,
    `he_so_TN`,
    `he_so_GK`,
    `he_so_CK`
)
values   
		('CH5289', 'Những chế phẩm bs vào tp', 'Biological Additives in Food', 4, 1, 0, 0.20, 0.20, 3, 0.15, 0.10, 0.35),
		('CH5291', 'Những thành tựu về khtp', 'Advances in Food Science', 5, 1, 0, 0.10, 0.30, 3, 0.20, 0.10, 0.30),
		('CI1051', 'Hưhỏng sửachữa côngtrình', 'Structural Damage and Repair', 1, 1, 0, 0.15, 0.20, 3, 0.20, 0.15, 0.30),
		('CI1053', 'Quản lý dự án xây dựng', 'Construction Project Management', 1, 1, 0, 0.15, 0.25, 3, 0.15, 0.15, 0.30),
		('CI1055', 'T/kế kiếntrúc côngnghiệp', 'Industrial Architecture Design', 1, 1, 0, 0.10, 0.25, 6, 0.20, 0.10, 0.35),
		('CI1057', 'Thiết kế nhanh 3', 'Quick Design 3', 1, 1, 0, 0.15, 0.20, 1, 0.10, 0.20, 0.35),
		('CI1061', 'L/sử ktr phương Đông &VN', 'History of Eastern and Vietnamese Architecture', 2, 1, 0, 0.10, 0.20, 2, 0.20, 0.10, 0.40),
		('CI1063', 'Mỹ học', 'Aesthetics', 2, 1, 0, 0.10, 0.25, 2, 0.15, 0.20, 0.30),
		('CI1065', 'Nhập môn kiến trúc', 'Introduction to Architecture', 3, 1, 0, 0.15, 0.20, 3, 0.20, 0.10, 0.35),
		('CI1067', 'Vẽ kỹ thuật kiến trúc', 'Technical Drawing in Architecture', 3, 1, 0, 0.10, 0.25, 3, 0.20, 0.10, 0.35),
		('CI1069', 'Khoa học trái đất', 'Earth Sciences', 4, 1, 0, 0.15, 0.20, 4, 0.15, 0.10, 0.40),
		('CI1071', 'Họa hình và tạo hình', 'Descriptive Geometry and Modeling', 4, 1, 0, 0.20, 0.30, 3, 0.10, 0.10, 0.30);
        

INSERT INTO `mon_hoc` (`ma_mon_hoc`, `ten_mon_hoc_VIE`, `ten_mon_hoc_ENG`, `ma_khoa`, `chuan_mon_hoc`, `co_lop_phu_thuoc`, `he_so_BT`, `he_so_BTL`, 
`tin_chi`,`he_so_TN`,`he_so_GK`, `he_so_CK`) 
VALUES
	('CH1003', 'Hóa đại cương', 'General Chemistry', 4, 1, 1, 0.00, 0.25,3, 0.00, 0.25, 0.50),
	('CO1005', 'Nhập môn điện toán', 'Introduction to computing', 5, 1, 1, 0.00, 0.30,3, 0.10, 0.30, 0.30),
	('CO1023', 'Hệ thống số', 'Digital system', 5, 1, 1, 0.00, 0.00,3, 0.30, 0.20, 0.50),
	('CO1027', 'Kỹ thuật lập trình', 'Programming Fundamentals', 5, 1, 1, 0.00, 0.30,3, 0.30, 0.00, 0.40),
	('CO2003', 'Cấu trúc dữ liệu và Giải thuật', 'Data Structures and Algorithms', 5, 2, 1, 0.00, 0.30, 3,0.10, 0.10, 0.50),
	('CO2013', 'Hệ Cơ sở dữ liệu', 'Database Systems', 5, 2, 1, 0.20, 0.30,3, 0.00, 0.00, 0.50),
	('CO3005', 'Nguyên lý ngôn ngữ lập trình', 'Principles of programming languages', 5, 3, 0, 0.10, 0.20,2,0.00, 0.30, 0.40),
	('IM1025', 'Quản lý dự án cho kỹ sư', 'Project management for engineers', 9, 1, 0, 0.00, 0.30,3, 0.00, 0.20, 0.50),
	('LA1003', 'Anh văn 1', 'English 1', 12, 1, 0, 0.10, 0.20,2, 0.00, 0.20, 0.50),
	('MT1007', 'Đại số tuyến tính', 'Linear Algebra', 7, 1, 0, 0.10, 0.20,2, 0.00, 0.20, 0.50),
	('MT2013', 'Xác suất và thống kê', 'Probability and Statistics', 7, 2, 0, 0.00, 0.30,4, 0.00, 0.20, 0.50),
	('PH1003', 'Vật lý 1', 'Physics 1', 7, 1, 0, 0.10, 0.20,3, 0.00, 0.20, 0.50),
	('SP1007', 'Pháp luật Việt Nam đại cương', 'Introduction to Vietnamese Law', 7, 1, 0, 0.20, 0.30,3, 0.00, 0.00, 0.50),
	('SP1031', 'Triết học Mác - Lênin', 'Marxist - Leninist Philosophy', 7, 1, 0, 0.20, 0.30,4, 0.00, 0.00, 0.50),
	('SP1033', 'Kinh tế chính trị Mác - Lênin', 'Marxist - Leninist Political Economy', 7, 1, 0, 0.20, 0.30,2, 0.00, 0.00, 0.50),
	('SP1035', 'Chủ nghĩa xã hội khoa học', 'Scientific Socialism', 7, 1, 0, 0.20, 0.30,4, 0.00, 0.00, 0.50);


    
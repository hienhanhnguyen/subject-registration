SET FOREIGN_KEY_CHECKS = 0;
-- Truncate all tables
SELECT CONCAT('TRUNCATE TABLE `', table_name, '`;') AS truncate_statement
FROM information_schema.tables
WHERE table_schema = 'course_registration_system'
AND table_type = 'BASE TABLE';
SET FOREIGN_KEY_CHECKS = 1;
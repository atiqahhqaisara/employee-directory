CREATE DATABASE IF NOT EXISTS employee_directory;
USE employee_directory;

DROP TABLE IF EXISTS employees;

CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    empId VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    department VARCHAR(50) NOT NULL,
    position VARCHAR(50) NOT NULL,
    hireDate DATE NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    active BOOLEAN DEFAULT true
);

INSERT INTO employees
(empId, name, email, department, position, hireDate, salary, active)
VALUES
('EMP001', 'Ali Ahmad', 'ali@company.com', 'IT', 'Developer', '2022-01-15', 4500, true),
('EMP002', 'Siti Nur', 'siti@company.com', 'HR', 'HR Executive', '2021-03-20', 4000, true),
('EMP003', 'John Tan', 'john@company.com', 'Finance', 'Accountant', '2020-07-11', 5000, true),
('EMP004', 'Sarah Lee', 'sarah@company.com', 'Marketing', 'Marketing Officer', '2023-02-10', 3800, true),
('EMP005', 'David Lim', 'david@company.com', 'Operations', 'Supervisor', '2019-05-05', 5500, false),
('EMP006', 'Aina Yusuf', 'aina@company.com', 'IT', 'UI Designer', '2024-01-01', 4200, true),
('EMP007', 'Kumar Raj', 'kumar@company.com', 'Finance', 'Financial Analyst', '2022-09-01', 6000, true);
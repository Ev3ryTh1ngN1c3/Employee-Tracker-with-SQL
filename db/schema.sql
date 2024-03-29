DROP DATABASE IF EXISTS tracker_db;
CREATE DATABASE tracker_db;
USE tracker_db;
-- department table
CREATE TABLE department (
  id INT PRIMARY KEY, 
  name VARCHAR(30) 
);

-- role table
CREATE TABLE role (
  id INT PRIMARY KEY, 
  title VARCHAR(30), 
  salary DECIMAL, 
  department_id INT, 
  FOREIGN KEY (department_id) REFERENCES department(id) 
);

-- employee table
CREATE TABLE employee (
  id INT PRIMARY KEY, 
  first_name VARCHAR(30), 
  last_name VARCHAR(30), 
  role_id INT, 
  manager_id INT, 
  FOREIGN KEY (role_id) REFERENCES role(id), 
  FOREIGN KEY (manager_id) REFERENCES employee(id) 
);

CREATE TABLE departments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  department_name VARCHAR(30)
);
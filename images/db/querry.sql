-- Retrieve all departments
SELECT * FROM departments;

-- retrieve all roles
SELECT * FROM role;

-- retrieve all employees
SELECT * FROM employee;

-- retrieve employee from a specific role
SELECT * FROM employee WHERE role_id = 1;

-- ertrieve employees in a specific department
SELECT * FROM employee WHERE department_id = 2;\

-- update an employee's role
UPDATE employee SET role_id = 3 WHERE id = 1;

-- delete an employee
DELETE FROM employee WHERE id = 2;

-- delete department by department_id
DELETE FROM departments WHERE department_id = 1;

-- delete role by role_id
DELETE FROM role WHERE role_id = 2;
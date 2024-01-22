-- retrieve all departments
SELECT * FROM departments;

-- retrieve all roles
SELECT * FROM role;

-- retrieve all employees
SELECT * FROM employee;

-- retrieve employees from a specific role
SELECT * FROM employee WHERE role_id = 1;

-- retrieve employees in a specific department
SELECT * FROM employee WHERE department_id = 2;

-- update an employee's role
UPDATE employee SET role_id = 3 WHERE id = 1;

-- delete an employee
DELETE FROM employee WHERE id = 2;

-- delete department by department_id
DELETE FROM departments WHERE department_id = 1;

-- delete role by role_id
DELETE FROM role WHERE role_id = 2;

-- update employee managers
UPDATE employees SET manager_id = <new_manager_id> WHERE employee_id = <employee_id>;

-- view employees by manager
SELECT * FROM employees WHERE manager_id = <manager_id>;

-- view employees by department
SELECT * FROM employees WHERE department_id = <department_id>;

-- delete a department
DELETE FROM departments WHERE department_id = <department_id>;

-- delete a role
DELETE FROM roles WHERE role_id = <role_id>;

-- delete an employee
DELETE FROM employees WHERE employee_id = <employee_id>;

-- view the total utilized budget of a department
SELECT department_id, SUM(salary) AS total_budget FROM employees GROUP BY department_id;
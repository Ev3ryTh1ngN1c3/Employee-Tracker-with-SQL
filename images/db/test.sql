-- test retrieving all departments
SELECT * FROM department;

-- test retrieving all roles
SELECT * FROM role;

-- test retrieving all employees
SELECT * FROM employee;

-- test retrieving employees from a specific role
SELECT * FROM employee WHERE role_id = 1;

-- test retrieving employees in a specific department
SELECT * FROM employee WHERE department_id = 2;

-- test updating an employee's role
UPDATE employee SET role_id = 3 WHERE id = 1;

-- test deleting an employee
DELETE FROM employee WHERE id = 2;

-- test deleting a department by department_id
DELETE FROM department WHERE id = 1;

-- test deleting a role by role_id
DELETE FROM role WHERE id = 2;

-- test updating employee managers
UPDATE employee SET manager_id = 1 WHERE id = 1;
UPDATE employee SET manager_id = 1 WHERE id = 2;

-- test viewing employees by manager
SELECT * FROM employee WHERE manager_id = 1;

-- test viewing employees by department
SELECT * FROM employee WHERE department_id = 2;

-- test deleting a department
DELETE FROM department WHERE id = 1;

-- test deleting a role
DELETE FROM role WHERE id = 2;

-- test deleting an employee
DELETE FROM employee WHERE id = 2;

-- test viewing the total utilized budget of a department
SELECT department_id, SUM(salary) AS total_budget FROM employee GROUP BY department_id;
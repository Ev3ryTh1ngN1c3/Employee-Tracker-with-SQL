const inquirer = require("inquirer");
const mysql = require("mysql2");
const questions = require("./assets/js/questions");

// MySQL connection
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "ch0sen",
    database: "employeeTracker_db",
});

// start application
init();

async function init() {
    const { action } = await inquirer.prompt(questions);
    switch (action) {
        case "edit department":
            editDepartments();
            break;
        case "edit employee role":
            editRole();
            break;
        case "edit employee":
            editEmployee();
            break;
        case "view information":
            viewInfo();
            break;
        case "exit":
            process.exit(0);
            break;
        default:
            break;
    }
}
const inquirer = require("inquirer");
const mysql = require("mysql2");
const questions = require("./assets/js/questions");

// create a MySQL connection
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "ch0sen",
    database: "employeeTracker_db",
});

// start application
start();

async function start() {
    const { action } = await inquirer.prompt({
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
            "View all departments",
            "View all roles",
            "View all employees",
            "Add a department",
            "Add a role",
            "Add an employee",
            "Add a Manager",
            "Update an employee role",
            "View Employees by Manager",
            "View Employees by Department",
            "Delete Departments | Roles | Employees",
            "View the total utilized budget of a department",
            "Exit",
        ],
    });

    switch (action) {
        case "view all departments":
            // code for viewing all departments
            break;
        case "view all roles":
            // code for viewing all roles
            break;
        case "view all employees":
            // code for viewing all employees
            break;
        case "add a department":
            // code for adding a department
            break;
        case "add a role":
            // code for adding a role
            break;
        case "add an employee":
            // code for adding an employee
            break;
        case "Add a Manager":
            // code for adding a manager
            break;
        case "update an employee role":
            // code for updating an employee role
            break;
        case "view Employees by Manager":
            // code for viewing employees by manager
            break;
        case "view Employees by Department":
            // code for viewing employees by department
            break;
        case "delete Departments | roles | employees":
            // code for deleting departments, roles, or employees
            break;
        case "view the total utilized budget of a department":
            // code for viewing the total utilized budget of a department
            break;
        case "exit":
            process.exit(0);
            break;
        default:
            break;
    }
}
// edit department functions
async function editDepartments() {
    const { department } = await inquirer.prompt({
        name: "department",
        type: "list",
        message: "Choose one of the following:",
        choices: [
            "Add Department",
            "Remove Department",
            "Exit"
        ]
    });

    if (department === "Add Department") {
        addDepartment();
    }
    if (department === "Remove Department") {
        remDepartment();
    }
    if (department === "Exit") {
        init();
    }
}

// view all departments
function viewAllDepartments() {
    const query = "SELECT * FROM departments";
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        // restart the application
        start();
    });
}

// add a department
async function addDepartment() {
    const departmentName = await inquirer.prompt({
        name: "name",
        type: "input",
        message: "enter the name of the new department:",
    });

    const query = `INSERT INTO departments (department_name) VALUES ("${departmentName.name}")`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log(`added department ${departmentName.name} to the database!`);
        // restart the application
        start();
    });
}
function addRole() {
    const query = "SELECT * FROM departments";
    connection.query(query, (err, res) => {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    type: "input",
                    name: "title",
                    message: "title of the new role:",
                },
                {
                    type: "input",
                    name: "salary",
                    message: "salary of the new role:",
                },
                {
                    type: "list",
                    name: "department",
                    message: "department for the new role:",
                    choices: res.map((department) => department.department_name),
                },
            ])
            .then((answers) => {
                const department = res.find(
                    (department) => department.name === answers.department
                );
                const query = "INSERT INTO roles SET ?";
                connection.query(
                    query,
                    {
                        title: answers.title,
                        salary: answers.salary,
                        department_id: department,
                    },
                    (err, res) => {
                        if (err) throw err;
                        console.log(
                            `added role ${answers.title} with salary ${answers.salary} to the ${answers.department} department in the database!`
                        );
                        start();
                    }
                );
            });
    });
}

async function addRole() {
    const departments = await connection.query(
        "SELECT dept, id FROM department"
    );
    console.log(departments);
    const { dept, title, salary } = await inquirer.prompt([
        {
            name: "dept",
            type: "list",
            message: "department this role be associated with",
            choices: departments.map((row) => ({
                name: row.dept,
                value: row.id,
            })),
        },
        {
            name: "title",
            type: "input",
            message: "role being created",
        },
        {
            name: "salary",
            type: "number",
            message: "salary for this role",
        },
    ]);
    connection.query(
        `INSERT INTO role (title, salary, dept_id) VALUES ('${title}', ${salary}, ${dept})`,
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " Role Added\n");
            init();
        }
    );
}
// edit role
async function updateRole() {
    const employees = await connection.query(
        "SELECT first_name AS firstName, last_name AS lastName, id FROM employee"
    );
    const roles = await connection.query("SELECT id, title, salary FROM role");
    const { employee, role } = await inquirer.prompt([
        {
            name: "employee",
            type: "list",
            message: "Select an employee to update:",
            choices: employees.map((employee) => ({
                name: employee.firstName + " " + employee.lastName,
                value: employee.id,
            })),
        },
        {
            name: "role",
            type: "list",
            message: "Select the new role:",
            choices: roles.map((row) => ({ name: row.title, value: row.id })),
        },
    ]);
    connection.query(
        `UPDATE employee SET role_id = ${role} WHERE  id = ${employee}`,
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " Role Added\n");
            init();
        }
    );
}

// update employee role
function updateEmployeeRole() {
    const queryEmployees =
        "SELECT employee.id, employee.first_name, employee.last_name, roles.title FROM employee LEFT JOIN roles ON employee.role_id = roles.id";
    const queryRoles = "SELECT * FROM roles";
    connection.query(queryEmployees, (err, resEmployees) => {
        if (err) throw err;
        connection.query(queryRoles, (err, resRoles) => {
            if (err) throw err;
            inquirer
                .prompt([
                    {
                        type: "list",
                        name: "employee",
                        message: "Select the employee to update:",
                        choices: resEmployees.map(
                            (employee) =>
                                `${employee.first_name} ${employee.last_name}`
                        ),
                    },
                    {
                        type: "list",
                        name: "role",
                        message: "Select the new role:",
                        choices: resRoles.map((role) => role.title),
                    },
                ])
                .then((answers) => {
                    const employee = resEmployees.find(
                        (employee) =>
                            `${employee.first_name} ${employee.last_name}` ===
                            answers.employee
                    );
                    const role = resRoles.find(
                        (role) => role.title === answers.role
                    );
                    const query =
                        "UPDATE employee SET role_id = ? WHERE id = ?";
                    connection.query(
                        query,
                        [role.id, employee.id],
                        (err, res) => {
                            if (err) throw err;
                            console.log(
                                `Updated ${employee.first_name} ${employee.last_name}'s role to ${role.title} in the database!`
                            );
                            start();
                        }
                    );
                });
        });
    });
}

// eployees by department
function viewEmployeesByDepartment() {
    const query =
        "SELECT departments.department_name, employee.first_name, employee.last_name FROM employee INNER JOIN roles ON employee.role_id = roles.id INNER JOIN departments ON roles.department_id = departments.id ORDER BY departments.department_name ASC";
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log("\nEmployees by department:");
        console.table(res);
        start();
    });
}

// DELETE department, role or employee
function deleteDepartmentsRolesEmployees() {
    inquirer
        .prompt({
            type: "list",
            name: "data",
            message: "select which to delete",
            choices: ["employee", "role", "department"],
        })
        .then((answer) => {
            switch (answer.data) {
                case "employee":
                    deleteEmployee();
                    break;
                case "role":
                    deleteRole();
                    break;
                case "department":
                    deleteDepartment();
                    break;
                default:
                    console.log(`Invalid data: ${answer.data}`);
                    start();
                    break;
            }
        });
}

// remove employee 
async function removeEmployee() {
    connection.query(
        "SELECT first_name AS firstName, last_name AS lastName FROM employee",
        async function (err, employees) {
            const data = await inquirer.prompt([
                {
                    name: "employees",
                    message: "select employee to remove?",
                    type: "list",
                    choices: employees.map((employee) => ({
                        name: employee.firstName + " " + employee.lastName,
                    })),
                },
            ]);
            console.log(data);
            const firstAndLast = data.employees.split(" ");
            console.log(firstAndLast[1]);
            connection.query(
                "DELETE employee WHERE first_name = ? AND last_name = ?",
                [firstAndLast[0], firstAndLast[1]]
            );
            init();
        }
    );
}

// view total budget of a department
function viewTotalUtilizedBudgetOfDepartment() {
    const query = "SELECT * FROM departments";
    connection.query(query, (err, res) => {
        if (err) throw err;
        const departmentChoices = res.map((department) => ({
            name: department.department_name,
            value: department.id,
        }));

        // prompt the user to select a department
        inquirer
            .prompt({
                type: "list",
                name: "departmentId",
                message: "Which department do you want to calculate the total salary for?",
                choices: departmentChoices,
            })
            .then((answer) => {
                // calculate the total salary for the selected department
                const query = `
                    SELECT
                        departments.department_name AS department,
                        SUM(roles.salary) AS total_salary
                    FROM
                        departments
                        INNER JOIN roles ON departments.id = roles.department_id
                        INNER JOIN employee ON roles.id = employee.role_id
                    WHERE
                        departments.id = ?
                    GROUP BY
                        departments.id;
                `;
                connection.query(query, [answer.departmentId], (err, res) => {
                    if (err) throw err;
                    const totalSalary = res[0].total_salary;
                    console.log(`The total salary for employees in this department is $${totalSalary}`);
                    // restart the application
                    start();
                });
            });
    });
}
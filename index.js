const inquirer = require("inquirer");
const mysql = require("mysql2");
// const questions = require("./assets/js/questions");

// MySQL connection
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "ch0sen",
    database: "tracker_db",
});

// connect to the MySQL server
connection.connect((err) => {
    if (err) {
        console.error('error connecting to the database: ', err);
        return;
    }
    console.log('connected to the database');
});

const start = () => {
    inquirer.prompt({
        type: "list",
        name: "action",
        message: "choose from the following",
        choices: [
            "view departments",
            "view roles",
            "view employees",
            "add a department",
            "add a role",
            "add an employee",
            "add a manager",
            "update an employee role",
            "view employees by manager",
            "view employees by department",
            "delete departments | roles | employees",
            "view the total utilized budget of a department",
            "exit",
        ],
    }).then(selection => {
        switch (selection.action) {
            case "view departments":
                viewAllDepartments();
                break;
            case "view roles":
                viewAllRoles();
                break;
            case "view employees":
                viewAllEmployees();
                break;
            case "add a department":
                addDepartment();
                break;
            case "add a role":
                addRole();
                break;
            case "add an employee":
                addEmployee();
                break;
            case "add a manager":
                addManager();
                break;
            case "update an employee role":
                updateEmployeeRole();
                break;
            case "view employees by manager":
                viewEmployeesByManager();
                break;
            case "view employees by department":
                viewEmployeesByDepartment();
                break;
            case "delete departments | roles | employees":
                deleteData();
                break;
            case "view the total utilized budget of a department":
                viewBudget();
                break;
            case "exit":
                process.exit(0);
                break;
            default:
                break;
        }
    })
}


// edit department functions
async function editDepartments() {
    const { department } = await inquirer.prompt({
        name: "department",
        type: "list",
        message: "choose one of the following:",
        choices: [
            "add department",
            "remove department",
            "exit"
        ]
    });

    if (department === "add department") {
        addDepartment();
    }
    if (department === "remove department") {
        remDepartment();
    }
    if (department === "exit") {
        init();
    }
}

// view all departments
function viewAllDepartments() {
    const query = "SELECT * FROM department";
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

    const query = `INSERT INTO department (department_name) VALUES ("${departmentName.name}")`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log(`added department ${departmentName.name} to the database!`);
        // restart the application
        start();
    });
}
// view employees
function viewAllEmployees() {
    const query = "SELECT * FROM employee";
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        // restart the application
        start();
    });
}



function addRole() {
    const query = "SELECT * FROM department";
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
                const query = "INSERT INTO role SET ?";
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

// const connection = require('./connection');

const viewAllRoles = () => {
    const sql = `
    SELECT role.id, role.title, role.salary, department.name AS department
    FROM role
    INNER JOIN department ON role.department_id = department.id
  `;

    connection.query(sql, (err, rows) => {
        if (err) throw err;

        console.table(rows);
        start();
    });
};

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
            message: "choose employee to update:",
            choices: employees.map((employee) => ({
                name: employee.firstName + " " + employee.lastName,
                value: employee.id,
            })),
        },
        {
            name: "role",
            type: "list",
            message: "choose new role:",
            choices: roles.map((row) => ({ name: row.title, value: row.id })),
        },
    ]);
    connection.query(
        `UPDATE employee SET role_id = ${role} WHERE  id = ${employee}`,
        function (err, res) {
          if (err) throw err;
          console.log(res.affectedRows + " Role Added\n");
        }
      );
    }
// update employee role
function updateEmployeeRole() {
    const queryEmployees =
        "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role ON employee.role_id = role.id";
    const queryRoles = "SELECT * FROM role";
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

// employees by department
function viewEmployeesByDepartment() {
    const query =
        "SELECT department.department_name, employee.first_name, employee.last_name FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id ORDER BY department.department_name ASC";
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
    const query = "SELECT * FROM department";
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
                message: "choose department to calculate the budget?",
                choices: departmentChoices,
            })
            .then((answer) => {
                // calculate the total salary for the selected department
                const query = `
                    SELECT
                        department.department_name AS department,
                        SUM(roles.salary) AS total_salary
                    FROM
                        department
                        INNER JOIN role ON department.id = role.department_id
                        INNER JOIN employee ON role.id = employee.role_id
                    WHERE
                        department.id = ?
                    GROUP BY
                        department.id;
                `;
                connection.query(query, [answer.departmentId], (err, res) => {
                    if (err) throw err;
                    const totalSalary = res[0].total_salary;
                    console.log(`total salary for employees in this department $${totalSalary}`);
                    // restart the application
                    start();
                });
            });
    });
}
start();
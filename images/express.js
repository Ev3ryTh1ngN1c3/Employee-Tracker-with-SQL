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



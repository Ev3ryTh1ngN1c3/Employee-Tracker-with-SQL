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
        case "edit Department":
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




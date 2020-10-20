const Manager = require("./assets/lib/Manager");
const Engineer = require("./assets/lib/Engineer");
const Intern = require("./assets/lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./assets/lib/htmlRenderer");

const team = [];
const idIndex = [];

function managerInfo() {
    inquirer
        .prompt
        ([
            {
                type: "input",
                name: "name",
                message: "What is the manager's name?",
                validate: input => {
                    // console.log(input.match(/\d/g));
                    if (input !== "" && input.match(/\d/g) === null) {
                        return true;
                    }
                    return "Please enter a valid name."
                }
            },
            {
                type: "input",
                name: "id",
                message: "What is the manager's ID?",
                validate: input => {
                    // console.log(input.match(/^\d+$/));
                    if (input !== "" && input.match(/^\d+$/) !== null) {
                        return true;
                    }
                    return "Please enter a valid ID number."
                }
            },
            {
                type: "input",
                name: "email",
                message: "What is the manager's email address?",
                validate: input => {
                    // console.log(input.match(/^\S+@\S+\.\S+$/));
                    if (input !== "" && input.match(/^\S+@\S+\.\S+$/) !== null) {
                        return true;
                    }
                    return "Please enter a valid email address."
                }
            },
            {
                type: "input",
                name: "officeNumber",
                message: "What is the manager's office number?",
                validate: input => {
                    // console.log(input.match(/^\d+$/));
                    if (input !== "" && input.match(/^\d+$/) !== null) {
                        return true;
                    }
                    return "Please enter a valid office number."
                },
            }
        ])
        .then(function (data) {
            const manager = new Manager(data.name, data.id, data.email, data.officeNumber);
            team.push(manager);
            idIndex.push(data.id)
            teamBuilder();
        });

}

function teamBuilder() {
    inquirer
        .prompt
        ([
            {
                type: "list",
                name: "employee",
                message: "What employee do you want to add to the team?",
                choices: [
                    "Engineer",
                    "Intern",
                    "I am done adding to the team"
                ]
            }
        ])
        .then(function (data) {
            if (data.employee === "Engineer") {
                engineerInfo();
            } else if (data.employee === "Intern") {
                internInfo();
            } else {
                if (!fs.existsSync(OUTPUT_DIR)) {
                    fs.mkdirSync(OUTPUT_DIR);
                }
                fs.writeFileSync(outputPath, render(team), "utf-8")
                console.log(team);
            }
        });

}

function engineerInfo() {
    inquirer
        .prompt
        ([
            {
                type: "input",
                name: "name",
                message: "What is the engineer's name?",
                validate: input => {
                    // console.log(input.match(/\d/g));
                    if (input !== "" && input.match(/\d/g) === null) {
                        return true;
                    }
                    return "Please enter a valid name."
                }
            },
            {
                type: "input",
                name: "id",
                message: "What is the engineer's ID?",
                validate: input => {
                    // console.log(input.match(/^\d+$/));
                    // console.log(idIndex.includes(input));
                    if (input !== "" && input.match(/^\d+$/) !== null && idIndex.includes(input) !== true) {
                        return true;
                    }
                    return "Please enter a valid ID number OR an ID number that hasn't been taken by another employee."
                }
            },
            {
                type: "input",
                name: "email",
                message: "What is the engineer's email address?",
                validate: input => {
                    // console.log(input.match(/^\S+@\S+\.\S+$/));
                    if (input !== "" && input.match(/^\S+@\S+\.\S+$/) !== null) {
                        return true;
                    }
                    return "Please enter a valid email address."
                }
            },
            {
                type: "input",
                name: "github",
                message: "What is the engineer's GitHub username?",
                validate: input => {
                    console.log(input);
                    console.log(typeof (input));
                    if (input !== "") {
                        return true;
                    }
                    return "Please enter a valid GitHub username."
                },
            }
        ])
        .then(function (data) {
            const engineer = new Engineer(data.name, data.id, data.email, data.github);
            team.push(engineer);
            idIndex.push(data.id)
            teamBuilder();
        });
}

function internInfo() {
    inquirer
        .prompt
        ([
            {
                type: "input",
                name: "name",
                message: "What is the intern's name?",
                validate: input => {
                    // console.log(input.match(/\d/g));
                    if (input !== "" && input.match(/\d/g) === null) {
                        return true;
                    }
                    return "Please enter a valid name."
                }
            },
            {
                type: "input",
                name: "id",
                message: "What is the intern's ID?",
                validate: input => {
                    // console.log(input.match(/^\d+$/));
                    // console.log(idIndex.includes(input));
                    if (input !== "" && input.match(/^\d+$/) !== null && idIndex.includes(input) !== true) {
                        return true;
                    }
                    return "Please enter a valid ID number OR an ID number that hasn't been taken by another employee."
                }
            },
            {
                type: "input",
                name: "email",
                message: "What is the intern's email address?",
                validate: input => {
                    // console.log(input.match(/^\S+@\S+\.\S+$/));
                    if (input !== "" && input.match(/^\S+@\S+\.\S+$/) !== null) {
                        return true;
                    }
                    return "Please enter a valid email address."
                }
            },
            {
                type: "input",
                name: "school",
                message: "What school is the intern attending?",
                validate: input => {
                    if (input !== "") {
                        return true;
                    }
                    return "Please enter a valid school name."
                },
            }
        ])
        .then(function (data) {
            const intern = new Intern(data.name, data.id, data.email, data.school);
            team.push(intern);
            idIndex.push(data.id)
            teamBuilder();
        });
}

managerInfo();
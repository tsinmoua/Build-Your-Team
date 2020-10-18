// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee.js");

function Engineer (name, id, email, github) {
    Employee.call(name, id, email, this);

    this.github = github
}

Engineer.prototype.getGithub = function() {
    return this.github
};

Engineer.prototype.getRole = () => {
    return "Engineer"
};

module.exports = Engineer;

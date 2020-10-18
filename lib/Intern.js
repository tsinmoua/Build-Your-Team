// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee.js");

function Intern (name, id, email, school) {
    Employee.call(name, id, email, this);

    this.school = school
}

Intern.prototype.getSchool = function() {
    return this.school
};

Intern.prototype.getRole = () => {
    return "Intern"
};

module.exports = Intern;

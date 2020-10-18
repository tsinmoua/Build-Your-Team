// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee.js");

function Manager (name, id, email, officeNumber) {
    Employee.call(name, id, email, this);

    this.officeNumber = officeNumber
}

Manager.prototype.getOfficeNumber = function() {
    return this.officeNumber
};

Manager.prototype.getRole = () => {
    return "Manager"
};

module.exports = Manager;

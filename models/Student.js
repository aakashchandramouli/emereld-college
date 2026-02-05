const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    city: String,
    loginID: String,
    password: String
}, { timestamps: true });

module.exports = mongoose.model("Student", studentSchema);




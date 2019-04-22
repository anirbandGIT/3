const mongoose = require('mongoose');
const MySchema = mongoose.Schema;

//CREATE MySchema SCHEMA AND MODEL
const UserSchema = new MySchema({
    firstName: {
        type: String,
        // match: /^[A-Z]{1}[a-z]{9}$/,
        required: true
    },
    lastName: {
        type: String,
        // match: /^[A-Z]{1}[a-z]{9}$/,
        required: true
    },
    email: {
        type: String,
        match: /[a-z@._]/,
        required: true
    },
    mobileNumber: {
        type: Number,
        match: /[0-9]{10}/,
        required: true
    },
    DOB: {
        type: Date,
        required: true
    },
    password: {
        type: String,
        match: /[a-zA-Z0-9_]{8,12}/,
        required: true
    },
    confirmPassword: {
        type: String,
        match: /[a-zA-Z0-9_]{8,12}/,
        required: true
    }
});

const user = mongoose.model('USERS', UserSchema);
module.exports = user;
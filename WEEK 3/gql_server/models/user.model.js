var mongoose = require('mongoose');

const mySchema = mongoose.Schema;

// Created the User Schema.
const UserSchema = new mySchema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User', UserSchema);
module.exports = user;
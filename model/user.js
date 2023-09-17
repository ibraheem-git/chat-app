const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    password: String,
    email: String,
    username: String
 });

module.exports = mongoose.model('User', userSchema)
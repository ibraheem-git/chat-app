const mongoose = require('mongoose');

const msgSchema = mongoose.Schema({
    text: String
 }, { timestamps: true });

module.exports = mongoose.model('Message', msgSchema)
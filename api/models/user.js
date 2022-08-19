const mongoose = require('mongoose');

const user = mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    role :{ type: String, required: true }

});

module.exports = mongoose.model('admin', user);
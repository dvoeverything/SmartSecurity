const mongoose = require('mongoose');

const SecurityCompany = mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    role:{type:String, required:true}

});

module.exports = mongoose.model('Security Company Users', SecurityCompany);
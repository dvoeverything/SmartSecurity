const mongoose = require('mongoose');

const guard = mongoose.Schema({
    guardName: { type: String, required: true },
    Identity: { type: String, required: true },
    phone: { type: String, required: true },
    fid: { type: String, required: true },

});

module.exports = mongoose.model('securityGuards', guard);
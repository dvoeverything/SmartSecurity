const express = require('express');
const user = require('../models/user');
const router = express.Router();
const seComp = require('../models/securityCompany');
const superAdmin = require('../models/SuperAdmin');
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/registration', (req, res) => {
    const { username, email, phone, password, role } = req.body;
    console.log('hererer')
    console.log(role)
    user.findOne({ email: email })
    .exec()
    .then(usr => {
        if (usr) {
            console.log('already exists')
            res.status(403).json({ message: "already registered" })
        } else {
            console.log('sjkhskjsjs')
            bcrypt.hash(req.body.password, saltRounds).then(function(hash) {
                const User = new superAdmin({
                    username: username,
                    email: email,
                    phone: phone,
                    password: hash,
                    role : role
        
                })
                User.save()
                    .then(result => {
                        console.log(result)
                        res.status(200).json({ message: "done" })
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(500).json({ message: "Server error" })
                    })
            }); 
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: "server error" })
    })
     
});

module.exports = router; 
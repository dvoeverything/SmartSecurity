const express = require('express');
const router = express.Router();
const guard = require('../models/guard');

router.post('/registration', (req, res) => {

    console.log("jssjhsj")
    const { user, natIdNum, phoneNum } = req.body
    guard.findOne({ Identity: natIdNum })
        .exec()
        .then(grd => {
            if (grd) {
                res.status(403).json({ message: "already registered" })
            } else {
                const Guard = new guard({
                    guardName: user,
                    Identity: natIdNum,
                    phone: phoneNum,
                    fid: "1"
                })

                Guard.save()
                    .then(result => {
                        console.log(result)
                        res.status(200).json({ message: "done" })
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(500).json({ message: "server error" })
                    })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "server error" })
        })
});



module.exports = router;
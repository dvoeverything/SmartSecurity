const express = require('express');
const router = express.Router();
require('dotenv').config()
const loginController = require('../controllers/loginController');


router.post('/',loginController.login)


module.exports = router;
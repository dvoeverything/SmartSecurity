const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();

mongoose.connect('mongodb://0.0.0.0:27017/SmartSecurity')
    .then(() => console.log("Database connected!"))
    .catch(err => console.log(err));;





const alarmRoutes = require('./routes/alarm')
const patrolRoutes = require('./routes/patrol')
const configRoutes = require('./routes/config')
const userRoutes = require('./routes/admin')
const loginRoutes = require('./routes/login')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


console.log('cookie parser')
app.use(cookieParser());

app.use(morgan('dev'));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

console.log('routing to user');
app.use('/alarm', alarmRoutes);
app.use('/patrol', patrolRoutes);
app.use('/config', configRoutes);
app.use('/user', userRoutes);
app.use('/login', loginRoutes);

app.use((req, res, next) => {
    console.log('here')
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        errror: {
            message: error.message
        }
    })
})

module.exports = app;
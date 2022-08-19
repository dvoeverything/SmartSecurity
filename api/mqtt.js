
var mqtt = require('mqtt');
const securityguards = require('./models/guard')
const mongoose = require('mongoose');
const guard = require('./models/guard');
mongoose.connect('mongodb://0.0.0.0:27017/SmartSecurity')
    .then(() => console.log("Database connected on child process!"))
    .catch(err => console.log(err));;

var options = {
    host: 'hostname',
    port: 8883,
    protocol: 'mqtts',
    username: 'username',
    password: 'password'
}

//initialize the MQTT client
var client = mqtt.connect(options);

//setup the callbacks
client.on('connect', function () {
    console.log('Connected');
});

client.on('error', function (error) {
    console.log(error);
});

client.on('message', function (topic, message) {
    //Called each time a message is received
    if (topic == 'patrol/PatrolConfig/sendFP') {
        console.log(message.toString());
        var messageObj = JSON.parse(message);
        console.log(messageObj);
        securityguards.findOne({ Identity: messageObj.guardId })
            .exec()
            .then((result) => {
                if (result) {
                    console.log("security guard is" + result);
                    console.log(messageObj.fid);
                    result.fid = messageObj.fid;
                    result.save()
                        .then(res => {
                            console.log("done, send flag to app now");
                            client.publish('patrol/PatrolConfig/registration', 'done');
                        })
                } else {
                    console.log("couldn't get the security guard");
                    client.publish('patrol/PatrolConfig/registration', 'Wrong National Id');
                }

            })
            .catch(err => {
                console.log("error is" + err);
                client.publish('patrol/PatrolConfig/registration', 'server error');
            })
    } else if (topic == 'patrol/patrolInfo') {
        console.log(message.toString());
    } else if (topic == 'alarm/AlarmInfo/zones') {
        console.log(message.toString());
    }
    else {
        console.log("topic not defined")
    }
});

// subscribe to topic 
client.subscribe('patrol/PatrolConfig/sendFP');
client.subscribe('patrol/patrolInfo');
client.subscribe('alarm/zones');





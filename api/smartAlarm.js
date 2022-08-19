const mqtt = require('mqtt')
const client = new mqtt.connect('mqtts://b40a03ae72f147f5b6a28c9e14cc8b68.s2.eu.hivemq.cloud', { rejectUnauthorized: true, username: 'R_ussia', password: 'muchengeti2011', connectTimeout: 5000 });
console.log("connected flag  " + client.connected);
client.on("connect", function () {
    console.log("connected  " + client.connected);
})
var topic_list = ["alarm/zones/zone1", "alarm/zones/zone2", "alarm/zones/zone3", "alarm/zones/alarm", "patrol/alarm"]
client.subscribe(topic_list, { qos: 1 });
client.on('message', function (topic, message, packet) {
    console.log("message is " + message);
    console.log("topic is " + topic);
});
var topic = "alarm/state"
var topic1 = "patrol/selectMenu"
client.on('connect', () => {
    client.publish(topic, 'armed', { qos: 1, retain: false }, (error) => {
        if (error) {
            console.error(error)
        }
    })
})
client.on('connect', () => {
    client.publish(topic1, '1', { qos: 1, retain: false }, (error) => {
        if (error) {
            console.error(error)
        }
    })
})
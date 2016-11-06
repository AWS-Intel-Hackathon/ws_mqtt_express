// var five = require("johnny-five");
// var Edison = require("edison-io");


var app = require('express')();

var server = app.listen(3000);
var io = require('socket.io')(server);


var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://ec2-35-161-110-220.us-west-2.compute.amazonaws.com');

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

// var board = new five.Board({
//     io: new Edison()
// });


client.on('connect', function() {
    client.subscribe('/#');
    client.publish('/test', 'edison online');

});

client.on('message', function(topic, message) {
    // message is Buffer 
    console.log(message.toString());
    io.sockets.emit('data', message.toString());
});

io.on('connection', function(socket) {
    socket.on('message', function(msg) {
        console.log(msg);
        client.publish('/test', 'data from page');
    });
});




// board.on("ready", function() {
//     var led = new five.Led(9);

//     client.on('message', function(topic, message) {
//         // message is Buffer 
//         console.log(message.toString());
//         io.sockets.emit('data',data);
//         if(message.toString() === "ledon"){
//          led.on();
//         }else if(message.toString() === "ledoff"){
//          led.off();
//         }else if(message.toString() === "ledfadein"){
//          led.fadeIn(500);
//         }else if(message.toString() === "ledfadeout"){
//          led.fadeOut(500);
//         }

//     });

// });

// client.publish('presence', 'Hello mqtt');

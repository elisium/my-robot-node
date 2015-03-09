var express = require('express');
var app = express();
var IO = require('onoff').Gpio;
var usonic = require('r-pi-usonic');
var sensor = usonic.createSensor(19, 13, 1000);
var http = require('http').createServer(app);
var io = require('socket.io').listen(http);
var fs = require('fs');
var path = require('path');
var spawn = require('child_process').spawn;
var proc;

setInterval(function() {
    //console.log('Distance: ' + sensor().toFixed(2) + ' cm');
}, 500);

var s1 = new IO(16, 'out'); // speed
var s2 = new IO(20, 'out');
var m1 = new IO(26, 'out'); // direction
var m2 = new IO(21, 'out');

var robot = {
  stop: function() {
    s1.writeSync(0);
    s2.writeSync(0);
    m1.writeSync(0);
    m2.writeSync(0);
  },
  back: function() {
    s1.writeSync(1);
    s2.writeSync(1);
    m1.writeSync(1);
    m2.writeSync(1);
  },
  forward: function() {
    s1.writeSync(1);
    s2.writeSync(1);
    m1.writeSync(0);
    m2.writeSync(0);
  },
  right: function() {
    s1.writeSync(1);
    s2.writeSync(1);
    m1.writeSync(1);
    m2.writeSync(0);
  },
  left: function() {
    s1.writeSync(1);
    s2.writeSync(1);
    m1.writeSync(0);
    m2.writeSync(1);
  },
  distance: function() {
    return sensor().toFixed(0)
  }
}

app.use(express.static('public'));
app.use(express.static('bower_components'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html')
})

app.get('/command/:command', function (req, res) {
  result = null
 try {
  result = robot[req.params.command]();
 }
 catch (err) {
  console.log(err.toString());
 }
 res.send('{"result":' + result + '}'); 
})

function stopStreaming() {
  if (Object.keys(sockets).length == 0) {
    app.set('watchingFile', false);
    if (proc) proc.kill();
    fs.unwatchFile('./public/stream.jpg');
  }
}

/*fs.watchFile('./public/stream.jpg', function(current, previous) {
  io.sockets.emit('stream', 'stream.jpg?_t=' + (Math.random() * 100000));
})*/
setInterval (function () {io.sockets.emit('stream', 'stream.jpg?_t=' + (Math.random() * 100000));}, 500);

var server = http.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Robot listening at http://%s:%s', host, port)

})

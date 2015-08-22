var express = require('express');
var app = express();
var IO = require('onoff').Gpio;
var http = require('http').createServer(app);
var io = require('socket.io').listen(http);
var fs = require('fs');
var path = require('path');
var usonic = require('r-pi-usonic');
var sensor = usonic.createSensor(24, 23);
var proc;

var s1 = new IO(19, 'out'); // speed
var s2 = new IO(13, 'out');
var m1 = new IO(6, 'out'); // direction
var m2 = new IO(26, 'out');

var loadLED = new IO(22, 'out') // LED signalizing on server start
loadLED.writeSync(0);
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
  }
}

app.use(express.static('public'));
app.use(express.static('bower_components'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html')
})

io.on('connection', function(socket) {
	socket.on('engines', function(data) {
		try {
			robot[data]()
		} catch(err) {}
	});
});

setInterval(function(){console.log('distance:', sensor())}, 2000);

var server = http.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Robot listening at http://%s:%s', host, port)

  loadLED.writeSync(1);

})

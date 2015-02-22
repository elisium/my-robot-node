var express = require('express');
var app = express();
var IO = require('onoff').Gpio;
var usonic = require('r-pi-usonic');
var sensor = usonic.createSensor(19, 13, 1000);
setInterval(function() {
    console.log('Distance: ' + sensor().toFixed(2) + ' cm');
}, 500);
var s1 = new IO(16, 'out');
var s2 = new IO(20, 'out');
var m1 = new IO(26, 'out');
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

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html')
})

app.get('/command/:command', function (req, res) {
 try {
  robot[req.params.command]();
 }
 catch (err) {
  console.log(err.toString());
 }
 res.send('success'); 
})

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Robot listening at http://%s:%s', host, port)

})

This is a web interface to roll with my robot.

node part:
```
$ npm install
$ bower install
$ ./camera_start.sh
$ sudo node app.js
```

arduino part:
```
$ sudo apt-get install arduino
$ sudo apt-get install python-dev&&python-setuptools
$ git clone git://github.com/amperka/ino.git
$ cd ino
$ sudo python setup.py install
$ cd arduino
$ ino build
$ ino upload
```
And go to http://<pi-address>:3000/

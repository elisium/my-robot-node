#!/bin/sh
mkdir /tmp/stream
raspistill --nopreview -w 800 -h 600 -q 80 -o /tmp/stream/pic.jpg -tl 10 -t 9999999 -th 0:0:0 &
LD_LIBRARY_PATH=/usr/local/lib mjpg_streamer -i "input_file.so -f /tmp/stream -n pic.jpg" -o "output_http.so -w /usr/local/www"

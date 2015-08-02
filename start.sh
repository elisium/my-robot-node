
#!/bin/bash
uv4l --driver raspicam --auto-video_nr --width 320 --height 240 --encoding jpeg > /dev/null 2>&1&
watch -n 0.5  dd if=/dev/video1 of=public/snapshot.jpeg bs=11M count=1 > /dev/null 2>&1&
echo "uv4l started"


if pgrep node > /dev/null
then
	echo "robot already running"
else
	sudo node app.js > /dev/null 2>&1&
	echo "robot started"
fi

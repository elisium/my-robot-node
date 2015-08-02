#!/bin/bash
 
kill $(pgrep echo) > /dev/null 2>&1
echo "uv4l stopped"

if pgrep node
then
    sudo kill $(pgrep node) > /dev/null 2>&1
    echo "node stopped"
else
    echo "node not running"
fi

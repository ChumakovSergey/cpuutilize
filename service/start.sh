#!/bin/bash

server="127.0.0.1:8001"
cpuutilizePath="cpu_utilize/"
fullPath="http://${server}/${cpuutilizePath}add/"
/opt/cpuutilize/proc.sh $fullPath &

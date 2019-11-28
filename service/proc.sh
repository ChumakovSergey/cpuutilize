#!/bin/bash

while true; do
	cpu_utilizate=$(top -n 1 -b | awk '/^%Cpu/{print $2}')
	dt=$(date  +%Y-%m-%d\ %H:%M:%S)
	curl -i -d "value=$cpu_utilizate&datetime=$dt" $1
	sleep 10
done


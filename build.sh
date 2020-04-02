#!/bin/bash

# Options
build=false

while :; do
	case "$1" in
		-b)  build=true;;
		*) echo "Option $1 not supported"
		   break
		   ;;
	esac
	shift
done

# Build 
cd client
npm run build
cd ..

# Docker-Compose
sudo docker-compose -f compose2.yml down
if $build; then
	sudo docker-compose -f compose2.yml build
fi
sudo docker-compose -f compose2.yml up &

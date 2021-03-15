#!/bin/bash
docker run -ti --rm --name node-builder -v $PWD/api:/usr/src node:14.5.0 sh -c "cd /usr/src && npm install"
#!/bin/sh
docker run -ti --rm --name node-builder -v $PWD/api-node/api:/usr/src node:lts-alpine3.10 sh -c "cd /usr/src && npm install"

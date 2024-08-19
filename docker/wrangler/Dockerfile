FROM node:22.6.0-alpine

RUN apk update && \
    apk add git vim bash curl

RUN npm install -g wrangler 

WORKDIR /develop

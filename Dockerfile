FROM node:10.15.1-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .



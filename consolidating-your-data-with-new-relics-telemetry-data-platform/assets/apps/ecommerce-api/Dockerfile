FROM node:14-alpine

RUN apk update && apk add python make g++

RUN mkdir /home/node/app
WORKDIR /home/node/app
COPY package.json package.json
RUN npm install
COPY *.js ./

CMD ["node","index.js"]
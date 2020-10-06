FROM node:14-alpine

RUN mkdir /home/node/app
WORKDIR /home/node/app
COPY package.json package.json
RUN npm install
COPY *.js ./

CMD ["node","index.js"]
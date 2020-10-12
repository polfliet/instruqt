FROM node:12-alpine
#RUN apk add --update --virtual .build-dependencies git make gcc g++ python
RUN npm --ws:verbose install markserv -g
#RUN apk del .build-dependencies
VOLUME ["/data"]
WORKDIR "/data"
CMD ["markserv", "-x", "-a", "0.0.0.0", "-p", "3080"]
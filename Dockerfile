FROM node:4-slim
MAINTAINER Eric Lin <line.eric@gmail.com>

RUN apt-get update
RUN apt-get install -y build-essential python
RUN apt-get clean

COPY . /opt/iugo/iugo_server

WORKDIR /opt/iugo/iugo_server

RUN rm -rf node_modules
RUN npm install

CMD ["npm", "start"]git 
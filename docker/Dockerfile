FROM node:carbon

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

RUN apt-get update && apt-get -y upgrade && \
    npm install -g yarn@1.12.x && rm -rf package-lock.json

# install and cache app dependencies
COPY build /usr/src/app

# Install `serve` to run the application.
RUN npm install -g serve@9.4.0

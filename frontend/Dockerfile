# base image
FROM node:9.6.1

# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH to be able to run "npm" and "ng" scripts
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /usr/src/app/package.json
RUN npm install
RUN npm install -g @angular/cli

# add app
COPY . /usr/src/app

# 4200 to access the app itself and 49153 to make the hot-reloading work
EXPOSE 4200 49153

# start app, update every 2 seconds
CMD ng serve --host 0.0.0.0 --poll 2000
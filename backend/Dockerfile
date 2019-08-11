# base image
FROM node:9.6.1

# set working directory
WORKDIR /app

# add current directory to /app folder in the container
COPY . /app
# install dependencies
RUN npm install
# compise TypeScript to JavaScript
RUN npm run tsc

# start app
CMD node build/backend-root.js

# expose 3000 to access server from outside of the container
EXPOSE 3000
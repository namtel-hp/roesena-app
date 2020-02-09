# base image
FROM node:10

ENV NODE_ENV=development
ENV TZ='Europe/Amsterdam'
# set working directory
WORKDIR /app

COPY package.json /app/package.json
# install dependencies
RUN npm install
# add current directory to /app folder in the container
COPY . /app
# start app
CMD ["npm", "run", "build"]
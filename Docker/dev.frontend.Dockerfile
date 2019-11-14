FROM node:10
WORKDIR /app
COPY package.json package.json
RUN npm install
COPY . .
CMD [ "npm", "run", "start" ]
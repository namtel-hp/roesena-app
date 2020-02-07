# build the angular app
FROM node:10-alpine AS angular-builder

WORKDIR /app

ENV NODE_ENV=development
ENV TZ='Europe/Amsterdam'

COPY ./angular/package.json package.json
COPY ./angular/package-lock.json package-lock.json

RUN npm ci 

COPY ./angular /app

RUN npm run build

# build the express server
FROM node:10 AS express-builder

WORKDIR /app

# dev here to install all dev packages
ENV NODE_ENV=development
ENV TZ='Europe/Amsterdam'

COPY ./express .

RUN npm ci

# set prod here to make prod build
ENV NODE_ENV=production

RUN npm run build

# create the final container with the build contents
FROM node:10 as final

ENV NODE_ENV=production
ENV TZ='Europe/Amsterdam'

WORKDIR /app

COPY ./express/package.json package.json
COPY ./express/package-lock.json package-lock.json

RUN npm ci

COPY --from=express-builder /app/dist/server.js server.js
COPY ./express/webpack.common.js webpack.common.js
COPY ./express/webpack.production.js webpack.production.js

RUN mkdir static

COPY --from=angular-builder /app/dist/frontend static

CMD ["node", "server.js"]
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { Server } from 'http';

import { event } from './api/event';
import { events } from './api/events';

const port = 4000;

// create the express-server instance
const app = express();
// use a middleware to parse the cookies
app.use(cookieParser());
// set json limit in body parser middleware to allow 10 mb file uploads
app.use(bodyParser.json({ limit: '10mb' }));

app.use('/api/event/:id', event);
app.use('/api/events', events);

if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
  app.use('/', express.static('static'));
}

// start the server
let server: Server;
function startServer() {
  server = app.listen(port, () => console.log(`Express is running on port ${port}!`));
}
startServer();

declare const module: any;

// webpack hot reloading
if (module.hot) {
  module.hot.accept(() => {
    if (server) {
      server.close();
    }
    startServer();
  });
  // when changes were detected app needs to restart -> shut down server here
  module.hot.dispose(() => server.close());
}

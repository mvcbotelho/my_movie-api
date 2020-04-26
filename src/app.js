import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import routes from './routes';

import logRequest from './middleware/log';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(logRequest);
    this.server.use(cors());
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV !== 'production') {
        return res.status(500).json(err);
      }

      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

export default new App().server;

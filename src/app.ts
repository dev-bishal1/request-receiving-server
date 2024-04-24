import express, { type Application, type Request, type Response } from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';

import logger from './utils/logger';
import errorHandler from './middleware/errorHandler.middleware';
import corsConfig from './config/cors.config';
import { DEFAULT_APP_PORT } from './constant/common';

const initializeApp = async (): Promise<Application> => {
  const app: Application = express();
  return app;
};

const startServer = async (app: Application, port: number | string): Promise<void> => {
  try {
    // serve static files
    // app.use(express.static(path.resolve(__dirname, '../assets')));
    app.use('/assets', express.static(path.resolve(__dirname, '../assets')));

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }));

    // parse application/json
    app.use(bodyParser.json());

    app.use(cors(corsConfig));

    // parse the cookie making it easier to work with cookies

    // Start the server
    app.listen(port, () => {
      logger.info(`App listening on: http://localhost:${port}`);
    });

    // Middleware to log incoming requests
    app.use((req: Request, res, next) => {
      logger.info(`Incoming request for: ${req.url}`); // Log the incoming request API path
      next();
    });

    app.use('/health', (req: Request, res: Response) => {
      res.status(200).json({
        msg: 'BlockSeas api server working successfully.',
      });
    });

    app.use('/', (req: Request, res: Response) => {
      res.status(200).json({
        msg: `BlockSeas api server listening on http://localhost:${port}`,
      });
    });

    // error handle middleware
    app.use(errorHandler);
  } catch (error) {
    logger.error('Unable to connect to the database:', error);
  }
};

// Initialize the Express app
initializeApp()
  .then(async (app: Application) => {
    // Start the server after the app has been initialized
    const port = process.env.PORT ?? DEFAULT_APP_PORT;
    await startServer(app, port);
  })
  .then(() => {
    logger.info('Server started successfully');
  })
  .catch((err) => {
    logger.error(err);
  });

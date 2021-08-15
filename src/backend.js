import { Server } from 'http';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import express from 'express';
import passport from 'passport';
import accessControl from './config/accessControl';
import corsOptionsDelegate from './config/corsOptions';
import HttpError from './error/HttpError';
import Logger from './core/logger';
import HttpErrorHandler from './error/HttpErrorHandler';
import connectToDB from './config/mongoose.config';
import serverLogger from './core/serverLogger';
import AdminRouter from './router/AdminRouter';
import passportAuthStrategy from './config/passportAuthStrategy';
import TestRouter from './router/TestRouter';
import CustomerRouter from './router/CustomerRouter';
import PublisherRouter from './router/PublisherRouter';
import AdvertiserRouter from './router/AdvertiserRouter';
import TagRouter from './router/TagRouter';

const logger = Logger.child({ moduleName: 'Application' });

export default class Application {
  constructor() {
    this.appM = express();
    this.serverM = new Server(this.appM);
  }

  start() {
    this.initApp();
    this.initDatabase();
    this.initPassport();
    this.addRouters();
    this.addErrorHandler();
    return new Promise((resolve) => {
      this.serverM.listen(process.env.REST_PORT, () => {
        logger.info(`Server running in NODE_ENV ${process.env.NODE_ENV}`);
        logger.info(`Server running on port ${process.env.REST_PORT}`);
        resolve(true);
      });
    });
  }

  close() {
    return new Promise((resolve, reject) => {
      this.serverM.close((err) => {
        if (err) reject(err);
        resolve(true);
      });
    });
  }

  initApp() {
    this.appM.use(bodyParser.json({ limit: '10mb' }));
    this.appM.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));
    this.appM.use(helmet());

    // Setup cors.
    this.appM.use(cors(corsOptionsDelegate));
    // Setup access control
    this.appM.use(accessControl);

    // set morgan to express server for logging http requests
    this.appM.use(serverLogger);
  }

  initDatabase() {
    connectToDB().catch((err) => {
      logger.error(err);
      throw new Error(`unable to connect to database ${err.message}`);
    });
  }

  initPassport() {
    passportAuthStrategy(passport);
  }

  addRouters() {
    const routers = [
      new AdminRouter(),
      new CustomerRouter(),
      new PublisherRouter(),
      new AdvertiserRouter(),
      new TagRouter(),
    ];
    if (process.env.NODE_ENV === 'test') routers.push(new TestRouter());

    routers.forEach((r) => {
      logger.info(`App: add router: ${r.getPrefix()}`);
      this.appM.use(r.getPrefix(), r.getRouter());
    });

    // catch-all endpoint if client makes request to non-existent endpoint
    this.appM.use('*', () => {
      throw HttpError.NotFound('Resource not found');
    });
  }

  addErrorHandler() {
    this.appM.use(HttpErrorHandler.middleware);
  }
}

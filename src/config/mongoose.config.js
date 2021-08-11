import mongoose from 'mongoose';
import getDatabaseName from '../util/getDatabaseName';
import logger from '../core/logger';

const myLogger = logger.child({ moduleName: 'MongoDB' });

async function connectToDB() {
  let url = '';
  let connectData = {};
  const database = getDatabaseName();

  url = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${database}`;
  if (String(process.env.MONGO_USE_AUTH) === '1') {
    myLogger.info('MongoDB: Use Login');
    url = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${database}`;
    connectData = {
      auth: {
        user: process.env.MONGO_USER,
        password: process.env.MONGO_PASSWORD,
      },
      authSource: process.env.MONGO_AUTH_DB,
    };
  }
  return new Promise((resolve, reject) => {
    mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true,
      ...connectData,
    })
      .then(() => {
        myLogger.info('connected to mongodb');
        resolve();
      })
      .catch((err) => {
        myLogger.error(`failed to connect to mongodb: ${JSON.stringify(err)}`);
        reject(err);
      });
  });
}

export default connectToDB;

import morgan from 'morgan';

import Logger from './logger';

const logger = Logger.child({ moduleName: 'Server' });

// Override the stream method by telling
// Morgan to use our custom logger instead of the console.log.
const stream = {
  // Use the http severity
  write: (message) => logger.info(message),
};

const serverLogger = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  { stream },
);

export default serverLogger;

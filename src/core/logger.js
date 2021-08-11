import winston from 'winston';
import 'winston-daily-rotate-file';

const format = winston.format;

const filePrefix = (process.env.NODE_ENV === 'prod' || process.env.NODE_ENV === 'production') ? '' : 'dev-';

const alignedWithColorsAndTime = format.combine(
  format.colorize(),
  format.timestamp(),
  format.printf((info) => `${info.timestamp} ${info.moduleName || ''} ${info.level}:   ${info.message}`),
);

const transportError = new winston.transports.DailyRotateFile({
  filename: `./logs/%DATE%-${filePrefix}error.log`,
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '365d',
  level: 'error',
});

const transportCombined = new winston.transports.DailyRotateFile({
  filename: `./logs/%DATE%-${filePrefix}combined.log`,
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '365d',
  level: 'info',
});

const Logger = winston.createLogger({
  level: 'info',
  format: alignedWithColorsAndTime,
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    transportError,
    transportCombined,
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  Logger.add(new winston.transports.Console({
    format: alignedWithColorsAndTime,
  }));
}

export default Logger;

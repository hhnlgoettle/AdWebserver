import winston from 'winston';

const format = winston.format;

const alignedWithColorsAndTime = format.combine(
  format.colorize(),
  format.timestamp(),
  format.printf((info) => `${info.timestamp} ${info.moduleName || ''} ${info.level}:   ${info.message}`),
);

const Logger = winston.createLogger({
  level: 'info',
  format: alignedWithColorsAndTime,
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new winston.transports.File({ filename: './logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: './logs/combined.log', level: 'info' }),
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

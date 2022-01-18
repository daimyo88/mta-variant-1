const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;
 
const myFormat = printf(({ message, label, timestamp }) => {
  return `${timestamp}: ${message}`;
});
 
const logger = createLogger({
  format: combine(
    timestamp(),
    myFormat
  ),
  transports: [new transports.File({ filename: 'errors.log' })]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.simple(),
  }));
}


module.exports = logger;
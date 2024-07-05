const { createLogger, format, transports } = require('winston');
const { combine, timestamp, json, colorize, printf } = format;
const path = require('path');

// Custom format for console logging with colors
const consoleLogFormat = printf(({ level, message, timestamp }) => {
  return `${level}: ${message} [${timestamp}]`;
});

// Create a Winston logger
const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp(),
    json()
  ),
  transports: [
    new transports.Console({
      format: combine(
        colorize(),
        consoleLogFormat
      )
    }),
    new transports.File({ filename: path.resolve(__dirname, '../../app.log') })
  ],
});

module.exports = logger;

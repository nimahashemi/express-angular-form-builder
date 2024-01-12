const winston = require('winston');
const config = require('../config');

const {
  combine, timestamp, json,
} = winston.format;

const logger = winston.createLogger({
  level: config.log.level || 'info',
  format: combine(timestamp(), json()),
  transports: [
    new winston.transports.File({
      filename: '../service.log',
    }),
  ],
});

module.exports = logger;

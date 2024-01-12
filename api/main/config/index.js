const dotenv = require('dotenv');
const { version } = require('../../package.json');

dotenv.config();

[
  'PORT', 'NODE_ENV',
  'MONGO_URL', 'MONGO_PORT', 'MONGO_DB',
  'SECRET_KEY',
].forEach((name) => {
  if (!Object.keys(process.env).indexOf(name) < 0) {
    throw new Error(`Environment variable ${name} is missing`);
  }
});

const config = {
  env: process.env.NODE_ENV.toLowerCase(),
  logger: {
    level: process.env.LOG_LEVEL || 'info',
    file: process.env.LOG_FILE || '../service.log',
  },
  documentation: {
    swagger: {
      info: {
        version,
        title: 'Form Builder API Documentation',
        description: 'Form Builder API Endpoints Documentation',
      },
      consumes: ['application/json'],
      produces: ['application/json'],
    },
    exposeRoute: true,
  },
  server: {
    host: process.env.HOST,
    port: Number(process.env.PORT),
  },
  log: {
    level: process.env.LOG_LEVEL,
  },
  db: {
    mongo: {
      url: process.env.MONGO_URL,
      port: process.env.MONGO_PORT,
      db: process.env.MONGO_DB,
    },
  },
  auth: {
    secret: process.env.SECRET_KEY,
  },
};

module.exports = config;

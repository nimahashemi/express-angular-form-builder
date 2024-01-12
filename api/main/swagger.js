const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  info: {
    title: 'STDev Form Builder API',
    version: '1.0.0',
    description: 'Form Builder swagger API for Authentication and create dynamic forms',
  },
  servers: ['http://localhost:3000'],
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      schema: 'bearer',
      in: 'header',
    },
  },
};

const swaggerOptions = {
  swaggerDefinition,
  apis: [
    './routes/*.js',
    './routes/v1/*.js',
    './routes/user/v1/*.js',
    './routes/form/v1/*.js',
  ],
};

const setup = (app) => app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(swaggerOptions)));

module.exports = setup;

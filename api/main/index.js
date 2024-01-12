/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable security-node/detect-crlf */
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();
app.use(cors({
  origin: ['http://localhost:4200'],
  methods: 'GET,PUT,POST,DELETE,PATCH',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
}));

app.use(express.json({ limit: '1024kb' }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

const config = require('./config');
const { DB } = require('./database');
const swagger = require('./swagger');

DB();

const routes = require('./routes');

app.use('/api/v1', routes);
swagger(app);

app.all('*', (req, res, _next) => res.status(404).json({ data: null, message: 'Route not found' }));

app.use((error, _req, res, _next) => {
  error.status = error.status || 'error';
  error.statusCode = error.statusCode || 500;
  console.error(error.message);
  error.stack && console.error(error.stack);
});

app.listen(config.server.port, () => {
  console.log(`Server running at http://${config.server.host}:${config.server.port}`);
});

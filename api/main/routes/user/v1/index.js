/* eslint-disable no-underscore-dangle */
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../../config');
const { logger } = require('../../../lib');
const cache = require('../../../lib');

const userRoute = express.Router();

const service = require('../../../services/user-service');

/**
 * @swagger
 * /api/v1/user/signup:
 *  post:
 *    description: Signup new user
 *    tags:
 *      - User Authentication
 *    parameters:
 *      - in: body
 *        name: body
 *        schema:
 *          type: object
 *          properties:
 *            username:
 *              type: string
 *            password:
 *              type: string
 *    responses:
 *      '200':
 *        description: Success Create User
 */
userRoute.post('/signup', async (req, res) => {
  logger.info('req:', req);
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await service.create(username, hashedPassword);
  } catch (e) {
    logger.error('error:', 'Registration failed - ', e);
    return res.status(500).json({ error: 'Registration failed' });
  }
  logger.info('res:', 'User registered successfully');
  return res.status(201).json({ message: 'User registered successfully' });
});

/**
 * @swagger
 * /api/v1/user/signin:
 *  post:
 *    description: Signin user
 *    tags:
 *      - User Authentication
 *    parameters:
 *      - in: body
 *        name: body
 *        schema:
 *          type: object
 *          properties:
 *            username:
 *              type: string
 *            password:
 *              type: string
 *    responses:
 *      '200':
 *        description: Success Login
 */
userRoute.post('/signin', async (req, res) => {
  logger.info('req:', req);
  const { username, password } = req.body;
  let token;
  let user;
  try {
    user = await service.findByUsername(username);
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      logger.error('error:', 'Authentication failed');
      return res.status(401).json({ error: 'Authentication failed' });
    }

    token = jwt.sign({ userId: user._id, username: user.username, iat: Math.floor(Date.now() / 1000) - 30 }, config.auth.secret, {
      expiresIn: '1h',
    });
  } catch (e) {
    logger.error('error:', 'Login failed - ', e);
    return res.status(500).json({ error: 'Login failed' });
  }
  logger.info('res:', `Login ${user._id} Success`);
  return res.status(200).json({ token });
});

/**
 * @swagger
 * /api/v1/user/signout:
 *  post:
 *    description: Signout user
 *    tags:
 *      - User Authentication
 *    parameters:
 *      - in: body
 *        name: body
 *        schema:
 *          type: object
 *          properties:
 *            token:
 *              type: string
 *    responses:
 *      '200':
 *        description: Success Logout
 */
userRoute.post('/signout', async (req, res) => {
  logger.info('req:', req);
  const { token } = req.body;
  try {
    cache.set(token, true);
  } catch (e) {
    logger.error('error:', 'Logout failed - ', e);
    return res.status(500).json({ error: 'Logout failed' });
  }
  return res.status(204).json();
});

module.exports = userRoute;

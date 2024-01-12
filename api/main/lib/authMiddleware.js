/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const config = require('../config');
const cache = require('./cacheManagment');

const verifyToken = async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'Access denied' });
  if (cache.has(token)) return res.status(401).json({ error: 'Access denied' });
  try {
    const decoded = jwt.verify(token, config.auth.secret);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = verifyToken;

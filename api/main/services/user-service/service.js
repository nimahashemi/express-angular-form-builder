const jwt = require('jsonwebtoken');
const model = require('./model');
const customError = require('../../custom-errors');
const config = require('../../config');

const create = async (username, password) => {
  await model.create(username, password);
};

const findByUsername = async (username) => {
  const user = await model.findByUsername(username);
  if (!user) throw new customError.UserNotFoundError();
  return user;
};

const decode = async (userId, token) => {
  const decoded = jwt.verify(token, config.auth.secret);
  if (userId === decoded.userId) return true;
  return false;
};

module.exports = {
  create,
  findByUsername,
  decode,
};

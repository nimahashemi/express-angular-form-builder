const User = require('./schema');

const create = async (username, password) => {
  const user = new User({ username, password });
  await user.save();
};

const findByUsername = async (username) => {
  const user = await User.findOne({ username });
  return user;
};

module.exports = {
  create,
  findByUsername,
};

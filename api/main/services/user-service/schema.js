const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
}, { collection: 'users', versionKey: false });

module.exports = mongoose.model('User', userSchema);

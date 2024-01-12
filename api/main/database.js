const mongoose = require('mongoose');
const config = require('./config');

const dbConnection = async () => {
  await mongoose.connect(`mongodb://${config.db.mongo.url}:${config.db.mongo.port}/${config.db.mongo.db}`)
    .then(() => { // MongoDB connection
      console.log('database connected');
    })
    .catch(() => {
      console.log('database connection error');
    });

  return mongoose;
};

module.exports = {
  DB: dbConnection,
};

const mongoose = require('mongoose');

let started = false;

// Check connection status to database for healthcheck
const healthCheck = async () => {
  let result = null;

  const status = mongoose.connection.readyState;
  if (status === 0) result = 'REB';
  if (status === 1) result = 'GREEN';
  if (status === 2) result = 'YELLOW';
  if (status === 3) result = 'ORANG';
  return result;
};

// Check connection status to database
const clientStart = async () => {
  try {
    const status = await healthCheck();
    started = status !== 'RED';
  } catch (e) {
    // console.log(e);
  }
  return started;
};

module.exports = {
  healthCheck,
  clientStart,
};

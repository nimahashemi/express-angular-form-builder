class UserNotFoundError extends Error {
  constructor(code, message) {
    super('User not found');
    this.code = 5003;
    if (code) this.originCode = code;
    if (message) this.originMessage = message;
  }
}

module.exports = UserNotFoundError;

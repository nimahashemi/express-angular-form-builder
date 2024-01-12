class RejectError extends Error {
  constructor(code, message) {
    super('Request rejected');
    this.code = 5002;
    if (code) this.originCode = code;
    if (message) this.originMessage = message;
  }
}

module.exports = RejectError;

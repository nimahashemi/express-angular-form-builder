class FormNotFoundError extends Error {
  constructor(code, message) {
    super('Form not found');
    this.code = 5004;
    if (code) this.originCode = code;
    if (message) this.originMessage = message;
  }
}

module.exports = FormNotFoundError;

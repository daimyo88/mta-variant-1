class HttpError extends Error {
    constructor(message, errorCode, location) {
      super(message);
      this.code = errorCode;
      this.location = location || '';
    }
  }
  
  module.exports = HttpError;
const { validationResult } = require('express-validator');
const HttpError = require('../utils/http-error');

module.exports = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new HttpError('invalid-request', 422));
    }
    next();
}
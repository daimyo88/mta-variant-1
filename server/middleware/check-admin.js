const HttpError = require('../utils/http-error');

module.exports = async (req, res, next) => {
    try {
        if(req.user.role !== 'admin') {
            return next(new HttpError('not-authorized', 401));
        } else {
            next();
        }
    } catch(e) {
        return next(new HttpError('bad-request', 403));
    }
} 
const HttpError = require('../utils/http-error');

module.exports = async (req, res, next) => {
    const transportId = req.params.sid || req.body.transport._id || req.body.transport;
    if(req.user.role === 'admin') {
        return next();
    }

    if(req.user.role === 'user') { 
        if(req.user.transports.includes(transportId)) {
            return next();
        } else {
            return next(new HttpError('not-authorized', 401));
        }  
    }
 
} 
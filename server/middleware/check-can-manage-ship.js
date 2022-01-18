const HttpError = require('../utils/http-error');

module.exports = async (req, res, next) => {
    const shipId = req.params.sid || req.body.ship._id || req.body.ship;
    if(req.user.role === 'admin') {
        return next();
    }

    if(req.user.role === 'user') { 
        if(req.user.ships.includes(shipId)) {
            return next();
        } else {
            return next(new HttpError('not-authorized', 401));
        }  
    }
 
} 
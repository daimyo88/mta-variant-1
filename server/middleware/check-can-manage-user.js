const HttpError = require('../utils/http-error');

module.exports = async (req, res, next) => {
    const userId = req.params.uid || req.body.userId || req.body.user._id || req.body.user || JSON.parse(req.body.user)._id;
    if(req.user.role === 'admin') {
        return next();
    }

    if(req.user.role === 'user') { 
        if(req.user._id.toString() === userId.toString()) {
            return next();
        } else {
            return next(new HttpError('not-authorized', 401));
        }  
    }
 
} 
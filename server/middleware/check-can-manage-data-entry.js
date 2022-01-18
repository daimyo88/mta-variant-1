const HttpError = require('../utils/http-error');

module.exports = async (req, res, next) => {
    const dataEntryId = req.params.did;
    if(req.user.role === 'admin') {
        return next();
    }

    if(req.user.role === 'user') { 
        if(req.user.dataEntries.includes(dataEntryId)) {
            return next();
        } else {
            return next(new HttpError('not-authorized', 401));
        }  
    }
 
} 
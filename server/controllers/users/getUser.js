const qrcode = require('qrcode');

const User = require('../../models/user');
const HttpError = require('../../utils/http-error');

const getUser = async (req, res, next) => {

    try {
        const userId = req.params.uid;
        let requestedUser;
        requestedUser = await User.findById(userId, '-password');
        
        if(!requestedUser) {
            throw new HttpError('user-not-found', 404);
        }

//   const secret = requestedUser.auth2fSecret;
//   const decodedQRcode = await qrcode.toDataURL(secret.otpauth_url);

        res
            .json({
                firstName: requestedUser.firstName,
                lastName: requestedUser.lastName,
                email: requestedUser.email,
                role: requestedUser.role,
                status: requestedUser.status,
            }); 
            
    } catch(e) {
        return next(e);
    }

}

module.exports = getUser;
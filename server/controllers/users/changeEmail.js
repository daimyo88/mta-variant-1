const HttpError = require('../../utils/http-error');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');

require('dotenv').config();

const changeEmail = async (req, res, next) => {
    try {
        const { token } = req.body;
        let decodedToken, existingUser, user;

        if (!token) {
            throw new HttpError('no-token', 401);
        }

        decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        user = await User.findOne({'_id': decodedToken._id});

        if (!user) {
            throw new HttpError('user-does-not-exist', 403);
        }

        existingUser = await User.findOne({email : decodedToken?.email});

        if(existingUser) {
            throw new HttpError('user-exists', 422);
        }

        user.email = decodedToken.email;
        user.save();
        
    } catch (err) {
        return next(e);
    }

  res.json({});

}
  
module.exports = changeEmail; 
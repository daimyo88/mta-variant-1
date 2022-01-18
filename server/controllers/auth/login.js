const bcrypt = require('bcryptjs');
const HttpError = require('../../utils/http-error');
const User = require('../../models/user');
require('dotenv').config();

const login = async (req, res, next) => {
  
  try {

    const { email, password } = req.body;   
    let isValidPassword = false;

    const user = await User.findOne({ email: email });
    
    if (!user) {
      throw new HttpError('user-does-not-exist', 404);
    }

    if (!user.confirmedEmail) {
      throw new HttpError('email-not-confirmed', 401);
    }

    if(!user.status) {
      throw new HttpError('inactive-account', 401);
    }
  
    isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new HttpError('wrong-password', 403);
    }
    
    const authToken = user.generateAuthToken();
  
    if(user.auth2f) {
      res
        .cookie("citbo_user", authToken, { httpOnly: true })
        .json({
          auth2f: true
        }); 
      
    } else {
      res
        .cookie("citbo_token", authToken, { httpOnly: true })
        .json({});
    }

  } catch (err) {
    return next(err);
  }

};

module.exports = login; 
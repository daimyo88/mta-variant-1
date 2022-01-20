const jwt = require('jsonwebtoken');
const User = require('../models/user');

require('dotenv').config();

module.exports = async (token, next) => {
  
  try {
    let user = '';
    let decodedToken; 

    if (!token) {
      return '';
    }

    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    user = await User.findOne({'_id': decodedToken._id});

    if (!user) {
      return '';
    }

    const authToken = user.generateAuthToken();

    return {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        confirmedEmail: user.confirmedEmail,
        token: authToken,
        transports: user.transports,
        dataEntries: user.dataEntries
    }  
  } catch(e) {
    return next(e);
  }
} 
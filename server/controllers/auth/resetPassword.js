const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const HttpError = require('../../utils/http-error');
const User = require('../../models/user');

require('dotenv').config();

const resetPassword = async (req, res, next) => {
  
    try {    
        const { newPassword } = req.body;    
        const token = req.cookies.citbo_fp_user;

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({'_id': decodedToken._id});

        const hashedPassword = await bcrypt.hash(newPassword, 12);
        user.password = hashedPassword;
        await user.save();
   
    res
        .clearCookie("citbo_fp_user")
        .json({ successMessage: 'forgot-password-success'});
        
    } catch (err) {
      return next(err);
    }
};

module.exports = resetPassword; 
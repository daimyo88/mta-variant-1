const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');

require('dotenv').config();

module.exports = async (req, res, next) => {
  
    try {    
        const { newPassword } = req.body;    
        const token = req.cookies.mta1_fp_user;

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({'_id': decodedToken._id});

        const hashedPassword = await bcrypt.hash(newPassword, 12);
        user.password = hashedPassword;
        await user.save();
   
    res
        .clearCookie("mta1_fp_user")
        .json({ successMessage: 'forgot-password-success'});
        
    } catch (err) {
      return next(err);
    }
};
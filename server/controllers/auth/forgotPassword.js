const HttpError = require('../../utils/http-error');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const sendEmail = require('../../utils/send-email');
const text = require('../../emails/texts');

require('dotenv').config();

const forgotPassword = async (req, res, next) => {
  
    try {
        const { email } = req.body;

        const user = await User.findOne({'email': email }).populate('cabinet');

        if (!user) {
            throw new HttpError('user-does-not-exist', 403);
        }

        if (!user.confirmedEmail) {
            throw new HttpError('email-not-confirmed', 401);
        }
    
        const token = jwt.sign(
        {
            '_id': user._id,
            'email': user.email
        },
        process.env.JWT_SECRET,
        { expiresIn: "240h" }
        );
          
        const to = [{
            email: email 
        }];

        const replaceOptions = {
            '[first-name]': user.firstName,
            '[last-name]': user.lastName,
        }

        const subject = text.forgotPassword.subject;
        const emailText = text.forgotPassword.text;
        const linkText = text.forgotPassword.link;

        const linkUrl = process.env.BASE_URL + '/reset-password/' + token;
        const link = {
            url: linkUrl,
            text: linkText 
        }

        await sendEmail({ to, subject, emailText, link, replaceOptions  });
        res.json({ successMessage: 'reset-password-email-sent' });
        
    } catch(err) {
      return next(err);
    }
}
  
module.exports = forgotPassword; 
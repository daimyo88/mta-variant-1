const User = require('../../models/user');
const HttpError = require('../../utils/http-error');
const sendEmail = require('../../utils/send-email');
const speakeasy = require('speakeasy');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const text = require('../../emails/texts');

require('dotenv').config();

const createUser = async (req, res, next) => {
    try { 
        const { firstName, lastName, email, role } = req.body;
        let existingUser, newUser;

        existingUser = await User.findOne({email : email});

        if(existingUser) {
            throw new HttpError('user-exists', 422);
        }

        const auth2fSecret = speakeasy.generateSecret({
            name: 'CITBO'
        });

        newUser = new User({
            firstName,
            lastName,
            email,
            role,
            auth2fSecret,
        });

        const token = jwt.sign(
            {
                '_id': newUser._id
            },
            process.env.JWT_SECRET,
            { expiresIn: "240h" }
        );

        const to = [{
            email: email 
        }]

        const subject = text.userCreated.subject;
        const emailText = text.userCreated.text;
        const linkText = text.userCreated.link;

        const linkUrl = process.env.BASE_URL + '/signup/' + token;
        const link = {
            url: linkUrl,
            text: linkText 
        }

        sendEmail({ to, subject, emailText, link });

        const sess = await mongoose.startSession();
        sess.startTransaction();
        await newUser.save({ session: sess });
        await sess.commitTransaction();
    
        res.json({successMessage: 'user-created'});

    } catch (err) {
        return next(err);
    }
}

module.exports = createUser;
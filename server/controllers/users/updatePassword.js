const User = require('../../models/user');
const HttpError = require('../../utils/http-error');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
require('dotenv').config();

const resetPassword = async (req, res, next) => {

    try {
        const { newPassword } = req.body;
        const userId = req.params.uid;
        let requestedUser;
        requestedUser = await User.findById(userId, '-password')

        if(!requestedUser) {
            throw new HttpError('user-not-found', 404);
        }

        // change password
        if(newPassword !== '') {
            let hashedPassword = await bcrypt.hash(newPassword, 12);
            requestedUser.password = hashedPassword;
        }

        await requestedUser.save();   
        res.json({ successMessage: 'profile-updated'});

    } catch (err) {
        return next(err);
    }

}

module.exports = resetPassword;
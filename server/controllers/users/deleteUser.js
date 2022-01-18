const User = require('../../models/user');
const Ship = require('../../models/ship');
const HttpError = require('../../utils/http-error');
const mongoose = require('mongoose');

const deleteUser = async (req, res, next) => {

    try {
        const { user } = req.body;
        let requestedUser;
        requestedUser = await User.findById(user._id);

        if(!requestedUser) {
            throw new HttpError('user-not-found', 404);
        }

        if(req.user._id === user._id) {
            return next(new HttpError('cannot-delete-own-account', 401));
        }
        
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await Ship.deleteMany({ shipOwner: requestedUser._id}, { session: sess });
        await requestedUser.remove({ session: sess });
        await sess.commitTransaction();

        res.json({successMessage: 'profile-deleted'});

    } catch(e) {
        return next(e);
    }
}

module.exports = deleteUser;
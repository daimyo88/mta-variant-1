const User = require('../../models/user');
const Ship = require('../../models/ship');
const HttpError = require('../../utils/http-error');
const mongoose = require('mongoose');

const deleteShip = async (req, res, next) => {
    
    try {
        const { ship } = req.body;
        const requestedShip = await Ship.findById(ship._id);

        if(!requestedShip) {
            throw new HttpError('item-not-found', 404);
        }

        const shipOwner = await User.findById(requestedShip.user);

        if(!shipOwner) {
            throw new HttpError('user-not-found', 404);
        }

        const sess = await mongoose.startSession();
        sess.startTransaction();
        await requestedShip.remove({ session: sess });
        shipOwner.ships.pull(requestedShip);
        await shipOwner.save({ session: sess });
        await sess.commitTransaction();

        res.json({successMessage: 'ship-deleted'});
 
    } catch(e) {
        return next(e);
    }
}

module.exports = deleteShip;
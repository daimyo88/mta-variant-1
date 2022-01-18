const User = require('../../models/user');
const Ship = require('../../models/ship');
const HttpError = require('../../utils/http-error');
const mongoose = require('mongoose');

require('dotenv').config();

const createShip = async (req, res, next) => {
    try { 
        const { 
            shipName,
            dwt, 
            shipLength, 
            shipCategory, 
            shipWidth,
            shipVolume,
            productGroup,
            coated,
            piping,
            heated,
            shipProfile,
            flag,
            tanksQuantity
        } = req.body;

        const shipOwner = await User.findById(req.user._id);

        if(!shipOwner) {
            throw new HttpError('user-not-found', 404);
        }

        const newShip = new Ship({
            title: shipName,
            dwt,
            shipLength,
            user: req.user._id,
            shipCategory,
            shipWidth,
            shipVolume,
            productGroup,
            coated,
            piping,
            heated,
            shipProfile,
            flag,
            tanksQuantity
        })

        const sess = await mongoose.startSession();
        sess.startTransaction();
        await newShip.save({ session: sess });
        shipOwner.ships.push(newShip);
        await shipOwner.save({ session: sess });
        await sess.commitTransaction();
    
        res.json({successMessage: 'ship-created'});

    } catch (err) {
        return next(err);
    }
}

module.exports = createShip;
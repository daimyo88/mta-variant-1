const User = require('../../models/user');
const Transport = require('../../models/transport');
const HttpError = require('../../utils/http-error');
const mongoose = require('mongoose');

require('dotenv').config();

const controller = async (req, res, next) => {
    try { 
        const { 
            model,
            maxWeight,
            height,
            volume,
            category,
            coated,
        } = req.body;

        const transportOwner = await User.findById(req.user._id);

        if(!transportOwner) {
            throw new HttpError('user-not-found', 404);
        }

        const newTransport = new Transport({
            vehicleModel: model,
            maxWeight,
            category,
            volume,
            height,
            coated,
            user: req.user._id,
        })

        const sess = await mongoose.startSession();
        sess.startTransaction();
        transportOwner.transports.push(newTransport);
        await newTransport.save({ session: sess });
        await transportOwner.save({ session: sess });
        await sess.commitTransaction();
    
        res.json({successMessage: 'transport-created'});

    } catch (err) {
        console.log(err)
        return next(err);
    }
}

module.exports = controller;
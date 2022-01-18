const PortArea = require('../../models/region');
const Port = require('../../models/city');
const HttpError = require('../../utils/http-error');
const mongoose = require('mongoose');

const deleteLocation = async (req, res, next) => {

    try {
        const { portArea } = req.body;
        const requestedPortArea = await PortArea.findById(portArea._id);

        if(!requestedPortArea) {
            throw new HttpError('item-not-found', 404);
        }

        const sess = await mongoose.startSession();
        sess.startTransaction();
        await requestedPortArea.remove({ session: sess });
        await Port.deleteMany({ portArea: requestedPortArea._id}, { session: sess });
        await sess.commitTransaction();

        res.json({successMessage: 'location-deleted'});
 
    } catch(e) {
        return next(e);
    }
}

module.exports = deleteLocation;
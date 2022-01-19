const Region = require('../../models/region');
const City = require('../../models/city');
const HttpError = require('../../utils/http-error');
const mongoose = require('mongoose');

const deleteLocation = async (req, res, next) => {

    try {
        const { region } = req.body;
        const requestedRegion = await Region.findById(region._id);

        if(!requestedRegion) {
            throw new HttpError('item-not-found', 404);
        }

        const sess = await mongoose.startSession();
        sess.startTransaction();

        await requestedRegion.remove({ session: sess });
        await City.deleteMany({ region: requestedRegion._id}, { session: sess });
        await sess.commitTransaction();

        res.json({successMessage: 'location-deleted'});
 
    } catch(e) {
        return next(e);
    }
}

module.exports = deleteLocation;
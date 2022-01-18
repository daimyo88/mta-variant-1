const Port = require('../../models/city');
const PortArea = require('../../models/region');
const HttpError = require('../../utils/http-error');
const mongoose = require('mongoose');

const deleteLocation = async (req, res, next) => {

    try {
        const { port } = req.body;
        const requestedPort = await Port.findById(port._id);

        if(!requestedPort) {
            throw new HttpError('item-not-found', 404);
        }

        const portArea = await PortArea.findById(requestedPort.portArea);

        if(!portArea) {
            throw new HttpError('item-not-found', 404);
        }

        const sess = await mongoose.startSession();
        sess.startTransaction();
        await requestedPort.remove({ session: sess });
        portArea.ports.pull(requestedPort);
        await portArea.save({ session: sess });
        await sess.commitTransaction();

        res.json({successMessage: 'location-deleted'});
 
    } catch(e) {
        return next(e);
    }
}

module.exports = deleteLocation;
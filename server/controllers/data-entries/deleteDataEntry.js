const User = require('../../models/user');
const DataEntry = require('../../models/data-entry');
const HttpError = require('../../utils/http-error');
const mongoose = require('mongoose');

const deleteDataEntry = async (req, res, next) => {

    try {
        const dataEntryId = req.params.did;
        const dataEntry = await DataEntry.findById(dataEntryId);

        if(!dataEntry) {
            throw new HttpError('item-not-found', 404);
        }

        const user = await User.findById(dataEntry.user);

        if(!user) {
            throw new HttpError('user-not-found', 404);
        }

        const sess = await mongoose.startSession();
        sess.startTransaction();
        await dataEntry.remove({ session: sess });
        user.dataEntries.pull(dataEntry);
        await user.save({ session: sess });
        await sess.commitTransaction();

        res.json({successMessage: 'data-entry-deleted'});
 
    } catch(e) {
        return next(e);
    }
}

module.exports = deleteDataEntry;
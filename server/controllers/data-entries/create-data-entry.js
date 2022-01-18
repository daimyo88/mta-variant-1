const User = require('../../models/user');
const DataEntry = require('../../models/data-entry');
const HttpError = require('../../utils/http-error');

const mongoose = require('mongoose');

const createDataEntry = async (req, res, next) => {

    try { 
        const { 
            freightType,
            dateNomination, 
            ship, 
            dwt, 
            shipCategory, 
            shipLength, 
            shipWidth,
            shipVolume,
            shipProductGroup,
            shipCoated,
            shipHeated,
            shipPiping,
            shipProfile,
            tanksQuantity,
            shipFlag,
            comment,
            freightData } = req.body;

        const user = await User.findById(req.user._id);

        if(!user) {
            throw new HttpError('user-not-found', 404);
        }
 
        const newDataEntry = new DataEntry({
            createdAt: new Date(),
            comment,
            freightType,
            dateNomination,
            shipTitle: ship,
            shipLength,
            dwt,
            shipCategory,
            shipWidth,
            shipVolume,
            shipProductGroup,
            shipCoated,
            shipHeated,
            shipPiping,
            shipProfile,
            tanksQuantity,
            shipFlag,
            freightData,
            user
        })

        const sess = await mongoose.startSession();
        sess.startTransaction();
        await newDataEntry.save({ session: sess });
        user.dataEntries.push(newDataEntry);
        await user.save({ session: sess });
        await sess.commitTransaction();
    
        res.json({successMessage: 'data-entry-created'});

    } catch (err) {
        return next(err);
    }
}

module.exports = createDataEntry;
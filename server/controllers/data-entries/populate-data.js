const User = require('../../models/user');
const PortArea = require('../../models/region');
const HttpError = require('../../utils/http-error');

const populateData = async (req, res, next) => {

    try {
        const userId = req.query.uid;
        if(!userId) {
            throw new HttpError('item-not-found', 404);
        }

        const user = await User.findById(userId, 'ships').populate('ships').lean();
        const portAreas = await PortArea.find({}).populate('ports').lean();

        if(!user) {
            throw new HttpError('item-not-found', 404);
        }

        res
            .json({
                ships: user.ships,
                locations: portAreas
            }); 
            
    } catch(e) {
        return next(e);
    }

}

module.exports = populateData;
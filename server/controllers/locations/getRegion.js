const Region = require('../../models/region');
const HttpError = require('../../utils/http-error');

const getRegion = async (req, res, next) => {

    try {
        const regionId = req.params.pid;
        const requestedRegion = await Region.findById(regionId).populate('cities').lean();

        if(!requestedRegion) {
            throw new HttpError('item-not-found', 404);
        }

        res.json(requestedRegion); 
            
    } catch(e) {
        return next(e);
    }

}

module.exports = getRegion;
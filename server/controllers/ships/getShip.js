const Ship = require('../../models/ship');
const HttpError = require('../../utils/http-error');

const getShip = async (req, res, next) => {

    try {
        const shipId = req.params.sid;
        const requestedShip = await Ship.findById(shipId).lean();

        if(!requestedShip) {
            throw new HttpError('item-not-found', 404);
        }

        res.json(requestedShip); 
            
    } catch(e) {
        return next(e);
    }

}

module.exports = getShip;
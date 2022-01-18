const PortArea = require('../../models/region');
const HttpError = require('../../utils/http-error');

const getPortArea = async (req, res, next) => {

    try {
        const portAreaId = req.params.pid;
        const requestedPortArea = await PortArea.findById(portAreaId).populate('ports').lean();

        if(!requestedPortArea) {
            throw new HttpError('item-not-found', 404);
        }

        res
            .json(requestedPortArea); 
            
    } catch(e) {
        return next(e);
    }

}

module.exports = getPortArea;
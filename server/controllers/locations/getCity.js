const Port = require('../../models/city');
const HttpError = require('../../utils/http-error');

const getPort = async (req, res, next) => {

    try {
        const portId = req.params.pid;
        const requestedPort = await Port.findById(portId).lean();

        if(!requestedPort) {
            throw new HttpError('item-not-found', 404);
        }

        res
            .json(requestedPort); 
            
    } catch(e) {
        return next(e);
    }

}

module.exports = getPort;
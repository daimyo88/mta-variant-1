const Ship = require('../../models/ship');
const User = require('../../models/user');
const HttpError = require('../../utils/http-error');
const mongoose = require('mongoose');
require('dotenv').config();

const updateShip = async (req, res, next) => {
    try {   
        const { 
            shipName,
            dwt, 
            shipLength, 
            shipCategory,
            shipWidth,
            shipVolume,
            productGroup,
            coated,
            piping,
            heated,
            shipProfile,
            flag,
            tanksQuantity
        } = req.body;
        
        const shipId = req.params.sid;
        const requestedShip = await Ship.findById(shipId);
        
        if(!requestedShip) {
            throw new new HttpError('item-not-found', 404);
        }

        requestedShip.title = shipName;
        requestedShip.dwt = dwt;
        requestedShip.shipLength = shipLength;
        requestedShip.shipCategory = shipCategory;
        requestedShip.shipWidth = shipWidth;
        requestedShip.shipVolume = shipVolume;
        requestedShip.productGroup = productGroup;
        requestedShip.coated = coated;
        requestedShip.piping = piping;
        requestedShip.heated = heated;
        requestedShip.shipProfile = shipProfile;
        requestedShip.flag = flag;
        requestedShip.tanksQuantity = tanksQuantity;

        const sess = await mongoose.startSession();
        await requestedShip.save(); 
        res.json({ successMessage: 'info-updated' });
      
    } catch(err) {
        return next(err);
    }
}

module.exports = updateShip;
const PortArea = require('../../models/region');
const HttpError = require('../../utils/http-error');
const mongoose = require('mongoose');
require('dotenv').config();

const updateLocation = async (req, res, next) => {
    try {   
        const { title } = req.body;
        const portAreaId = req.params.pid;
        const requestedPortArea = await PortArea.findById(portAreaId);
        
        if(!requestedPortArea) {
            throw new HttpError('item-not-found', 404);
        }

        const existingPortArea = await PortArea.findOne({title: title});

        if(existingPortArea) {
            throw new HttpError('location-exists', 422);
        }

        requestedPortArea.title = title;

        await requestedPortArea.save(); 

        res.json({ successMessage: 'info-updated' });
      
    } catch(err) {
        console.log(err) 
        return next(err);
    }
}

module.exports = updateLocation;
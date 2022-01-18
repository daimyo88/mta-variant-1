const Port = require('../../models/city');
const PortArea = require('../../models/region');
const HttpError = require('../../utils/http-error');
const mongoose = require('mongoose');
require('dotenv').config();

const updateLocation = async (req, res, next) => {
    try {   
        const { title, portArea } = req.body;
        let oldPortArea, newPortArea;
        const portId = req.params.pid;
        const requestedPort = await Port.findById(portId);
        
        if(!requestedPort) {
            throw new HttpError('item-not-found', 404);
        }

        const existingPort = await Port.findOne({title: title});

        if(existingPort) {
            throw new HttpError('location-exists', 422);
        }

        const oldPortAreaId = requestedPort.portArea.toString();

        requestedPort.title = title;

        if(oldPortAreaId !== portArea) {
            oldPortArea = await PortArea.findById(oldPortAreaId);
            newPortArea = await PortArea.findById(portArea);

            if(!oldPortArea || !newPortArea) {
                throw new new HttpError('item-not-found', 404);
            }
            requestedPort.portArea = portArea;
        }

        const sess = await mongoose.startSession();
        sess.startTransaction();

        if(oldPortAreaId !== portArea) {
            oldPortArea.ports.pull(requestedPort);
            newPortArea.ports.push(requestedPort);
            await oldPortArea.save({ session: sess });
            await newPortArea.save({ session: sess });
        }

        await requestedPort.save({ session: sess }); 

        await sess.commitTransaction();

        res.json({ successMessage: 'info-updated' });
      
    } catch(err) {
        console.log(err) 
        return next(err);
    }
}

module.exports = updateLocation;
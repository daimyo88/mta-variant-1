const createRegion = require('./createRegion');
const createCity = require('./createCity');
const populateLocations = require('./populateLocations');
const getLocations = require('./getLocations');
const deleteRegion = require('./deleteRegion');
const deleteCity = require('./deleteCity');
const getCity = require('./getCity');
const getRegion = require('./getRegion');
const updateCity = require('./updateCity');
const updateRegion = require('./updateRegion');

const controller = {
    createRegion,
    createCity,
    populateLocations,
    getLocations,
    getCity,
    getRegion,
    deleteRegion,
    deleteCity,
    updateCity,
    updateRegion
}

module.exports = controller;
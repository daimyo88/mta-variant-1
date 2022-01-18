const createShip = require('./createShip');
const getShips = require('./getShips');
const deleteShip = require('./deleteShip');
const getShip = require('./getShip');
const updateShip = require('./updateShip');

const shipsController = {
    createShip,
    getShips,
    getShip,
    deleteShip,
    updateShip
}

module.exports = shipsController;
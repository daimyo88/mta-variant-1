const createTransport = require('./createTransport');
const getTransports = require('./getTransports');
const deleteTransport = require('./deleteTransport');
const getTransport = require('./getTransport');
const updateTransport = require('./updateTransport');

const controller = {
    createTransport,
    getTransports,
    deleteTransport,
    getTransport,
    updateTransport
}

module.exports = controller;
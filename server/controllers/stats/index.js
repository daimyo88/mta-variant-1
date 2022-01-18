const spotMarketFreightPrice = require('./spot-market-freight-price');
const timeCharterRentPrice = require('./time-charter-rent-price');
const productGroupsRatio = require('./product-groups-ratio');

const controller = {
    spotMarketFreightPrice,
    timeCharterRentPrice,
    productGroupsRatio
}

module.exports = controller;
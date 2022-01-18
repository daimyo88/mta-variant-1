const express = require('express');
const checkToken = require('../middleware/check-token');
const controller = require('../controllers/stats');

const router = express.Router();

router.get('/spot-market-freight-price',
    checkToken,
    controller.spotMarketFreightPrice);

router.get('/time-charter-rent-price',
    checkToken,
    controller.timeCharterRentPrice);

router.get('/product-groups-ratio',
    checkToken,
    controller.productGroupsRatio);

module.exports = router;
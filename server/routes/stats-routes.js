const express = require('express');
const checkToken = require('../middleware/check-token');
const controller = require('../controllers/stats');

const router = express.Router();

router.get('/freight-price',
    checkToken,
    controller.freightPrice);

router.get('/product-groups-ratio',
    checkToken,
    controller.productGroupsRatio);

module.exports = router;
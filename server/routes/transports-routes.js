const express = require('express');
const { check } = require('express-validator');
const checkToken = require('../middleware/check-token');
const checkCanManageShip = require('../middleware/check-can-manage-ship');
const validateInputs = require('../middleware/validate-inputs');
const controller = require('../controllers/transports');

const router = express.Router();

router.get('/',
    checkToken,
    controller.getTransports);

router.get('/:sid',
    checkToken,
    checkCanManageShip,
    controller.getTransport);
    
router.post('/', 
    checkToken,
    check('shipName')
        .not()
        .isEmpty(),
    check('dwt')
        .not()
        .isEmpty(),
    check('shipLength')
        .not()
        .isEmpty(),
    check('shipCategory')
        .not()
        .isEmpty(),
    validateInputs,
    controller.createTransport);

router.patch('/:sid', 
    checkToken,
    checkCanManageShip,
    check('shipName')
        .not()
        .isEmpty(),
    check('dwt')
        .not()
        .isEmpty(),
    check('shipLength')
        .not()
        .isEmpty(),
    check('shipCategory')
        .not()
        .isEmpty(),
    validateInputs,
    controller.updateTransport);

router.post('/delete',
    checkToken,
    checkCanManageShip,
    controller.deleteTransport);

module.exports = router;
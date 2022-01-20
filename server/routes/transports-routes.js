const express = require('express');
const { check } = require('express-validator');
const checkToken = require('../middleware/check-token');
const checkCanManageTransport = require('../middleware/check-can-manage-transport');
const validateInputs = require('../middleware/validate-inputs');
const controller = require('../controllers/transports');

const router = express.Router();

router.get('/',
    checkToken,
    controller.getTransports);

router.get('/:sid',
    checkToken,
    checkCanManageTransport,
    controller.getTransport);
    
router.post('/', 
    checkToken,
    check('model')
        .not()
        .isEmpty(),
    check('category')
        .not()
        .isEmpty(),
    check('maxWeight')
        .not()
        .isEmpty(),
    check('volume')
        .not()
        .isEmpty(),
    check('height')
        .not()
        .isEmpty(),
    validateInputs,
    controller.createTransport);

router.patch('/:sid', 
    checkToken,
    checkCanManageTransport,
    check('model')
        .not()
        .isEmpty(),
    check('category')
        .not()
        .isEmpty(),
    check('maxWeight')
        .not()
        .isEmpty(),
    check('volume')
        .not()
        .isEmpty(),
    check('height')
        .not()
        .isEmpty(),
    validateInputs,
    controller.updateTransport);

router.post('/delete',
    checkToken,
    checkCanManageTransport,
    controller.deleteTransport);

module.exports = router;
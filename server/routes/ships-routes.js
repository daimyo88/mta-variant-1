const express = require('express');
const { check } = require('express-validator');
const checkToken = require('../middleware/check-token');
const checkCanManageShip = require('../middleware/check-can-manage-ship');
const validateInputs = require('../middleware/validate-inputs');
const shipsController = require('../controllers/ships');

const router = express.Router();

router.get('/',
    checkToken,
    shipsController.getShips);

router.get('/:sid',
    checkToken,
    checkCanManageShip,
    shipsController.getShip);
    
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
    shipsController.createShip);

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
    shipsController.updateShip);

router.post('/delete',
    checkToken,
    checkCanManageShip,
    shipsController.deleteShip);

module.exports = router;
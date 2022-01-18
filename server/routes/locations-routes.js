const express = require('express');
const { check } = require('express-validator');
const checkToken = require('../middleware/check-token');
const checkAdmin = require('../middleware/check-admin');
const validateInputs = require('../middleware/validate-inputs');
const locationsController = require('../controllers/locations');

const router = express.Router();

router.get('/',
    checkToken,
    checkAdmin, 
    locationsController.getLocations);

router.get('/regions',
    checkToken,
    locationsController.populateLocations);

router.get('/cities/:pid',
    checkToken,
    checkAdmin,
    locationsController.getCity);

router.get('/regions/:pid',
    checkToken,
    checkAdmin,
    locationsController.getRegion);
    
router.post('/region', 
    checkToken,
    checkAdmin, 
    check('name')
        .not()
        .isEmpty(),
    validateInputs,
    locationsController.createRegion);

router.post('/city', 
    checkToken,
    checkAdmin, 
    check('name')
        .not()
        .isEmpty(),
    check('region')
        .not()
        .isEmpty(),
    validateInputs,
    locationsController.createCity); 

router.patch('/cities/:pid', 
    checkToken,
    checkAdmin,
    check('name')
        .not()
        .isEmpty(),
    check('region')
        .not()
        .isEmpty(),
    validateInputs,
    locationsController.updateCity);

router.patch('/regions/:pid', 
    checkToken,
    checkAdmin,
    check('name')
        .not()
        .isEmpty(),
    validateInputs,
    locationsController.updateRegion);

router.post('/regions/delete',
    checkToken,
    checkAdmin,
    locationsController.deleteRegion);

router.post('/cities/delete',
    checkToken,
    checkAdmin,
    locationsController.deleteCity);

module.exports = router;
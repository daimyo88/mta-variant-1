const express = require('express');
const { check } = require('express-validator');
const checkToken = require('../middleware/check-token');
const checkAdmin = require('../middleware/check-admin');
const checkCanManageUser = require('../middleware/check-can-manage-user');
const validateInputs = require('../middleware/validate-inputs');
const userController = require('../controllers/users');

const router = express.Router();

router.get('/profile/:uid',
    checkToken,
    checkCanManageUser,
    userController.getUser);

router.patch('/change-email', userController.changeEmail);

router.post('/delete',
    checkToken,
    checkAdmin,
    userController.deleteUser);

router.get('/',
    checkToken,
    checkAdmin,
    userController.getUsers);

router.get('/populate',
    checkToken,
    userController.populateUsers);

router.post('/profile', 
    checkToken,
    checkAdmin,
    check('email')
        .not()
        .isEmpty()
        .isEmail(),
    check('role')
        .not()
        .isEmpty()
        .isString(),
    validateInputs,
    userController.createUser);

router.patch('/profile/:uid',
   checkToken,
   checkCanManageUser,
   [
    check('firstName')
       .not()
       .isEmpty()
       .isString(),
    check('lastName')
       .not()
       .isEmpty()
       .isString(),
    check('email')
       .not()
       .isEmpty()
       .isEmail(),
    check('role')
       .not()
       .isEmpty()
       .isString(),
  ],
   validateInputs,
   userController.updateUserProfile);

router.patch('/profile/update-password/:uid',
  checkToken,
  checkCanManageUser,
   [
    check('newPassword')
      .not()
      .isEmpty()
      .isString(),
    check('newPasswordRepeat')
      .not()
      .isEmpty()
      .isString()
      .custom((value,{req, loc, path}) => {
         if (value !== req.body.newPassword) {
             throw new Error("passwords-should-match");
         } else {
             return value;
         }
     })
  ],
  validateInputs,
   userController.updatePassword);

router.post('/profile/complete',
   [
    check('firstName')
       .not()
       .isEmpty()
       .isString(),
    check('lastName')
       .not()
       .isEmpty()
       .isString(),
    check('privacyPolicyConsent')
        .equals('true'),
    check('password')
      .not()
      .isEmpty()
      .isString(),
    check('repeatPassword')
      .not()
      .isEmpty()
      .isString()
      .custom((value,{req, loc, path}) => {
         if (value !== req.body.password) {
             throw new Error("passwords-should-match");
         } else {
             return value;
         }
     })
  ],
   validateInputs,
   userController.completeProfile);

module.exports = router;
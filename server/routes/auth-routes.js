const express = require('express');
const { check } = require('express-validator');
const validateInputs = require('../middleware/validate-inputs');
const authController = require('../controllers/auth');
const router = express.Router();


router.post(
  '/login',
  [
    check('email')
      .isEmail(),
    check('password').isLength({ min: 8, max: 16 })
  ],
  validateInputs,
  authController.login
);

// router.post(
//   '/login2fa',
//   [
//     check('auth2fCode')
//       .not()
//       .isEmpty()
//   ],
//   valadateInputs,
//   authController.login2fa
// );

router.post('/logout', authController.logout);

router.get('/autologin', authController.autoLogin );

router.post('/forgot-password', authController.forgotPassword );

router.post('/check-email-url-token', authController.checkEmailUrlToken );

router.post('/check-reset-password-token', authController.checkResetPasswordToken );

router.post('/reset-password',
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
  authController.resetPassword);
 

module.exports = router;
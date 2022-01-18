 const login = require('./login');
// const login2fa = require('./login2fa');
const autoLogin = require('./autoLogin');
const logout = require('./logout');
const checkEmailUrlToken = require('./checkEmailUrlToken');
const forgotPassword = require('./forgotPassword');
const resetPassword = require('./resetPassword');
const checkResetPasswordToken = require('./checkResetPasswordToken');

const authController = {
     login,
    // login2fa,
     autoLogin,
     logout,
    checkEmailUrlToken,
    forgotPassword,
    resetPassword,
    checkResetPasswordToken
}

module.exports = authController;
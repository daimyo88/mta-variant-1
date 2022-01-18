const getUser = require('./getUser');
const updateUserProfile = require('./updateInfo');
const createUser = require('./createUser');
const completeProfile = require('./completeProfile');
const getUsers = require('./getUsers');
const changeEmail = require('./changeEmail');
const deleteUser = require('./deleteUser');
const updatePassword = require('./updatePassword');
const populateUsers = require('./populateUsers');

const userController = {
    createUser,
    completeProfile,
    getUser,
    updateUserProfile,
    getUsers,
    changeEmail,
    deleteUser,
    updatePassword,
    populateUsers
}

module.exports = userController;
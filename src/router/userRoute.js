const userRoute = require('express').Router();
const userRegister = require('../controllers/User/userRegister');
const getUserById = require('../controllers/User/getUserById');
const deleteUser = require('../controllers/User/deleteUser');
const updateUser = require('../controllers/User/updateUser');
const getAllUsers = require('../controllers/User/getAllUsers');
const userLogin = require('../controllers/User/userLogin');
const userRequestRecoveryPassword = require('../controllers/ResetPassword/userRequest');
const userResetPassword = require('../controllers/ResetPassword/userReset');

userRoute.get('/', getAllUsers);
userRoute.post('/login', userLogin);
userRoute.post('/request-recovery-password', userRequestRecoveryPassword);
userRoute.post('/reset-password', userResetPassword);
userRoute.post('/register', userRegister);
userRoute.get('/:id', getUserById);
userRoute.patch('/delete/:id', deleteUser);
userRoute.patch('/update/:id', updateUser);

module.exports = userRoute;

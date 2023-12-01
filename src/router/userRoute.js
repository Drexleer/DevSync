const userRoute = require('express').Router();
const userRegister = require('../controllers/User/userRegister');
const getUserById = require('../controllers/User/getUserById');
const deleteUser = require('../controllers/User/deleteUser');
const updateUser = require('../controllers/User/updateUser');
const getAllUsers = require('../controllers/User/getAllUsers');
const userLogin = require('../controllers/User/userLogin');

userRoute.get('/', getAllUsers);
userRoute.post('/login', userLogin);
userRoute.post('/register', userRegister);
userRoute.get('/:id', getUserById);
userRoute.patch('/delete/:id', deleteUser);
userRoute.patch('/update/:id', updateUser);

module.exports = userRoute;

const userRoute = require('express').Router();
const userRegister = require('../controllers/User/userRegister');

userRoute.post('/register', userRegister);

module.exports = userRoute;

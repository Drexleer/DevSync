const router = require('express').Router();
const contactRoute = require('./contactRoute');
const proyectRoute = require('./proyectRoute');
const userRoute = require('./userRoute');

router.use('/user', userRoute);

router.use('/contact', contactRoute);

router.use('/proyect', proyectRoute);

module.exports = router;

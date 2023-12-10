const router = require('express').Router();
const contactRoute = require('./contactRoute');
const ProjectRoute = require('./projectRoute');
const filtersRoute = require('./filtersRoute');
const userRoute = require('./userRoute');

router.use('/user', userRoute);

router.use('/contact', contactRoute);

router.use('/Project', ProjectRoute);

router.use('/filters', filtersRoute);

module.exports = router;

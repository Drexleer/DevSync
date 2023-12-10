const filtersRoute = require('express').Router();
const filtersCombined = require('../controllers/Filters/filtersCombined');

filtersRoute.get('/apply', filtersCombined);

module.exports = filtersRoute;

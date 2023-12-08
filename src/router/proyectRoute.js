const proyectRoute = require("express").Router();
const createdProyect = require("../controllers/Proyects/createProyect");

proyectRoute.post("/create", createdProyect);

module.exports = proyectRoute;

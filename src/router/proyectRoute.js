const proyectRoute = require("express").Router();
const createdProyect = require("../controllers/Proyects/createProyect");
const getAllProyects = require("../controllers/Proyects/getAllProyects");
const proyectById = require("../controllers/Proyects/proyectById");

proyectRoute.post("/create", createdProyect);
proyectRoute.get("/", getAllProyects);
proyectRoute.get("/:id", proyectById);

module.exports = proyectRoute;

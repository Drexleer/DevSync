const proyectRoute = require("express").Router();
const createdProyect = require("../controllers/Proyects/createProyect");
const deleteUserProyect = require("../controllers/Proyects/deleteUserProyect");
const getAllProyects = require("../controllers/Proyects/getAllProyects");
const proyectById = require("../controllers/Proyects/proyectById");
const registerProyect = require("../controllers/Proyects/registerProyect");

proyectRoute.post("/create", createdProyect);
proyectRoute.get("/", getAllProyects);
proyectRoute.get("/:id", proyectById);
proyectRoute.post("/register", registerProyect);
proyectRoute.post("/deleteUser", deleteUserProyect);

module.exports = proyectRoute;

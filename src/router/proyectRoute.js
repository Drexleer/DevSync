const proyectRoute = require("express").Router();
const createdProyect = require("../controllers/Proyects/createProyect");
const deleteProyect = require("../controllers/Proyects/deleteProyect");
const deleteUserProyect = require("../controllers/Proyects/deleteUserProyect");
const getAllProyects = require("../controllers/Proyects/getAllProyects");
const proyectById = require("../controllers/Proyects/proyectById");
const registerProyect = require("../controllers/Proyects/registerProyect");

proyectRoute.post("/create", createdProyect);
proyectRoute.get("/", getAllProyects);
proyectRoute.get("/:id", proyectById);
proyectRoute.post("/register", registerProyect);
proyectRoute.post("/deleteUser", deleteUserProyect);
proyectRoute.delete("/deleteProyect/:id", deleteProyect);

module.exports = proyectRoute;

const adminRoute = require("express").Router();
const registerAdmin = require("../controllers/Admin/registerAdmin");

adminRoute.post("/register", registerAdmin);

module.exports = adminRoute;

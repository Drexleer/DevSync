const contactRoute = require("express").Router();
const { newContact } = require("../controllers/Contact/contact");

contactRoute.post("/message", newContact);

module.exports = contactRoute;

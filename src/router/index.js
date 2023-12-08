const router = require("express").Router();
const contactRoute = require("./contactRoute");
const userRoute = require("./userRoute");

router.use("/user", userRoute);

router.use("/contact", contactRoute);

module.exports = router;

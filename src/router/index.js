const router = require("express").Router();
const contactRoute = require("./contactRoute");
const ProjectRoute = require("./projectRoute");
const filtersRoute = require("./filtersRoute");
const userRoute = require("./userRoute");
const adminRoute = require("./adminRoute");

router.use("/user", userRoute);

router.use("/contact", contactRoute);

router.use("/project", ProjectRoute);

router.use("/filters", filtersRoute);

router.use("/admin", adminRoute);

module.exports = router;

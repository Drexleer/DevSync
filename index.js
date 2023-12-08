const server = require("./src/app");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3001;
require("dotenv").config();
const MONGODB_URI = process.env.MONGODB;

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Error connection", err));

server.listen(PORT, () => console.log(`🌍 Connected on localhost ${PORT}`));

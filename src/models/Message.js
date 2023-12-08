const mongoose = require("mongoose");

const MessagesSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Number,
    default: Math.floor(Date.now() / 1000),
  },
});

module.exports = mongoose.model("Messages", MessagesSchema);

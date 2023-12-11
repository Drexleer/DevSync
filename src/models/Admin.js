const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  types: {
    type: String,
    default: "admin",
  },
  image: {
    type: String,
  },
});

AdminSchema.pre("save", async function (next) {
  const admin = this;

  if (!admin.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(admin.password, salt);

    admin.password = hash;
    next();
  } catch (error) {
    return next(error);
  }
});

module.exports = mongoose.model("Admin", AdminSchema);

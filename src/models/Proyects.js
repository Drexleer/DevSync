const mongoose = require("mongoose");

const proyectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  technologies: {
    type: [String],
    required: true,
  },
  image: {
    type: String,
  },
  linkProyectFront: {
    type: String,
  },
  linkProyectBack: {
    type: String,
  },
  linkProyectManagement: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    validate: {
      validator: async function (createdBy) {
        const count = await mongoose.models.Proyect.countDocuments({
          createdBy,
        });
        return count === 0;
      },
      message: "Ya existe un proyecto creado por este usuario.",
    },
  },
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      validate: {
        validator: function (participants) {
          return participants.length <= 8; // Máximo 8 participantes
        },
        message: "Máximo 8 participantes permitidos.",
      },
    },
  ],
});

module.exports = mongoose.model("Proyect", proyectSchema);

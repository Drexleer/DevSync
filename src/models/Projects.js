const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
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
    // Cambiado a un objeto con propiedades para cada tecnología
    HTML: { type: Boolean, default: false },
    CSS: { type: Boolean, default: false },
    JavaScript: { type: Boolean, default: false },
    NodeJS: { type: Boolean, default: false },
    React: { type: Boolean, default: false },
  },
  image: {
    type: String,
  },
  state: {
    type: String,
    default: "toDo",
  },
  linkProjectFront: {
    type: String,
  },
  linkProjectBack: {
    type: String,
  },
  linkProjectManagement: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async function (createdBy) {
        const count = await mongoose.models.Project.countDocuments({
          createdBy,
        });
        return count === 0;
      },
      message: 'Ya existe un proyecto creado por este usuario.',
    },
  },
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      validate: {
        validator: function (participants) {
          return participants.length <= 8; // Máximo 8 participantes
        },
        message: 'Máximo 8 participantes permitidos.',
      },
    },
  ],
});

module.exports = mongoose.model('Project', ProjectSchema);

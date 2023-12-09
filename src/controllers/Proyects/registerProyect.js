const Proyect = require("../../models/Proyects");

const registerProyect = async (req, res) => {
  const { proyectId, participantsId } = req.body;

  try {
    const createByFound = await Proyect.findById(proyectId)
      .populate("createdBy")
      .populate("participants")
      .exec();

    // Pasa de ObjectId a String para validar si es el creador del Proyecto
    const createByObjectId = createByFound.createdBy._id.toString();

    if (createByObjectId === participantsId) {
      return res
        .status(200)
        .json({ message: "El usuario es el creador del Proyecto" });
    }

    const participantsObjectId = createByFound.participants.find(
      (participant) => participant._id.toString() === participantsId
    );

    if (participantsObjectId) {
      return res
        .status(200)
        .json({
          message:
            "El usuario ya esta registrado como participante del pryecto",
        });
    }

    const newRegister = await Proyect.findByIdAndUpdate(
      proyectId,
      { $push: { participants: participantsId } },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "El usuario fue registrado al proyecto", newRegister });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = registerProyect;

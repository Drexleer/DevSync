const Proyect = require("../../models/Proyects");

const deleteUserProyect = async (req, res) => {
  const { proyectId, participantsId } = req.body;

  try {
    const createByFound = await Proyect.findById(proyectId)
      .populate("createdBy")
      .populate("participants")
      .exec();

    const createByObjectId = createByFound.createdBy._id.toString();

    if (createByObjectId === participantsId) {
      return res.status(200).json({
        message:
          "El usuario es el creador del Proyecto no puede ser borrado del proyecto",
      });
    }

    const participantsObjectId = createByFound.participants.filter(
      (participant) => participant._id.toString() !== participantsId
    );

    if (participantsObjectId.length === createByFound.participants.length) {
      return res.status(404).json({ message: "El usuario no se encontro" });
    }

    const deleteUser = await Proyect.findByIdAndUpdate(
      proyectId,
      { participants: participantsObjectId },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "El usuario ha sido borrado del proyecto", deleteUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = deleteUserProyect;

const Proyect = require("../../models/Proyects");

const proyectById = async (req, res) => {
  const { id } = req.params;

  try {
    const proyectFound = await Proyect.findById(id)
      .populate("createdBy")
      .populate("participants")
      .exec();

    if (!proyectFound) {
      return res.status(404).json({ message: "Proyecto no encontrado" });
    }

    res.status(200).json(proyectFound);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = proyectById;

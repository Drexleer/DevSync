const Proyect = require("../../models/Proyects");

const deleteProyect = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteProyect = await Proyect.findByIdAndDelete(id);

    res.status(200).json({ message: "El proyecto ha sido eliminado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = deleteProyect;

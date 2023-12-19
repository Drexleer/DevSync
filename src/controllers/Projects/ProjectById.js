const Project = require("../../models/Projects");

const projectById = async (req, res) => {
  const { id } = req.params;

  try {
    const projectFound = await Project.findById(id)
      .populate("createdBy")
      .populate("participants")
      .exec();

    if (!projectFound) {
      return res.status(404).json({ message: "Proyecto no encontrado" });
    }

    res.status(200).json(projectFound);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = projectById;

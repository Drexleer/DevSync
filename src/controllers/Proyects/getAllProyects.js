const Proyect = require("../../models/Proyects");

const getAllProyects = async (req, res) => {
  try {
    const allProyects = await Proyect.find()
      .populate("createdBy")
      .populate("participants")
      .exec();

    res.status(200).json(allProyects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getAllProyects;

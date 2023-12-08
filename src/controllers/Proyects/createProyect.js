const Proyect = require("../../models/Proyects");
const uploadImage = require("../../utils/Cloudinary");

const createdProyect = async (req, res) => {
  const {
    name,
    description,
    technologies,
    linkProyectFront,
    linkProyectBack,
    createdBy,
  } = req.body;

  try {
    const result = await uploadImage(req.files.image.tempFilePath);

    const proyectFound = await Proyect.findOne({ name });

    if (proyectFound) {
      return res
        .status(400)
        .json({ message: "El nombre del proyecto ya esta siendo utilizado" });
    }

    const newProyect = await Proyect.create({
      name,
      description,
      technologies,
      linkProyectBack,
      linkProyectFront,
      image: result.secure_url,
      createdBy,
    });

    res.status(201).json({ message: "Proyecto creado con exito", newProyect });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = createdProyect;
const Project = require("../../models/Projects");
const uploadImage = require("../../utils/Cloudinary");

const updateProject = async (req, res) => {
  const { name, description, technologies, active, projectId } = req.body;

  try {
    const result = await uploadImage(req.files.image.tempFilePath);

    const newUpdate = await Project.findByIdAndUpdate(
      projectId,
      {
        name,
        description,
        technologies,
        image: result.secure_url,
        active,
      },
      { new: true }
    );

    res.status(200).json({ message: "El proyecto se actualizo", newUpdate });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = updateProject;

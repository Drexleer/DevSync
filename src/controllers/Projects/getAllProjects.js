const Project = require('../../models/Projects');

const getAllProjects = async (req, res) => {
  try {
    const allProjects = await Project.find()
      .populate('createdBy')
      .populate('participants')
      .exec();

    res.status(200).json(allProjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getAllProjects;

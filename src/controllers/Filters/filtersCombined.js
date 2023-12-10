const Project = require('../../models/Projects');

const filtersCombined = async (req, res) => {
  try {
    const technologiesObj = req.query;

    // Filtra las tecnologías que tienen un valor de true
    const selectedTechnologies = Object.entries(technologiesObj)
      .filter(([key, value]) => value === 'true')
      .map(([key]) => key);

    // Construye la consulta dinámicamente
    const query =
      selectedTechnologies.length > 0
        ? {
            $and: selectedTechnologies.map((tech) => ({
              [`technologies.${tech}`]: true,
            })),
          }
        : {};

    const projects = await Project.find(query);
    res.status(200).json(projects);
  } catch (error) {
    console.error('Error al obtener los proyectos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = filtersCombined;

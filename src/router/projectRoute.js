const ProjectRoute = require("express").Router();
const createdProject = require("../controllers/Projects/createProject");
const deleteProject = require("../controllers/Projects/deleteProject");
const deleteUserProject = require("../controllers/Projects/deleteUserProject");
const getAllProjects = require("../controllers/Projects/getAllProjects");
const ProjectById = require("../controllers/Projects/ProjectById");
const registerProject = require("../controllers/Projects/registerProject");
const filtersCombined = require("../controllers/Filters/filtersCombined");
const inviteCollaborator = require("../controllers/Projects/inviteCollaboratorProject");
const updateProject = require("../controllers/Projects/updateProject");

ProjectRoute.get("/", getAllProjects);
ProjectRoute.post("/create", createdProject);
ProjectRoute.get("/:id", ProjectById);
ProjectRoute.get("/filters", filtersCombined);
ProjectRoute.post("/register", registerProject);
ProjectRoute.post("/deleteUser", deleteUserProject);
ProjectRoute.delete("/deleteProject/:id", deleteProject);
ProjectRoute.post("/invite", inviteCollaborator);
ProjectRoute.patch("/update", updateProject);

module.exports = ProjectRoute;

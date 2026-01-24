import Project from "../models/Project.js";

// @desc    Get all projects
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({});
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Create a project
export const createProject = async (req, res) => {
  try {
    const { title, price, description, technologies } = req.body;
    const project = new Project({ title, price, description, technologies });
    const createdProject = await project.save();
    res.status(201).json(createdProject);
  } catch (error) {
    res.status(400).json({ message: "Invalid project data" });
  }
};

// @desc    Update a project
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (project) {
      project.title = req.body.title || project.title;
      project.price = req.body.price || project.price;
      project.description = req.body.description || project.description;
      project.technologies = req.body.technologies || project.technologies;

      const updatedProject = await project.save();
      res.json(updatedProject);
    } else {
      res.status(404).json({ message: "Project not found" });
    }
  } catch (error) {
    res.status(400).json({ message: "Update failed" });
  }
};

// @desc    Delete a project
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (project) {
      await project.deleteOne(); // This removes it from MongoDB
      res.json({ message: "Project removed successfully" });
    } else {
      res.status(404).json({ message: "Project not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};
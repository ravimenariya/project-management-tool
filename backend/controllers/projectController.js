const Project = require('../models/Project');
const User = require('../models/User');

// Create a project
const createProject = async (req, res) => {
    try {
        console.log('in create project', req.body);
        const { name, description, members, userid } = req.body;
        const user = await User.findById(userid);
        members.push(user.email);
        console.log(user);
        console.log(members); // everything is right till this line
        const project = new Project({ name, description, createdBy: user.email, members }); // after this this line nothing is getting executed and an error is thrown
        await project.save();
        console.log('user finded for adding project', user);
        user.projects = [...user.projects, project._id];
        await user.save();
        console.log('user updated', user);
        res.status(201).json('Project created successfully');
    } catch (error) {
        res.status(500).json({ message: 'Failed to create project', error: error.message });
    }
};

// Get all projects
const getAllProjects = async (req, res) => {
    try {
        const userid = req.baseUrl.split('/')[1];
        // console.log('printing user id in project controller ', userid);
        const userdata = await User.findById(userid);
        if (!userdata) {
            return res.status(404).json({ message: 'User not found' });
        }
        // console.log('user projects', userdata.projects);
        const projects = await Promise.all(userdata.projects.map(async (id) => {
            const project = await Project.findById(id);
            return project;
        }));
        // console.log('projects in backend', projects);

        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch projects', error: error.message });
    }
};


// Update a project
const updateProject = async (req, res) => {
    try {
        // console.log('in update project backend', req.params, req.body);
        const { id } = req.params;
        const { name, description, members } = req.body.updatedData;
        const project = await Project.findByIdAndUpdate(id, { name: name, description: description, members: members }, { new: true });
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        project.save();
        // console.log('updated project', project);
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update project', error: error.message });
    }
};

// Delete a project
const deleteProject = async (req, res) => {
    try {
        const userid = req.baseUrl.split('/')[1];
        const { id } = req.params;
        const user = await User.findById(userid);
        let newprojects = user.projects.filter((projectid) => projectid != id);
        user.projects = [...newprojects];
        user.save();
        const project = await Project.findByIdAndDelete(id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete project', error: error.message });
    }
};

module.exports = { createProject, getAllProjects, updateProject, deleteProject };

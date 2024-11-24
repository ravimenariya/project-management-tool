const Task = require('../models/Task');
const Project = require('../models/Project')
const mongoose = require('mongoose')

// Create a task
const createTask = async (req, res) => {
    try {
        console.log('Received request:', req.body);

        const { formdata, projectid } = req.body;

        const { title, description, assignedTo, deadline } = formdata;

        const task = new Task({ title, description, assignedTo, deadline, projectId: projectid });
        await task.save();
        console.log('Task saved:', task);

        const project = await Project.findById(projectid);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        console.log('project', project);
        project.tasks = [...project.tasks, task._id];
        console.log('task id', task._id)
        await project.save();
        console.log('Project updated:', project);

        res.status(201).json({ project });
    } catch (error) {
        console.error('Error in createTask:', error);
        res.status(500).json({ message: 'Failed to create task', error: error.message });
    }
};


// Get tasks for a project
const getTasksByProject = async (req, res) => {
    try {
        const taskarr = req.body;

        const tasks = await Promise.all(
            taskarr.map(async (task) => {
                const taskDoc = await Task.findById(task);
                return taskDoc;
            })
        );

        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch tasks', error: error.message });
    }
};

// Delete a task
const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const projectid = req.baseUrl.split('/')[1];
        const project = await Project.findById(projectid);
        console.log('in backend', project);
        // const task = await Task.findByIdAndDelete(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete task', error: error.message });
    }
};

module.exports = { createTask, getTasksByProject, deleteTask };

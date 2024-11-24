const express = require('express');
const { createProject, getAllProjects, updateProject, deleteProject } = require('../controllers/projectController');

const router = express.Router();

// POST - Create a new project for a user
router.post('/create', createProject);

// GET - Get all projects for a specific user
router.get('/', getAllProjects);

// PUT - Update a specific project by ID
router.put('/:id', updateProject);

// DELETE - Delete a specific project by ID
router.delete('/:id', deleteProject);

module.exports = router;

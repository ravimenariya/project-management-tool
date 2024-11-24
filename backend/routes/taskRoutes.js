const express = require('express');
const { createTask, getTasksByProject, deleteTask } = require('../controllers/taskController');

const router = express.Router();

router.post('/create', createTask);
router.post('/', getTasksByProject);
router.delete('/:id', deleteTask);

module.exports = router;

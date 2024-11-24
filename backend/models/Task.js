const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    assignedTo: { type: String },
    projectId: { type: String },
    status: { type: String, enum: ['Pending', 'Rejected', 'Completed'], default: 'Pending' },
    deadline: { type: Date },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Task', TaskSchema);

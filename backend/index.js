const express = require('express');
const cors = require('cors');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Define route for projects, with `userid` as a dynamic parameter
app.use('/:userid/projects', projectRoutes); // Correct route to pass userId
app.use('/api/auth', authRoutes);
app.use('/:projectid/task', taskRoutes);
app.use('/', (req, res) => {
    res.send("Home page");
});

module.exports = app;

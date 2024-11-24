const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt');
require('dotenv').config();

exports.register = async (req, res) => {
    try {
        console.log('in backend register');
        const { name, email, password } = req.body;
        const finduser = await User.findOne({ email });
        if (finduser) return res.status(404).json({ error: 'User already Registered' });

        const user = new User({ name, email, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {

        console.log('in backend login');
        const { email, password } = req.body;

        // Fetch the user by email
        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found with email:', email);
            return res.status(404).json({ error: 'User not found' });
        }

        console.log('Stored hashed password:', user.password);
        console.log('Plain-text password:', password);

        // Compare the passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Password mismatch');
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        console.error('Error in login:', error);
        res.status(400).json({ error: error.message });
    }
};


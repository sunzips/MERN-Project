const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// @route   POST api/auth/register
// @desc    Register a new user
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'User already exists' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            name,
            email,
            password: hashedPassword,
            role: 'user' // Default role
        });

        await user.save();

        const payload = { id: user._id, role: user.role };
        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '15m' }
        );
        const refreshToken = jwt.sign(
            payload,
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '7d' }
        );
        res.json({ token, refreshToken, role: user.role, name: user.name });
    } catch (error) {
        console.error('Register Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   POST api/auth/login
// @desc    Authenticate user & get token
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid Credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid Credentials' });

        const payload = {
            id: user._id,
            role: user.role
        };

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '15m' }
        );
        const refreshToken = jwt.sign(
            payload,
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '7d' }
        );
        res.json({ token, refreshToken, role: user.role, name: user.name });
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});
// @route   POST api/auth/refresh
// @desc    Refresh access token
router.post('/refresh', async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(401).json({ message: 'No refresh token' });

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET || 'secret');
        const payload = { id: decoded.id, role: decoded.role };
        const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '15m' });
        res.json({ token });
    } catch (error) {
        res.status(401).json({ message: 'Invalid refresh token' });
    }
});

// @route   POST api/auth/logout
// @desc    Logout user
router.post('/logout', (req, res) => {
    // In a real app, you might blacklist the token here
    res.json({ message: 'Logged out successfully' });
});

// Seed an admin user for testing
router.post('/seed', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash('admin123', 10);
        const admin = new User({
            name: 'Admin User',
            email: 'admin@home.com',
            password: hashedPassword,
            role: 'admin'
        });
        await admin.save();
        res.json({ message: 'Admin seeded: admin@home.com / admin123' });
    } catch (error) {
        res.status(500).json({ message: 'Seeding failed' });
    }
});

module.exports = router;

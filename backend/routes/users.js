// routes/user.js
const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Create a new user
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    let user = new User({ name });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    console.log(users);
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;


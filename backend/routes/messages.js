const express = require('express');
const Message = require('../models/Message');
const router = express.Router();

// Create a new message
router.post('/', async (req, res) => {
  try {
    const { sender, receiver, content } = req.body;
    let newMessage = new Message({ sender, receiver, content });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get messages between two users
router.get('/', async (req, res) => {
  try {
    const { user1, user2 } = req.query;
    const messages = await Message.find({
      $or: [
        { sender: user1, receiver: user2 },
        { sender: user2, receiver: user1 },
      ],
    }).sort({ timestamp: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

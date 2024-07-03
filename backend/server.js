const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const dotenv = require('dotenv');
const socketIo = require('socket.io');
const path = require('path');
const connectDB = require('./config/db');
const User = require('./models/User');
const Message = require('./models/Message');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, './.env') });

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST'],
  },
});

// Connect to the database
connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use('/users', require('./routes/users'));
app.use('/messages', require('./routes/messages'));

// Real-time communication with Socket.io
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('message', async (msg) => {
    try {
      // Ensure no `_id` field is set
      const { _id, ...messageData } = msg;
      const message = new Message(messageData);
      await message.save();
      io.emit('message', message);
    } catch (error) {
      console.error('Error saving message:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

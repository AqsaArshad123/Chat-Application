// src/components/Chat.js
import React, { useState, useEffect } from 'react';
import { Box, List, ListItem, ListItemText, TextField, IconButton, Avatar } from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:5001');

const getAvatar = (name) => {
  const firstLetter = name[0].toUpperCase();
  return firstLetter;
};

const MessageLeft = ({ message }) => (
  <ListItem sx={{ display: 'flex', justifyContent: 'flex-start' }}>
    <Avatar sx={{ marginRight: 2 }}>{getAvatar(message.sender)}</Avatar>
    <Box sx={{ backgroundColor: '#fff', borderRadius: '10px', padding: 1 }}>
      <ListItemText primary={`${message.sender}: ${message.content}`} />
    </Box>
  </ListItem>
);

const MessageRight = ({ message }) => (
  <ListItem sx={{ display: 'flex', justifyContent: 'flex-end' }}>
    <Box sx={{ backgroundColor: '#e0e0e0', borderRadius: '10px', padding: 1 }}>
      <ListItemText primary={`${message.sender}: ${message.content}`} />
    </Box>
    <Avatar sx={{ marginLeft: 2 }}>{getAvatar(message.sender)}</Avatar>
  </ListItem>
);

const Chat = ({ user, selectedUser }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    if (selectedUser) {
      axios.get(`http://localhost:5001/messages?user1=${user.name}&user2=${selectedUser.name}`)
        .then(response => {
          setMessages(response.data);
        });
    }

    socket.on('message', (message) => {
      if ((message.sender === user.name && message.receiver === selectedUser.name) ||
          (message.sender === selectedUser.name && message.receiver === user.name)) {
        setMessages(prevMessages => [...prevMessages, message]);
      }
    });

    return () => {
      socket.off('message');
    };
  }, [selectedUser]);

  const handleSendMessage = () => {
    const message = { sender: user.name, receiver: selectedUser.name, content: text };
    socket.emit('message', message);
    setText('');
  };

  return (
    <Box p={2} display="flex" flexDirection="column" height="100%">
      <Box flex={1} overflow="auto">
        <List>
          {messages.map((msg, index) => (
            msg.sender === user.name ? 
              <MessageRight key={index} message={msg} /> : 
              <MessageLeft key={index} message={msg} />
          ))}
        </List>
      </Box>
      <Box display="flex" mt={2} sx={{ backgroundColor: '#fff', borderRadius: '10px', padding: 1 }}>
        <TextField
          label="Message"
          fullWidth
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          sx={{ backgroundColor: '#fff', borderRadius: '10px' }}
        />
        <IconButton onClick={handleSendMessage} color="primary" sx={{ marginLeft: 1 }}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Chat;

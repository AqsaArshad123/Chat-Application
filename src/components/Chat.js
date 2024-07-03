import React, { useState, useEffect } from 'react';
import { Box, List, ListItem, ListItemText, TextField, Button } from '@mui/material';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:5001');

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
    <Box p={2} flex={1} display="flex" flexDirection="column">
      <Box flex={1} overflow="auto">
        <List>
          {messages.map((msg, index) => (
            <ListItem key={index}>
              <ListItemText primary={`${msg.sender}: ${msg.content}`} />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box display="flex" mt={2}>
        <TextField
          label="Message"
          fullWidth
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <Button onClick={handleSendMessage} variant="contained" color="primary" sx={{ marginLeft: 1 }}>
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default Chat;

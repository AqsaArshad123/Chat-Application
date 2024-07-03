import React, { useEffect, useState } from 'react';
import { Container, List, ListItem, ListItemText, TextField, Button, Box, Paper, Grid, Typography } from '@mui/material';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:5001');

const App = () => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [user, setUser] = useState('user1'); // For simplicity, hardcoded user
  const [selectedUser, setSelectedUser] = useState(null); // Track selected user for chat
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);
 useEffect(() => {
    
    if (selectedUser) {
      console.log(user);
      console.log(selectedUser.name);
      axios.get('http://localhost:5001/messages', {
        params: {
          user1: user,
          user2: selectedUser.name
        }
      })
      .then(response => {
        setMessages(response.data);
      })
      .catch(error => console.error('Error fetching messages:', error));
    }
  }, [selectedUser, user]);

  const handleSendMessage = () => {
    const message = { sender: user, receiver: selectedUser.name, content: text };
    axios.post('http://localhost:5001/messages', message)
      .then(response => setMessages(prevMessages => [...prevMessages, response.data]))
      .catch(error => console.error('Error sending message:', error));
    socket.emit('message', message);
    setText('');
  };

  return (
    <Container maxWidth="lg" sx={{ height: '100vh' }}>
      <Paper elevation={3} sx={{ height: '100%' }}>
        <Grid container sx={{ height: '100%' }}>
          {/* Sidebar */}
          <Grid item xs={3} sx={{ borderRight: '1px solid #ddd' }}>
            <List>
              {users.map((user, index) => (
                <ListItem 
                  key={index} 
                  button 
                  selected={selectedUser && selectedUser.name === user.name}
                  onClick={() => setSelectedUser(user)}
                >
                  <ListItemText primary={user.name} />
                </ListItem>
              ))}
            </List>
          </Grid>
          {/* Chat interface */}
          <Grid item xs={9} sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ padding: 2 }}>
              <Typography variant="h6">
                {selectedUser ? selectedUser.name : 'Select a user to chat'}
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 1, overflowY: 'auto', padding: 2 }}>
              <List>
                {messages.map((message, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={`${message.sender}: ${message.content}`} />
                  </ListItem>
                ))}
              </List>
            </Box>
            {selectedUser && (
              <Box sx={{ display: 'flex', padding: 2 }}>
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
            )}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default App;

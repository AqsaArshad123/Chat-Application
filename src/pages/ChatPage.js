// src/pages/ChatPage.js
import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Sidebar from '../components/Sidebar';
import Chat from '../components/Chat';
import axios from 'axios';

const ChatPage = ({ user }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [unreadMessages, setUnreadMessages] = useState({});

  useEffect(() => {
    axios.get('http://localhost:5001/users')
      .then(response => {
        setUsers(response.data.filter(u => u._id !== user._id));
      })
      .catch(error => console.error('Error fetching users:', error));
  }, [user]);

  useEffect(() => {
    axios.get(`http://localhost:5001/unreadMessages?user=${user.name}`)
      .then(response => {
        setUnreadMessages(response.data);
      })
      .catch(error => console.error('Error fetching unread messages:', error));
  }, [user]);

  const handleUserSelect = (selectedUser) => {
    setSelectedUser(selectedUser);
    setUnreadMessages(prevState => {
      const newState = { ...prevState };
      delete newState[selectedUser.name];
      return newState;
    });
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '100vw', backgroundColor: '#f3f3f9' }}>
      <Box sx={{ width: '300px', borderRadius: '12px', backgroundColor: '#dcdcf1', margin: 2 }}>
        <Sidebar users={users} onUserSelect={handleUserSelect} selectedUser={selectedUser} unreadMessages={unreadMessages} />
      </Box>
      {selectedUser && (
        <Box sx={{ flex: 1, border: '1px solid #ddd', borderRadius: '16px', backgroundColor: '#e6e6ff', margin: 2 }}>
          <Chat user={user} selectedUser={selectedUser} />
        </Box>
      )}
    </Box>
  );
};

export default ChatPage;

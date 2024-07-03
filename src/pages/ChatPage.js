import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Sidebar from '../components/Sidebar';
import Chat from '../components/Chat';
import axios from 'axios';

const ChatPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [user, setUser] = useState({ name: 'Alice' }); // Hardcoded user for simplicity

  useEffect(() => {
    axios.get('http://localhost:5001/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  return (
    <Box style={{ display: 'flex', height: '100vh' }}>
      <Sidebar users={users} onUserSelect={handleUserSelect} selectedUser={selectedUser} />
      {selectedUser && <Chat user={user} selectedUser={selectedUser} />}
    </Box>
  );
};

export default ChatPage;

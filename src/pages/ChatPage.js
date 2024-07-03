import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Sidebar from '../components/Sidebar';
import Chat from '../components/Chat';
import axios from 'axios';

const ChatPage = ({ user }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5001/users')
      .then(response => {
        setUsers(response.data.filter(u => u._id !== user._id));
      })
      .catch(error => console.error('Error fetching users:', error));
  }, [user]);

  const handleUserSelect = (selectedUser) => {
    setSelectedUser(selectedUser);
  };

  return (
    <Box style={{ display: 'flex', height: '100vh' }}>
      <Sidebar users={users} onUserSelect={handleUserSelect} selectedUser={selectedUser} />
      {selectedUser && <Chat user={user} selectedUser={selectedUser} />}
    </Box>
  );
};

export default ChatPage;

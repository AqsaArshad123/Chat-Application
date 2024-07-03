// src/components/Sidebar.js
import React from 'react';
import { List, ListItem, ListItemText, Avatar, Divider, Typography } from '@mui/material';

const getAvatar = (name) => {
  const firstLetter = name[0].toUpperCase();
  return firstLetter;
};

const Sidebar = ({ users, onUserSelect, selectedUser }) => {
  return (
    <div>
      <Typography variant="h6" sx={{ padding: 2, backgroundColor: '#b0b0e0', color: '#fff', borderRadius: '16px 16px 0 0' }}>
        Users
      </Typography>
      <List>
        {users.map((user, index) => (
          <React.Fragment key={index}>
            <ListItem 
              button 
              selected={selectedUser && selectedUser._id === user._id}
              onClick={() => onUserSelect(user)}
              sx={{ borderRadius: '8px', margin: '4px 8px' }}
            >
              <Avatar sx={{ marginRight: 2 }}>{getAvatar(user.name)}</Avatar>
              <ListItemText primary={user.name} />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
};

export default Sidebar;

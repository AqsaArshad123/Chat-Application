// src/components/Sidebar.js
import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

const Sidebar = ({ users, onUserSelect, selectedUser }) => {
  return (
    <div style={{ width: '250px', borderRight: '1px solid #ddd' }}>
      <List>
        {users.map((user, index) => (
          <ListItem 
            button 
            key={index} 
            selected={selectedUser && selectedUser._id === user._id}
            onClick={() => onUserSelect(user)}
          >
            <ListItemText primary={user.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Sidebar;


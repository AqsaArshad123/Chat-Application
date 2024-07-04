// src/components/Sidebar.js
import React from 'react';
import { List, ListItem, ListItemText, Avatar, Divider, Typography, Badge } from '@mui/material';
import moment from 'moment';

const getAvatar = (name) => {
  const firstLetter = name[0].toUpperCase();
  return firstLetter;
};

const Sidebar = ({ users, onUserSelect, selectedUser, unreadMessages }) => {
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
              <Badge
                color="secondary"
                variant="dot"
                invisible={!unreadMessages[user.name]}
              >
                <Avatar sx={{ marginRight: 2 }}>{getAvatar(user.name)}</Avatar>
              </Badge>
              <ListItemText
                primary={user.name}
                secondary={moment(user.lastMessageTimestamp).format('hh:mm A')}
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
};

export default Sidebar
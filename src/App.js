import React, { useEffect, useState } from 'react';
import { Container, List, ListItem, ListItemText, TextField, Button, Box, Paper, Grid, Typography } from '@mui/material';
import io from 'socket.io-client';
import axios from 'axios';
import Login from './components/Login';
import ChatPage from './pages/ChatPage';

const socket = io('http://localhost:5001');

const App = () => {
  const [user, setUser] = useState(null);

  if (!user) {
    return <Login setUser={setUser} />;
  }

  return (
    <ChatPage user={user} />
  );
};

export default App;

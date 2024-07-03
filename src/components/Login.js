import React, { useState } from 'react';
import { TextField, Button, Container, Box } from '@mui/material';
import axios from 'axios';

const Login = ({ setUser }) => {
  const [name, setName] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/users?name=${name}`);
      if (response.data.length > 0) {
        setUser(response.data[0]);
      } else {
        alert('User not found');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button onClick={handleLogin} variant="contained" color="primary" style={{ marginTop: '20px' }}>
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default Login;

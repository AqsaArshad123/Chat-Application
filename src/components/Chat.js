import React from 'react';
import { Box, Typography } from '@mui/material';

const Chat = ({ messages }) => {
    return (
        <Box style={{ padding: '20px', flex: 1 }}>
            {messages.map((msg, index) => (
                <Box key={index} style={{ marginBottom: '10px' }}>
                    <Typography variant="body1" gutterBottom>{msg.text}</Typography>
                </Box>
            ))}
        </Box>
    );
};

export default Chat;

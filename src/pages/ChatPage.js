import React, { useState } from 'react';
import { Box } from '@mui/material';
import Sidebar from '../components/Sidebar';
import Chat from '../components/Chat';

const ChatPage = () => {
    const [users, setUsers] = useState([{ name: 'User 1' }, { name: 'User 2' }]);
    const [messages, setMessages] = useState([
        { text: 'Hello!' },
        { text: 'How are you?' },
    ]);

    return (
        <Box style={{ display: 'flex', height: '100vh' }}>
            <Sidebar users={users} />
            <Chat messages={messages} />
        </Box>
    );
};

export default ChatPage;

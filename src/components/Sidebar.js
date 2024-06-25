import React from 'react';
import { List, ListItem, ListItemText, Divider } from '@mui/material';

const Sidebar = ({ users }) => {
    return (
        <div style={{ width: '300px', borderRight: '1px solid #ddd' }}>
            <List>
                {users.map((user, index) => (
                    <React.Fragment key={index}>
                        <ListItem button>
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

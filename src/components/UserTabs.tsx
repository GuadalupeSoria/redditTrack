// src/components/UserTabs.tsx
import React, { useState } from 'react';
import { Tabs, Tab, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { useUserContext } from '../contexts/UserContext';
import UserPanel from './UserPanel';

const UserTabs: React.FC = () => {
  const { users, addUser, removeUser } = useUserContext();
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [newUserName, setNewUserName] = useState('');

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewUserName('');
  };

  const handleAddUser = () => {
    if (newUserName.trim()) {
      addUser(newUserName.trim());
      handleClose();
    }
  };

  const handleRemoveUser = (id: string) => {
    removeUser(id);
    setValue(Math.max(0, value - 1));
  };

  return (
    <Box className="w-full">
      <Box className="border-b border-gray-200">
        <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto">
          {users.map((user, index) => (
            <Tab
              key={user.id}
              label={
                <div className="flex items-center">
                  {user.name}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveUser(user.id);
                    }}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </div>
              }
            />
          ))}
          <Button onClick={handleOpen} className="min-w-[40px] !justify-center">+</Button>
        </Tabs>
      </Box>
      {users.map((user, index) => (
        <Box key={user.id} hidden={value !== index} className="p-4">
          {value === index && <UserPanel user={user} />}
        </Box>
      ))}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="User Name"
            type="text"
            fullWidth
            variant="standard"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddUser}>Add</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserTabs;
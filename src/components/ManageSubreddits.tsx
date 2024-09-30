// src/components/ManageSubreddits.tsx
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface Subreddit {
  name: string;
  description: string;
}

interface ManageSubredditsProps {
  subreddits: Subreddit[];
  onAddSubreddit: (newSubreddit: Subreddit) => void;
  onDeleteSubreddit: (name: string) => void;
}

const ManageSubreddits: React.FC<ManageSubredditsProps> = ({ subreddits, onAddSubreddit, onDeleteSubreddit }) => {
  const [open, setOpen] = useState(false);
  const [newSubreddit, setNewSubreddit] = useState({ name: '', description: '' });

  const handleOpenDialog = () => setOpen(true);
  const handleCloseDialog = () => setOpen(false);

  const handleAddSubreddit = () => {
    if (newSubreddit.name && newSubreddit.description) {
      onAddSubreddit(newSubreddit);
      setNewSubreddit({ name: '', description: '' });
      handleCloseDialog();
    }
  };

  return (
    <>
      <Button onClick={handleOpenDialog} variant="contained" color="primary" style={{ position: 'absolute', top: 10, right: 10 }}>
        Gestionar Subreddits
      </Button>

      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Gestionar Subreddits</DialogTitle>
        <DialogContent>
          <List>
            {subreddits.map((subreddit) => (
              <ListItem key={subreddit.name} secondaryAction={
                <IconButton edge="end" onClick={() => onDeleteSubreddit(subreddit.name)}>
                  <DeleteIcon />
                </IconButton>
              }>
                <ListItemText
                  primary={subreddit.name}
                  secondary={subreddit.description}
                />
              </ListItem>
            ))}
          </List>

          <TextField
            label="Nombre del Subreddit"
            value={newSubreddit.name}
            onChange={(e) => setNewSubreddit({ ...newSubreddit, name: e.target.value })}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Descripción"
            value={newSubreddit.description}
            onChange={(e) => setNewSubreddit({ ...newSubreddit, description: e.target.value })}
            fullWidth
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleAddSubreddit} variant="contained" color="primary">Agregar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ManageSubreddits;

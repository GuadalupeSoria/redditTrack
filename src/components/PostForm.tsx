// src/components/PostForm.tsx
import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, TextField, Button, Typography, Autocomplete, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { PostRecord } from '../types';

interface Subreddit {
  name: string;
  description: string;
}

interface PostFormProps {
  onSubmit: (post: PostRecord) => void;
  subreddits: Subreddit[];
}

const PostForm: React.FC<PostFormProps> = ({ onSubmit, subreddits }) => {
  const [post, setPost] = useState<PostRecord>({
    title: '',
    subreddit: '',
    views: 0,
    upvotes: 0,
    comments: 0,
    lastChecked: new Date().toISOString().split('T')[0],
    completed: false,
    image: undefined,
  });

  const [selectedSubreddit, setSelectedSubreddit] = useState<Subreddit | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setPost((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(post);
    setPost({
      title: '',
      subreddit: '',
      views: 0,
      upvotes: 0,
      comments: 0,
      lastChecked: new Date().toISOString().split('T')[0],
      completed: false,
      image: undefined,
    });
    setSelectedSubreddit(null);
  };

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Agregar Nuevo Post</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            label="Título del post"
            name="title"
            value={post.title}
            onChange={handleChange}
            required
            fullWidth
          />
          
          {/* Autocomplete para seleccionar subreddit con nombre y descripción */}
          <Autocomplete
            options={subreddits}
            getOptionLabel={(option) => option.name} // Mostrar solo el nombre como label principal
            onChange={(_, newValue) => {
              setSelectedSubreddit(newValue);
              setPost((prev) => ({ ...prev, subreddit: newValue?.name || '' }));
            }}
            renderOption={(props, option) => (
              <li {...props}>
                <Box>
                  <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                    {option.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {option.description}
                  </Typography>
                </Box>
              </li>
            )}
            renderInput={(params) => <TextField {...params} label="Subreddit" required />}
            value={selectedSubreddit}
            fullWidth
          />
          
          {/* Mostrar la descripción del subreddit seleccionado */}
          {selectedSubreddit && (
            <Typography variant="body2" color="textSecondary">
              {selectedSubreddit.description}
            </Typography>
          )}

          <TextField
            label="Views"
            name="views"
            type="number"
            value={post.views}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Upvotes"
            name="upvotes"
            type="number"
            value={post.upvotes}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Comments"
            name="comments"
            type="number"
            value={post.comments}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Last Checked"
            name="lastChecked"
            type="date"
            value={post.lastChecked}
            onChange={handleChange}
            required
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Agregar Post
          </Button>
        </form>
      </AccordionDetails>
    </Accordion>
  );
};

export default PostForm;

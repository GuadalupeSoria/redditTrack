// src/components/SubredditList.tsx
import React, { useState } from 'react';
import { Box, Typography, Checkbox, TextField, Button, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { PostRecord } from '../types';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';

interface SubredditListProps {
  posts: PostRecord[];
  onPostUpdate: (post: PostRecord) => void;
  onImageUpload: (post: PostRecord) => void;
  onDeletePost?: (post: PostRecord) => void;
}

const SubredditList: React.FC<SubredditListProps> = ({ posts, onPostUpdate, onImageUpload, onDeletePost }) => {
  const [imagePreviews, setImagePreviews] = useState<{ [key: string]: string }>({});
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [editMode, setEditMode] = useState<{ [key: string]: boolean }>({}); // Estado para manejar el modo de edición por post

  const handleToggleComplete = (post: PostRecord) => () => {
    onPostUpdate({ ...post, completed: !post.completed });
  };

  const handleImageUpload = (post: PostRecord, event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setImagePreviews((prev) => ({ ...prev, [post.title]: imageUrl }));

        // Actualiza el post con la URL temporal de la imagen
        onPostUpdate({ ...post, image: imageUrl });
      };

      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedImage(null);
  };

  const handleFieldChange = (post: PostRecord, fieldName: keyof PostRecord, value: string | number) => {
    onPostUpdate({
      ...post,
      [fieldName]: typeof value === 'number' ? Number(value) : value,
    });
  };

  const toggleEditMode = (postTitle: string) => {
    setEditMode((prev) => ({ ...prev, [postTitle]: !prev[postTitle] }));
  };

  return (
    <Box className="space-y-6 mt-4">
      {posts.map((post) => (
        <Box
          key={post.title}
          className="bg-white shadow-md p-6 rounded-lg flex items-center justify-between"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#f9f9f9',
            transition: 'transform 0.3s',
          }}
        >
          <Box className="flex items-center">
            {/* Mostrar la imagen si existe, o un input de archivo para subirla */}
            {imagePreviews[post.title] || post.image ? (
              <img
                src={imagePreviews[post.title] || post.image!}
                alt="subreddit thumbnail"
                className="w-16 h-16 object-cover cursor-pointer"
                onClick={() => handleImageClick(imagePreviews[post.title] || post.image!)}
                style={{ borderRadius: '8px', marginRight: '16px' }}
              />
            ) : (
              <Button
                variant="outlined"
                component="label"
                style={{ marginRight: '16px', borderRadius: '8px' }}
              >
                Subir Imagen
                <input
                  type="file"
                  hidden
                  onChange={(e) => handleImageUpload(post, e)}
                />
              </Button>
            )}

            {/* Datos del post, ahora editables solo en modo de edición */}
            <Box className="flex flex-col space-y-2">
              <Typography variant="h6" className="font-bold text-gray-700">{post.subreddit}</Typography>
              <Box className="flex space-x-4">
                {editMode[post.title] ? (
                  <>
                    <TextField
                      label="Views"
                      type="number"
                      value={post.views}
                      onChange={(e) => handleFieldChange(post, 'views', e.target.value)}
                      variant="outlined"
                      size="small"
                    />
                    <TextField
                      label="Upvotes"
                      type="number"
                      value={post.upvotes}
                      onChange={(e) => handleFieldChange(post, 'upvotes', e.target.value)}
                      variant="outlined"
                      size="small"
                    />
                    <TextField
                      label="Comments"
                      type="number"
                      value={post.comments}
                      onChange={(e) => handleFieldChange(post, 'comments', e.target.value)}
                      variant="outlined"
                      size="small"
                    />
                  </>
                ) : (
                  <>
                    <Typography variant="body2" color="textSecondary">Views: {post.views}</Typography>
                    <Typography variant="body2" color="textSecondary">Upvotes: {post.upvotes}</Typography>
                    <Typography variant="body2" color="textSecondary">Comments: {post.comments}</Typography>
                  </>
                )}
              </Box>
              {editMode[post.title] ? (
                <TextField
                  label="Last Checked"
                  type="date"
                  value={post.lastChecked}
                  onChange={(e) => handleFieldChange(post, 'lastChecked', e.target.value)}
                  variant="outlined"
                  size="small"
                />
              ) : (
                <Typography variant="body2" color="textSecondary">Last Checked: {post.lastChecked}</Typography>
              )}
            </Box>
          </Box>

          {/* Botón para alternar el modo de edición */}
          <Box className="flex items-center">
            <IconButton
              onClick={() => toggleEditMode(post.title)}
              aria-label={editMode[post.title] ? 'save' : 'edit'}
              style={{ marginRight: '16px' }}
            >
              {editMode[post.title] ? <SaveIcon /> : <EditIcon />}
            </IconButton>

            {/* Checkbox para marcar como completo */}
            <Checkbox
              checked={post.completed}
              onChange={handleToggleComplete(post)}
              style={{ marginRight: '16px' }}
            />
            <Typography variant="body2" component="span">Complete</Typography>

            {/* Botón para eliminar el post */}
            {onDeletePost && (
              <IconButton
                onClick={() => onDeletePost(post)}
                aria-label="delete"
                style={{ marginLeft: '16px', color: '#e57373' }}
              >
                <DeleteIcon />
              </IconButton>
            )}
          </Box>
        </Box>
      ))}

      {/* Modal para mostrar la imagen en grande */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>Vista Ampliada</DialogTitle>
        <DialogContent>
          {selectedImage && (
            <img src={selectedImage} alt="Vista Ampliada" style={{ width: '100%', borderRadius: '12px' }} />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default SubredditList;

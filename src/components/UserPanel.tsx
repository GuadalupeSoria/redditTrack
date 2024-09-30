// src/components/UserPanel.tsx
import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useUserContext } from '../contexts/UserContext';
import { User, PostRecord } from '../types';
import PostForm from './PostForm';
import SubredditList from './SubredditList';
import DateTabs from './DateTabs';
import ManageSubreddits from './ManageSubreddits';

interface Subreddit {
  name: string;
  description: string;
}

interface UserPanelProps {
  user: User;
}

const UserPanel: React.FC<UserPanelProps> = ({ user }) => {
  const { updateUserRecord, addUserDate } = useUserContext();

  // Estado de los subreddits
  const [subreddits, setSubreddits] = useState<Subreddit[]>([
    { name: 'AskReddit', description: 'A subreddit to ask and answer questions.' },
    { name: 'gaming', description: 'A subreddit for discussing games and gaming culture.' },
    // Puedes añadir más subreddits por defecto
  ]);

  // Funciones para agregar y eliminar subreddits
  const handleAddSubreddit = (newSubreddit: Subreddit) => {
    setSubreddits([...subreddits, newSubreddit]);
  };

  const handleDeleteSubreddit = (name: string) => {
    setSubreddits(subreddits.filter((subreddit) => subreddit.name !== name));
  };

  // Estado para manejar las fechas
  const dates = Object.keys(user.dailyRecords);
  const [selectedDate, setSelectedDate] = useState(dates[0]);

  const handleDateChange = (date: string) => setSelectedDate(date);

  const handleAddDate = (newDate: string) => {
    // Asegúrate de que la nueva fecha no exista ya
    if (!dates.includes(newDate)) {
      addUserDate(user.id, newDate);  // Actualiza las fechas en el contexto
      setSelectedDate(newDate);  // Selecciona automáticamente la nueva fecha
    }
  };

  const handlePostSubmit = (post: PostRecord) => updateUserRecord(user.id, selectedDate, post);
  const selectedPosts = user.dailyRecords[selectedDate]?.posts || [];

  return (
    <Box className="space-y-4 relative">
      <Typography variant="h4">{user.name}'s Dashboard</Typography>

      {/* Botón para gestionar subreddits */}
      <ManageSubreddits subreddits={subreddits} onAddSubreddit={handleAddSubreddit} onDeleteSubreddit={handleDeleteSubreddit} />

      {/* Pestañas de fechas con la funcionalidad de agregar nueva fecha */}
      <DateTabs
        dates={dates}
        selectedDate={selectedDate}
        onDateChange={handleDateChange}
        onAddDate={handleAddDate}  // Pasamos la función para agregar nuevas fechas
      />

      {/* Formulario para agregar nuevo post */}
      <PostForm onSubmit={handlePostSubmit} subreddits={subreddits} />

      {/* Lista de subreddits para la fecha seleccionada */}
      <SubredditList
        posts={selectedPosts}
        onPostUpdate={handlePostSubmit}
        onImageUpload={handlePostSubmit}
      />
    </Box>
  );
};

export default UserPanel;

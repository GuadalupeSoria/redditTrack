// src/components/DateForm.tsx
import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';

interface DateFormProps {
  onSubmit: (date: string) => void;
}

const DateForm: React.FC<DateFormProps> = ({ onSubmit }) => {
  const [newDate, setNewDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newDate.trim()) {
      onSubmit(newDate);
      setNewDate(''); // Resetea el campo
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} className="space-y-4">
      <TextField
        label="Fecha (YYYY-MM-DD)"
        value={newDate}
        onChange={(e) => setNewDate(e.target.value)}
        required
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Agregar Fecha
      </Button>
    </Box>
  );
};

export default DateForm;

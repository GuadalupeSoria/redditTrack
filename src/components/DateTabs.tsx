// src/components/DateTabs.tsx
import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';

interface DateTabsProps {
  dates: string[];
  selectedDate: string;
  onDateChange: (date: string) => void;
  onAddDate: (date: string) => void;
}

const DateTabs: React.FC<DateTabsProps> = ({ dates, selectedDate, onDateChange, onAddDate }) => {
  const [open, setOpen] = useState(false);
  const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0]); // Fecha actual por defecto

  // Estado para manejar qué pestaña está seleccionada
  const [tabIndex, setTabIndex] = useState(dates.indexOf(selectedDate));

  // Efecto para actualizar el índice de la pestaña seleccionada cuando cambia la fecha
  useEffect(() => {
    setTabIndex(dates.indexOf(selectedDate));
  }, [dates, selectedDate]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
    onDateChange(dates[newValue]); // Actualizar la fecha seleccionada
  };

  const handleOpenDialog = () => {
    setNewDate(new Date().toISOString().split('T')[0]); // Resetea la fecha al día actual cuando se abre el diálogo
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleAddDate = () => {
    onAddDate(newDate); // Llama a la función para agregar la nueva fecha
    setOpen(false);
  };

  return (
    <>
      <Tabs value={tabIndex} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
        {dates.map((date, index) => (
          <Tab key={index} label={date} />
        ))}
        <Button onClick={handleOpenDialog}>+</Button> 
      </Tabs>

      {/* Dialog para seleccionar una nueva fecha */}
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Agregar nueva fecha</DialogTitle>
        <DialogContent>
          <TextField
            label="Fecha"
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleAddDate} variant="contained" color="primary">Agregar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DateTabs;

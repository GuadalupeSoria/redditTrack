// src/App.tsx
import React from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import UserTabs from './components/UserTabs';
import { UserProvider } from './contexts/UserContext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4caf50', // Color verde moderno
    },
    secondary: {
      main: '#ff5722', // Color anaranjado moderno
    },
    background: {
      default: '#f5f5f5', // Fondo claro para toda la app
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
    h6: {
      fontWeight: 600,
      fontSize: '1.1rem',
      color: '#333',
    },
    body2: {
      fontSize: '0.9rem',
      color: '#777',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserProvider>
        <div className="min-h-screen bg-gray-100 p-6">
          <h1 className="text-4xl font-bold text-center mb-6">Reddit Tracker</h1>
          <UserTabs />
        </div>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;

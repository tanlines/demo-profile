import { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem('theme-mode');
    if (savedMode) return savedMode;
    return 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme-mode', mode);
  }, [mode]);

  const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#bb86fc',
        light: '#d4a4fc',
        dark: '#8b5cf6',
        contrastText: '#000000',
      },
      secondary: {
        main: '#03dac6',
        light: '#66fff8',
        dark: '#018786',
        contrastText: '#000000',
      },
      background: {
        default: '#0a0a0a',
        paper: '#1a1a1a',
      },
      text: {
        primary: 'rgba(255, 255, 255, 0.95)',
        secondary: 'rgba(255, 255, 255, 0.7)',
        disabled: 'rgba(255, 255, 255, 0.5)',
      },
      divider: 'rgba(255, 255, 255, 0.12)',
    },
    components: {
      MuiChip: {
        styleOverrides: {
          root: {
            '&.MuiChip-root': {
              marginBottom: '6px !important',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: '8px',
            fontWeight: 500,
          },
        },
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 700,
        letterSpacing: '-0.02em',
      },
      h2: {
        fontWeight: 600,
        letterSpacing: '-0.01em',
      },
      h3: {
        fontWeight: 600,
        letterSpacing: '-0.01em',
      },
      h4: {
        fontWeight: 600,
        letterSpacing: '-0.01em',
      },
      h5: {
        fontWeight: 600,
        letterSpacing: '-0.01em',
      },
      h6: {
        fontWeight: 600,
        letterSpacing: '-0.01em',
      },
    },
  });

  const toggleTheme = (newMode) => {
    // Only allow dark mode for now
    setMode('dark');
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 
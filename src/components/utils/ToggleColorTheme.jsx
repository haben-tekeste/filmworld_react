import React, { useMemo, useState, createContext } from 'react';
import { ThemeProvider } from '@mui/styles';
import { createTheme } from '@mui/material';

export const ColorThemeContext = createContext();

const ToggleColorTheme = ({ children }) => {
  const [mode, setMode] = useState('light');

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(
    () => createTheme({
      palette: {
        mode,
      },
    }),
    [mode],
  );

  // const theme = createTheme({
  //   palette: {
  //     mode,
  //   },
  // });

  return (
    <ColorThemeContext.Provider value={{ toggleTheme, setMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorThemeContext.Provider>
  );
};

export default ToggleColorTheme;

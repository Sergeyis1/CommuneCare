// ThemeContext.js
import React, { createContext, useState } from 'react';

const lightTheme = {
  backgroundColor: '#ffffff',
  textColor: '#000000',
  buttonColor: '#841584',
};

const darkTheme = {
  backgroundColor: '#333333',
  textColor: '#ffffff',
  buttonColor: '#841584',
};

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(prevTheme => !prevTheme);
  };

  const theme = isDarkTheme ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDarkTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the theme context
const ThemeContext = createContext();

// Light theme colors
const lightTheme = {
  background: '#f5f5f5',
  cardBackground: '#ffffff',
  headerBackground: '#2196F3',
  text: '#333333',
  textSecondary: '#666666',
  textLight: '#999999',
  border: '#f0f0f0',
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  filterBackground: '#f0f0f0',
  filterActiveBackground: '#2196F3',
  filterText: '#666666',
  filterActiveText: '#ffffff',
  generated: '#e8f5e8',
  scanned: '#e8f0ff',
  destructive: '#f44336',
  warning: '#ff9800',
};

// Dark theme colors
const darkTheme = {
  background: '#121212',
  cardBackground: '#1e1e1e',
  headerBackground: '#1976D2',
  text: '#ffffff',
  textSecondary: '#cccccc',
  textLight: '#999999',
  border: '#333333',
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  filterBackground: '#333333',
  filterActiveBackground: '#1976D2',
  filterText: '#cccccc',
  filterActiveText: '#ffffff',
  generated: '#2d4a2d',
  scanned: '#2d3a4a',
  destructive: '#d32f2f',
  warning: '#f57c00',
};

// Theme provider component
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load theme preference on component mount
  useEffect(() => {
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    try {
      // In a real app, you'd load from AsyncStorage:
      // const savedTheme = await AsyncStorage.getItem('darkMode');
      // if (savedTheme !== null) {
      //   setIsDarkMode(JSON.parse(savedTheme));
      // }
      
      // For demo purposes, we'll use a default value
      console.log('Theme preference loaded');
    } catch (error) {
      console.error('Error loading theme preference:', error);
    }
  };

  const saveThemePreference = async (darkMode) => {
    try {
      // In a real app, you'd save to AsyncStorage:
      // await AsyncStorage.setItem('darkMode', JSON.stringify(darkMode));
      console.log('Theme preference saved:', darkMode);
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    saveThemePreference(newDarkMode);
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  const value = {
    isDarkMode,
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;
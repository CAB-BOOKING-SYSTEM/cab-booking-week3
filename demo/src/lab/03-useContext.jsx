import React, { useState, useContext, createContext } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function ThemedButton() {
  const { theme, setTheme } = useContext(ThemeContext);
  
  return (
    <div>
      <h2>useContext - Theme</h2>
      <button 
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        style={{
          background: theme === 'dark' ? '#333' : '#fff',
          color: theme === 'dark' ? '#fff' : '#333',
          padding: '10px 20px'
        }}
      >
        {theme === 'dark' ? '🌙 Dark Mode' : '☀️ Light Mode'}
      </button>
    </div>
  );
}

export function ThemeApp() {
  return (
    <ThemeProvider>
      <ThemedButton />
    </ThemeProvider>
  );
}
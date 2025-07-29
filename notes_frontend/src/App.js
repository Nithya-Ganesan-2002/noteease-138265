import React, { useState, useEffect } from 'react';
import './App.css';
import NotesAppLayout from './components/NotesAppLayout';

// PUBLIC_INTERFACE
function App() {
  /**
   * The App is the root of the notes application. It controls theme and global app wrap.
   */
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  return (
    <div className="App" style={{ minHeight: '100vh' }}>
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        style={{ position: 'fixed', top: 16, right: 16, zIndex: 20 }}
      >
        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
      </button>
      <NotesAppLayout />
    </div>
  );
}

export default App;

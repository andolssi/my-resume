import { useTheme } from '@/components/ThemePreferenceProvider';
import { useState, useEffect } from 'react';
import LightModeSVG from '../SVG/LightModeSVG';
import DarkModeSVG from '../SVG/DarkModeSVG';

const ThemeToggle = () => {
  const { theme, setTheme, setAutoTheme } = useTheme();

  const [isDarkMode, setIsDarkMode] = useState(theme === 'dark');

  useEffect(() => {
    const prefersDarkMode = theme === 'dark';
    setIsDarkMode(prefersDarkMode);
    toggleDarkMode(prefersDarkMode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  const toggleDarkMode = (shouldEnable: boolean) => {
    document.documentElement.classList.toggle('dark', shouldEnable);
    setTheme(shouldEnable ? 'dark' : 'light');
  };

  const handleToggle = () => {
    setAutoTheme(false);
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    toggleDarkMode(newMode);
  };

  return (
    <button onClick={handleToggle} id="btn-toggle">
      {isDarkMode ? (
        <LightModeSVG className="w-6 h-6 light-hover-theme-button" />
      ) : (
        <DarkModeSVG className="w-6 h-6 dark-hover-theme-button" />
      )}
    </button>
  );
};

export default ThemeToggle;

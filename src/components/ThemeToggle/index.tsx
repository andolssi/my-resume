import { useTheme } from '@/components/ThemePreferenceProvider';
import { useState, useEffect } from 'react';
import LightModeSVG from '../SVG/LightModeSVG';
import DarkModeSVG from '../SVG/DarkModeSVG';

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);

  const { theme, setTheme, setAutoTheme } = useTheme();

  const [isDarkMode, setIsDarkMode] = useState(theme === 'dark');

  useEffect(() => {
    setAutoTheme(false);
    const prefersDarkMode = theme === 'dark';
    setIsDarkMode(prefersDarkMode);
    toggleDarkMode(prefersDarkMode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleDarkMode = (shouldEnable: boolean) => {
    document.documentElement.classList.toggle('dark', shouldEnable);
    setTheme(shouldEnable ? 'dark' : 'light');
  };

  const handleToggle = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    toggleDarkMode(newMode);
  };

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button onClick={handleToggle}>
      {isDarkMode ? (
        <LightModeSVG className="w-6 h-6" />
      ) : (
        <DarkModeSVG className="w-6 h-6" />
      )}
    </button>
  );
};

export default ThemeToggle;

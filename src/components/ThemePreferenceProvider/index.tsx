'use client';

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const ThemeContext = createContext<{
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
  setAutoTheme: Dispatch<SetStateAction<boolean>>;
}>({
  theme: 'light',
  setTheme: () => {},
  setAutoTheme: () => {},
});

const ThemePreferenceProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [theme, setTheme] = useState<string>('light');
  const [autoTheme, setAutoTheme] = useState(true);

  useEffect(() => {
    const setThemePreference = () => {
      if (autoTheme) {
        const isDarkMode =
          window.matchMedia &&
          window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(isDarkMode ? 'dark' : 'light');
      }
    };

    setThemePreference();

    // Listen for changes in the user's color scheme preference
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', setThemePreference);

    return () => {
      // Remove the event listener when the component is unmounted
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', setThemePreference);
    };
  }, [autoTheme]);

  const themeContextValue = useMemo(
    () => ({ theme, setTheme, setAutoTheme }),
    [theme],
  );

  return (
    <ThemeContext.Provider value={themeContextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemePreferenceProvider;

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

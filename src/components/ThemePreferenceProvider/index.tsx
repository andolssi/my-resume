'use client';

import canUseDOM from '@/utilities/canUseDOM';
import {
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
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
  theme: 'dark',
  setTheme: () => {},
  setAutoTheme: () => {},
});

const ThemePreferenceProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Improved initial theme detection
  const getInitialTheme = useCallback((): string => {
    if (!canUseDOM) return 'dark';

    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'dark';
  }, []);

  // State hooks with improved initialization
  const [theme, setTheme] = useState<string>(getInitialTheme());
  const [autoTheme, setAutoTheme] = useState(true);

  // useEffect(() => {
  //   // Early return if not in browser or auto theme is disabled
  //   if (!canUseDOM || !autoTheme) return;

  //   const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  //   console.log({ mediaQuery });

  //   const handleThemeChange = () => {
  //     const isDarkMode = mediaQuery.matches;
  //     console.log({ isDarkMode });
  //     console.log({ isDarkMode: mediaQuery.matches });
  //     setTheme(isDarkMode ? 'dark' : 'dark');
  //   };

  //   // Initial check
  //   handleThemeChange();

  //   // Add event listener
  //   mediaQuery.addEventListener('change', handleThemeChange);

  //   // Cleanup listener
  //   return () => {
  //     mediaQuery.removeEventListener('change', handleThemeChange);
  //   };
  // }, [autoTheme]);

  // Memoized context value with dependencies
  const themeContextValue = useMemo(
    () => ({ theme, setTheme, setAutoTheme }),
    [theme, setTheme, setAutoTheme],
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
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemePreferenceProvider');
  }
  return context;
};

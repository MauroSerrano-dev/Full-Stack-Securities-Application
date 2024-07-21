import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import SecurityList from './components/SecurityList';
import SecurityDetail from './components/SecurityDetail';
import i18n from './i18n';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { darkTheme, lightTheme } from './theme';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export default function App() {
  const [themeMode, setThemeMode] = useState<'light' | 'dark' | 'system'>(
    (Cookies.get('themeMode') as 'light' | 'dark' | 'system') || 'system'
  );
  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (event: MediaQueryListEvent) => {
      if (themeMode === 'system') {
        setIsDarkMode(event.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [themeMode]);

  useEffect(() => {
    if (themeMode === 'light') {
      setIsDarkMode(false);
    } else if (themeMode === 'dark') {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, [themeMode]);

  const updateHtmlLangAttribute = (lng: string) => {
    document.documentElement.setAttribute('lang', lng);
  };

  i18n.on('languageChanged', lng => {
    updateHtmlLangAttribute(lng);
  });

  updateHtmlLangAttribute(i18n.language);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Layout setThemeMode={setThemeMode} themeMode={themeMode} />}>
            <Route index element={<SecurityList />} />
            <Route path="securities" element={<SecurityList />} />
            <Route path="securities/:symbol" element={<SecurityDetail />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
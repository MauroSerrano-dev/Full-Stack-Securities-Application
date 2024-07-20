import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import './i18n';
import i18n from './i18n';

const updateHtmlLangAttribute = (lng: string) => {
  document.documentElement.setAttribute('lang', lng);
};

i18n.on('languageChanged', (lng) => {
  updateHtmlLangAttribute(lng);
});

updateHtmlLangAttribute(i18n.language);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
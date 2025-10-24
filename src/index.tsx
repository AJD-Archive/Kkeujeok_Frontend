import './index.css';

import { createRoot } from 'react-dom/client';
import ReactGA from 'react-ga4';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import GlobalStyle from './styles/GlobalStyle';

if (import.meta.env.VITE_GOOGLE_ANALYTICS_TRAKING_ID) {
  ReactGA.initialize(import.meta.env.VITE_GOOGLE_ANALYTICS_TRAKING_ID);
}

createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <HelmetProvider>
      <GlobalStyle />
      <App />
    </HelmetProvider>
  </BrowserRouter>,
);

import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import GlobalStyle from './styles/GlobalStyle';
import ReactGA from 'react-ga4';
import { HelmetProvider } from 'react-helmet-async';
import { createRoot } from 'react-dom/client';

if (import.meta.env.VITE_GOOGLE_ANALYTICS_TRAKING_ID) {
  ReactGA.initialize(import.meta.env.VITE_GOOGLE_ANALYTICS_TRAKING_ID);
}

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <HelmetProvider>
      <GlobalStyle />
      <App />
    </HelmetProvider>
  </BrowserRouter>
);

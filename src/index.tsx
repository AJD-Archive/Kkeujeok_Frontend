// import './index.css';

import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
// import GlobalStyle from './styles/GlobalStyle';
import NewGlobalStyle from './styles/GlobalStyle/Global.styles';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    {/* <GlobalStyle /> */}
    <NewGlobalStyle />
    <App />
  </BrowserRouter>,
);

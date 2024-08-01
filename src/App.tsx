import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import CreateBoard from './pages/CreateBoardPage';
import OAuthRedirectHandler from './contexts/OAuthRedirectHandler';
import { AuthProvider } from './contexts/AuthContext';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" Component={MainPage} />
          <Route path="/login" Component={LoginPage} />
          <Route path="/createBoard" Component={CreateBoard} />
          <Route path="/api/oauth2/callback/:provider" element={<OAuthRedirectHandler />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;

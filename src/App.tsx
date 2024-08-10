import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import MyPage from './pages/MyPage';
import OAuthRedirectHandler from './contexts/OAuthRedirectHandler';
import { AuthProvider } from './contexts/AuthContext';
import TeamDocument from './pages/TeamDocument';
import TeamFileBoard from './pages/TeamFileBoard';

const App: React.FC = () => (
  <Router>
    <AuthProvider>
      <Routes>
        <Route path="/" Component={MainPage} />
        <Route path="/login" Component={LoginPage} />
        <Route path="/api/oauth2/callback/:provider" element={<OAuthRedirectHandler />} />
        <Route path="/mypage" Component={MyPage} />
        <Route path="/teamdocument" Component={TeamDocument} />
        <Route path="/teamdocument/:id" Component={TeamFileBoard} />
      </Routes>
    </AuthProvider>
  </Router>
);

export default App;

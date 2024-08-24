import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import MyPage from './pages/MyPage';
import CreateBoard from './pages/CreateBoardPage';
import CreatePersonalBoard from './pages/CreatePersonalBoardPage';
import CreateTeamBoard from './pages/CreateTeamBoardPage';
import OAuthRedirectHandler from './contexts/OAuthRedirectHandler';
import { AuthProvider } from './contexts/AuthContext';
import TeamDocument from './pages/TeamDocument';
import TeamFileBoard from './pages/TeamFileBoard';
import SidePage from './pages/SidePage';

// Data Router 사용하여 라우터 설정
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainPage />}>
        <Route path="personalBlock/:id" element={<SidePage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/api/oauth2/callback/:provider" element={<OAuthRedirectHandler />} />
      <Route path="/createBoard" element={<CreateBoard />} />
      <Route path="/createPersonalBoard" element={<CreatePersonalBoard />} />
      <Route path="/createTeamBoard" element={<CreateTeamBoard />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/teamdocument" element={<TeamDocument />} />
      <Route path="/teamdocument/:id" element={<TeamFileBoard />} />
    </>
  )
);

const App: React.FC = () => (
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);

export default App;

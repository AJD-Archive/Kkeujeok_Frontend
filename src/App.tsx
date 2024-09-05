import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
  Navigate,
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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

// Data Router 사용하여 라우터 설정
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Navigate to="/1" replace />} />
      <Route path="/:id" element={<MainPage />}>
        <Route path="/:id/personalBlock/:blockId" element={<SidePage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/api/oauth2/callback/:provider" element={<OAuthRedirectHandler />} />
      <Route path="/createBoard" element={<CreateBoard />} />
      <Route path="/createPersonalBoard" element={<CreatePersonalBoard />} />
      <Route path="/createPersonalBoard/:id" element={<CreatePersonalBoard />} />
      <Route path="/createTeamBoard" element={<CreateTeamBoard />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/teamdocument" element={<TeamDocument />} />
      <Route path="/teamdocument/:id" element={<TeamFileBoard />} />
    </>
  )
);

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);

export default App;

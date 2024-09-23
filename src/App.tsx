import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
  Navigate,
  Routes,
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
import TeamDocumentBoard from './pages/TeamDocumentBoard';
import SidePage from './pages/SidePage';
import ChallengeCommunityPage from './pages/ChallengeCommunityPage';
import CreateChallengePage from './pages/CreateChallengePage';
import ChallengeDetailPage from './pages/ChallengeDetailPage';
import TutorialPage from './pages/TutorialPage';
import ErrorPage from './pages/ErrorPage';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ProfileEdit from './components/ProfileEdit';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { useSSE } from './hooks/useSSE';
import ProtectedRoute from './components/ProtectedRoute';

const queryClient = new QueryClient();

// 로그인 상태를 체크하는 함수
const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태 추가

  useSSE();
  useEffect(() => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      setIsLoggedIn(true);
    }
    setLoading(false); // 로딩 상태를 false로 변경

    AOS.init(); // AOS 초기화
  }, []);

  return { isLoggedIn, loading };
};

// Data Router 사용하여 라우터 설정
const router = (isLoggedIn: boolean) =>
  createBrowserRouter(
    createRoutesFromElements(
      <Route>
        {/* 기본 라우터를 로그인 페이지로 변경 */}
        <Route path="/" element={<LoginPage />} />
        {/* <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to={`/${localStorage.getItem('LatestBoard') ?? 'tutorial'}`} replace />
            ) : (
              <LoginPage />
            )
          }
        /> */}

        {/* 로그인 상관없이 접근 가능한 라우터. 보호되지 않는 라우터 */}
        <Route path="/api/oauth2/callback/:provider" element={<OAuthRedirectHandler />} />
        <Route path="*" element={<ErrorPage />} />

        {/* 보호된 경로들에 ProtectedRoute 적용 */}
        <Route
          path="/:id"
          element={
            <ProtectedRoute>
              <MainPage />
            </ProtectedRoute>
          }
        >
          <Route path="/:id/personalBlock/:blockId" element={<SidePage />} />
        </Route>

        <Route
          path="/createBoard"
          element={
            <ProtectedRoute>
              <CreateBoard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/createPersonalBoard"
          element={
            <ProtectedRoute>
              <CreatePersonalBoard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/createPersonalBoard/:id"
          element={
            <ProtectedRoute>
              <CreatePersonalBoard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/createTeamBoard"
          element={
            <ProtectedRoute>
              <CreateTeamBoard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/createTeamBoard/:id"
          element={
            <ProtectedRoute>
              <CreateTeamBoard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/mypage"
          element={
            <ProtectedRoute>
              <MyPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/mypage/edit"
          element={
            <ProtectedRoute>
              <ProfileEdit />
            </ProtectedRoute>
          }
        />

        <Route
          path="/:id/teamdocument"
          element={
            <ProtectedRoute>
              <TeamDocumentBoard />
            </ProtectedRoute>
          }
        >
          <Route
            path=":documentId"
            element={
              <ProtectedRoute>
                <TeamDocument />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route
          path="/challenge"
          element={
            <ProtectedRoute>
              <ChallengeCommunityPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/challenge/create"
          element={
            <ProtectedRoute>
              <CreateChallengePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/challenge/create/:id"
          element={
            <ProtectedRoute>
              <CreateChallengePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/challenge/:id"
          element={
            <ProtectedRoute>
              <ChallengeDetailPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tutorial"
          element={
            <ProtectedRoute>
              <TutorialPage />
            </ProtectedRoute>
          }
        />
      </Route>
    )
  );

const App: React.FC = () => {
  const { isLoggedIn, loading } = useAuth(); // 로그인 여부와 로딩 상태 체크

  if (loading) {
    // 로딩 중일 때는 아무것도 렌더링하지 않음
    return <div>Loading...</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          style={{ width: '21.875rem', lineHeight: '1.5rem' }}
        />
        <RouterProvider router={router(isLoggedIn)} />
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
export default App;

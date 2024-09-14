import React, { useCallback, useEffect, useRef, useState } from 'react';
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
import TeamDocumentBoard from './pages/TeamDocumentBoard';
import SidePage from './pages/SidePage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ProfileEdit from './components/ProfileEdit';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { useSSE } from './hooks/useSSE';

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
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to={`/${localStorage.getItem('LatestBoard') ?? 1}`} replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/:id" element={<MainPage />}>
          <Route path="/:id/personalBlock/:blockId" element={<SidePage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/api/oauth2/callback/:provider" element={<OAuthRedirectHandler />} />
        <Route path="/createBoard" element={<CreateBoard />} />
        <Route path="/createPersonalBoard" element={<CreatePersonalBoard />} />
        <Route path="/createPersonalBoard/:id" element={<CreatePersonalBoard />} />
        <Route path="/createTeamBoard" element={<CreateTeamBoard />} />
        <Route path="/createTeamBoard/:id" element={<CreateTeamBoard />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypage/edit" element={<ProfileEdit />} />
        <Route path="/:id/teamdocument" element={<TeamDocumentBoard />}>
          <Route path=":documentId" element={<TeamDocument />} />
        </Route>
        <Route path="/test" element={<TeamDocument />} />
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

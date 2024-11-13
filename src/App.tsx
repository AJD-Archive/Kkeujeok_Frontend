import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
// import MainPage from './pages/MainPage';
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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ProfileEdit from './components/ProfileEdit';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import ProtectedRoute from './components/ProtectedRoute';
import Error404Page from './pages/Error404Page';
import Error403Page from './pages/Error403Page';
import { useMediaQuery } from 'react-responsive';
import Flex from './components/Flex';
import { MobileDisplay } from './styles/ErrorPageStyled';
import RouteChangeTracker from './components/RouteChangeTracker';
import PersonalDashboard from './components/PersonalDashboard';
import TeamDashBoard from './components/TeamDashboard';
import { useSSE } from './hooks/useSSE';
import ConnectionsPage from './pages/ConnectionsPage/ConnectionsPage';
import ConnectionsSearchPage from './pages/ConnectionsSearchPage/ConnectionsSearchPage';


const queryClient = new QueryClient();

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      setIsLoggedIn(true);
    }
    setLoading(false);
    AOS.init();
  }, []);

  return { isLoggedIn, loading };
};

const App = () => {
  useSSE();
  const isMobile = useMediaQuery({ query: '(max-width: 1000px)' });
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (isMobile) {
    return (
      <MobileDisplay>
        <Flex justifyContent="center" alignItems="center">
          데스크톱만 지원합니다
        </Flex>
      </MobileDisplay>
    );
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

        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/api/oauth2/callback/:provider" element={<OAuthRedirectHandler />} />
          <Route path="/error/403" element={<Error403Page />} />
          <Route path="*" element={<Error404Page />} />

          <Route
            path="/personal/:id"
            element={
              <ProtectedRoute>
                <PersonalDashboard />
              </ProtectedRoute>
            }
          >
            <Route
              path=":blockId"
              element={
                <ProtectedRoute>
                  <SidePage />
                </ProtectedRoute>
              }
            />
          </Route>
          {/* <Route
            path="/personalBlock/:blockId"
            element={
              <ProtectedRoute>
                <SidePage />
              </ProtectedRoute>
            }
          /> */}
          <Route
            path="/team/:id"
            element={
              <ProtectedRoute>
                <TeamDashBoard />
              </ProtectedRoute>
            }
          >
            <Route
              path=":blockId"
              element={
                <ProtectedRoute>
                  <SidePage />
                </ProtectedRoute>
              }
            />
          </Route>
          {/* <Route
            path="/:id"
            element={
              <ProtectedRoute>
                <MainPage />
              </ProtectedRoute>
            }
          /> */}

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

          <Route
            path="/connections"
            element={
              <ProtectedRoute>
                <ConnectionsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/connectionsSearch"
            element={
              <ProtectedRoute>
                <ConnectionsSearchPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;

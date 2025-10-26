import 'aos/dist/aos.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AOS from 'aos';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Flex from './components/Flex';
import PersonalDashboard from './components/PersonalDashboard';
import ProfileEdit from './components/ProfileEdit';
import ProtectedRoute from './components/ProtectedRoute';
import TeamDashBoard from './components/TeamDashboard';
import { AuthProvider } from './contexts/AuthContext';
import OAuthRedirectHandler from './contexts/OAuthRedirectHandler';
import { SSEProvider } from './contexts/SSEProvider';
import ChallengeCommunityPage from './pages/ChallengeCommunityPage';
import ChallengeDetailPage from './pages/ChallengeDetailPage';
import CreateBoard from './pages/CreateBoardPage';
import CreateChallengePage from './pages/CreateChallengePage';
import CreatePersonalBoard from './pages/CreatePersonalBoardPage';
import CreateTeamBoard from './pages/CreateTeamBoardPage';
import Error403Page from './pages/Error403Page';
import Error404Page from './pages/Error404Page';
import FriendPage from './pages/FriendPage';
import FriendsPage from './pages/FriendsPage/FriendsPage';
import FriendsSearchPage from './pages/FriendsSearchPage/FriendsSearchPage';
import LoginPage from './pages/LoginPage';
import MyPage from './pages/MyPage';
import NoticePage from './pages/NoticePage/NoticePage';
import RecommendedFriendsPage from './pages/RecommendedFriendsPage/RecommendedFriendsPage';
import SidePage from './pages/SidePage';
import TeamDocument from './pages/TeamDocument';
import TeamDocumentBoard from './pages/TeamDocumentBoard';
import TutorialPage from './pages/TutorialPage';
import { MobileDisplay } from './styles/ErrorPageStyled';

const queryClient = new QueryClient();

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      // Todo: 해당 라인 수정해야함.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsLoggedIn(true);
    }
    setLoading(false);
    AOS.init();
  }, []);

  return { isLoggedIn, loading };
};

const App = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 1000px)' });
  const { isLoggedIn, loading } = useAuth();
  console.log('로그인 상태:', isLoggedIn);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (isMobile) {
    return (
      <MobileDisplay>
        <Flex alignItems='center' justifyContent='center'>
          데스크톱만 지원합니다
        </Flex>
      </MobileDisplay>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ToastContainer
          closeOnClick
          draggable
          pauseOnFocusLoss
          pauseOnHover
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          position='top-center'
          rtl={false}
          style={{ width: '21.875rem', lineHeight: '1.5rem' }}
          theme='light'
        />

        <Routes>
          <Route element={<LoginPage />} path='/' />
          <Route element={<OAuthRedirectHandler />} path='/api/oauth2/callback/:provider' />
          <Route element={<Error403Page />} path='/error/403' />

          <Route
            element={
              <SSEProvider url=''>
                <Routes>
                  <Route element={<Error404Page />} path='*' />

                  <Route
                    element={
                      <ProtectedRoute>
                        <PersonalDashboard />
                      </ProtectedRoute>
                    }
                    path='/personal/:id'
                  >
                    <Route
                      element={
                        <ProtectedRoute>
                          <SidePage />
                        </ProtectedRoute>
                      }
                      path=':blockId'
                    />
                  </Route>

                  <Route
                    element={
                      <ProtectedRoute>
                        <TeamDashBoard />
                      </ProtectedRoute>
                    }
                    path='/team/:id'
                  >
                    <Route
                      element={
                        <ProtectedRoute>
                          <SidePage />
                        </ProtectedRoute>
                      }
                      path=':blockId'
                    />
                  </Route>

                  <Route
                    element={
                      <ProtectedRoute>
                        <CreateBoard />
                      </ProtectedRoute>
                    }
                    path='/createBoard'
                  />
                  <Route
                    element={
                      <ProtectedRoute>
                        <CreatePersonalBoard />
                      </ProtectedRoute>
                    }
                    path='/createPersonalBoard'
                  />
                  <Route
                    element={
                      <ProtectedRoute>
                        <CreatePersonalBoard />
                      </ProtectedRoute>
                    }
                    path='/createPersonalBoard/:id'
                  />
                  <Route
                    element={
                      <ProtectedRoute>
                        <CreateTeamBoard />
                      </ProtectedRoute>
                    }
                    path='/createTeamBoard'
                  />
                  <Route
                    element={
                      <ProtectedRoute>
                        <CreateTeamBoard />
                      </ProtectedRoute>
                    }
                    path='/createTeamBoard/:id'
                  />
                  <Route
                    element={
                      <ProtectedRoute>
                        <MyPage />
                      </ProtectedRoute>
                    }
                    path='/mypage'
                  />
                  <Route
                    element={
                      <ProtectedRoute>
                        <FriendPage />
                      </ProtectedRoute>
                    }
                    path='/friendpage/:id'
                  />
                  <Route
                    element={
                      <ProtectedRoute>
                        <ProfileEdit />
                      </ProtectedRoute>
                    }
                    path='/mypage/edit'
                  />

                  <Route
                    element={
                      <ProtectedRoute>
                        <TeamDocumentBoard />
                      </ProtectedRoute>
                    }
                    path='/:id/teamdocument'
                  >
                    <Route
                      element={
                        <ProtectedRoute>
                          <TeamDocument />
                        </ProtectedRoute>
                      }
                      path=':documentId'
                    />
                  </Route>

                  <Route
                    element={
                      <ProtectedRoute>
                        <ChallengeCommunityPage />
                      </ProtectedRoute>
                    }
                    path='/challenge'
                  />
                  <Route
                    element={
                      <ProtectedRoute>
                        <CreateChallengePage />
                      </ProtectedRoute>
                    }
                    path='/challenge/create'
                  />
                  <Route
                    element={
                      <ProtectedRoute>
                        <CreateChallengePage />
                      </ProtectedRoute>
                    }
                    path='/challenge/create/:id'
                  />
                  <Route
                    element={
                      <ProtectedRoute>
                        <ChallengeDetailPage />
                      </ProtectedRoute>
                    }
                    path='/challenge/:id'
                  />
                  <Route
                    element={
                      <ProtectedRoute>
                        <TutorialPage />
                      </ProtectedRoute>
                    }
                    path='/tutorial'
                  />

                  <Route
                    element={
                      <ProtectedRoute>
                        <FriendsPage />
                      </ProtectedRoute>
                    }
                    path='/friends'
                  />

                  <Route
                    element={
                      <ProtectedRoute>
                        <FriendsSearchPage />
                      </ProtectedRoute>
                    }
                    path='/friends/search'
                  />

                  <Route
                    element={
                      <ProtectedRoute>
                        <RecommendedFriendsPage />
                      </ProtectedRoute>
                    }
                    path='/friends/recommend'
                  />

                  <Route
                    element={
                      <ProtectedRoute>
                        <NoticePage />
                      </ProtectedRoute>
                    }
                    path='/notice'
                  />
                </Routes>
              </SSEProvider>
            }
            path='/*'
          />
        </Routes>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;

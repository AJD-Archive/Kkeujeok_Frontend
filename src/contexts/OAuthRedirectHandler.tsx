import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Loading from '../components/Loading';
import { useAuth } from '../contexts/AuthContext';

interface LoginToken {
  accessToken: string;
  refreshToken: string;
}

const OAuthRedirectHandler = () => {
  const { provider } = useParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loginToken, setLoginToken] = useState<LoginToken>({
    accessToken: '',
    refreshToken: '',
  });

  const getToken = async (authCode: string, provider: string) => {
    try {
      const idTokenResponse = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/oauth2/callback/${provider}?code=${authCode}`,
      );

      const tokenResponse = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/${provider}/token`, {
        authCode: idTokenResponse.data.idToken,
      });

      if (tokenResponse.data.data) {
        setLoginToken(tokenResponse.data.data);
      }
    } catch (error) {
      console.error('토큰을 가져오는데 실패했습니다.', error);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code && provider) {
      // Todo: 해당 라인 수정해야함.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      getToken(code, provider);
    }
  }, [provider]);

  useEffect(() => {
    if (loginToken.accessToken) {
      login(loginToken);

      // * 마지막에 방문한 대시보드가 있다면 해당 대시보드로 이동, 없다면 튜토리얼 페이지로 이동
      const latestBoard = localStorage.getItem('LatestBoard');
      const dashboardSort = localStorage.getItem('PageSort');
      navigate(latestBoard ? `/${dashboardSort}/${latestBoard}` : '/tutorial');
    }
  }, [loginToken, login, navigate]);

  // * 로그인 처리 중일때 보여질 로딩창
  return <Loading />;
};

export default OAuthRedirectHandler;

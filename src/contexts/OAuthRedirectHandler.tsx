import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Loading from '../components/Loading';

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

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code && provider) {
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

  const getToken = async (authCode: string, provider: string) => {
    try {
      const idTokenResponse = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/oauth2/callback/${provider}?code=${authCode}`
      );

      const tokenResponse = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/${provider}/token`,
        {
          authCode: idTokenResponse.data.idToken,
        }
      );

      if (tokenResponse.data.data) {
        setLoginToken(tokenResponse.data.data);
      }
    } catch (error) {
      console.error('토큰을 가져오는데 실패했습니다.', error);
    }
  };

  // * 로그인 처리 중일때 보여질 로딩창
  return <Loading />;
};

export default OAuthRedirectHandler;

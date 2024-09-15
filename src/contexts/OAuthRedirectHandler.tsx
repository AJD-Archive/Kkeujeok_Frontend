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
  const { provider } = useParams(); // Get the provider from the route parameters
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
      navigate('/'); // 기본 대시보드 불러올 라우터로 설정 (가장 마지막에 방문한 대시보드를 기준으로)
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

  return <Loading />;
};

export default OAuthRedirectHandler;

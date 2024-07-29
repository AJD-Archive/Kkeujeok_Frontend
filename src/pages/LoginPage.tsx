import React from 'react';
import { Container } from '../styles/LoginPageStyled';
import logo from '../img/Kkeujeok_logo2.png';
import kakaoLogin from '../img/kakaoLogin.png';
import googleLogin from '../img/googleLogin.png';
import ThreeScene from '../components/ThreeScene';

const LoginPage: React.FC = () => {
  const kakaoHandleLogin = () => {
    localStorage.setItem('provider', 'kakao');
    window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}`;
  };

  const googleHandleLogin = () => {
    localStorage.setItem('provider', 'google');
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URI}&response_type=code&scope=email profile`;
  };

  return (
    <Container>
      <div className="threeScene">
        <ThreeScene />
      </div>

      <div className="loginBox">
        <img src={logo} alt="logo" className="logo" />
        <p className="subTitle">로그인하고 더 많은 하루를 계획하세요!</p>

        <div className="socialLogin">
          <img src={kakaoLogin} alt="kakaoLogin" onClick={kakaoHandleLogin} />
          <img src={googleLogin} alt="googleLogin" onClick={googleHandleLogin} />
        </div>
      </div>
    </Container>
  );
};

export default LoginPage;

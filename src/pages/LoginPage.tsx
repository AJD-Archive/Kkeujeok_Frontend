import React from 'react';
import { Container } from '../styles/LoginPageStyled';
import logo from '../img/Kkeujeok_logo.png';
import kakaoLogin from '../img/kakaoLogin.png';
import googleLogin from '../img/googleLogin.png';

const LoginPage = () => {
  return (
    <Container>
      <div className="loginBox">
        <img src={logo} alt="logo" className="logo" />
        <p className="subTitle">로그인하고 더 많은 하루를 계획하세요!</p>

        <div className="socialLogin">
          <img src={kakaoLogin} alt="kakaoLogin" />
          <img src={googleLogin} alt="googleLogin" />
        </div>
      </div>
    </Container>
  );
};
export default LoginPage;
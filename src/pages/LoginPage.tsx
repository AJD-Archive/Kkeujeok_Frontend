import React from 'react';
import { Container } from '../styles/LoginPageStyled';
import logo from '../img/Kkeujeok_logo2.png';
import kakaoLogin from '../img/kakaoLogin.png';
import googleLogin from '../img/googleLogin.png';
import ThreeScene from '../components/ThreeScene';

const LoginPage = () => {
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
      <div className="drawLogo">
        {/* <ThreeScene /> */}
        <svg
          width="531"
          height="166.5"
          viewBox="0 0 354 111"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="kkeujeok"
        >
          <path
            d="M4 19.0656C11 13.5656 29.3 4.7656 46.5 13.5656M46.5 13.5656C45.6667 29.7323 36.6069 73.9612 24 67.5657C15 63 27.5 24.5 46.5 13.5656ZM46.5 13.5656C64 4.56564 92.4 2.76572 66 67.5657"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path d="M4 82.5C18 85.3333 54 89 86 81" strokeWidth="8" strokeLinecap="round" />
          <path
            d="M89 11.9282C93.8333 10.0949 107.6 6.82825 124 8.42825C129.652 8.97967 131.769 13.408 131.63 19.4287M131.63 19.4287C131.265 35.2449 115.329 62.0502 107 58.4287C95.5 53.4287 119.761 9.42871 131.63 19.4287ZM131.63 19.4287C137.42 21.262 148 31.3287 144 56.9287"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M145 19.5C149.833 20.3333 161.1 21.2 167.5 18"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M165 4C167.167 9.33333 170.2 27.1 165 55.5"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M106 79.6438C107.506 79.6438 192.331 40.0051 157.698 107"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path d="M186 82.5C200 85.3333 236 89 268 81" strokeWidth="8" strokeLinecap="round" />
          <path
            d="M271 11.9282C275.833 10.0949 289.6 6.82825 306 8.42825C311.652 8.97967 313.769 13.408 313.63 19.4287M313.63 19.4287C313.265 35.2449 297.329 62.0502 289 58.4287C277.5 53.4287 301.761 9.42871 313.63 19.4287ZM313.63 19.4287C319.42 21.262 330 31.3287 326 56.9287"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M327 19.5C331.833 20.3333 343.1 21.2 349.5 18"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M347 4C349.167 9.33333 352.2 27.1 347 55.5"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M288 79.6438C289.506 79.6438 374.331 40.0051 339.698 107"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M186 19.9774C195.5 15.3108 216.4 7.77745 224 14.9774M224 14.9774C233.5 23.9774 231 62.4775 218 70.4775C205 78.4775 209.5 20.9774 224 14.9774Z"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M224 14.7773C233.5 10.1107 247.4 5.55449 255 12.7545M255 12.7545C264.5 21.7545 262 60.2546 249 68.2546C236 76.2546 240.5 18.7544 255 12.7545Z"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M223.036 41.1342C224.913 37.2689 226.529 39.5237 227.102 41.1342C227.78 43.5202 228.728 49.2226 227.102 52.9448C225.476 56.667 223.714 54.4957 223.036 52.9448C222.254 50.6185 221.16 44.9996 223.036 41.1342Z"
            strokeWidth="8"
            strokeLinecap="round"
            className="fill-delay"
          />
          <path
            d="M254.036 41.1342C255.913 37.2689 257.529 39.5237 258.102 41.1342C258.78 43.5202 259.728 49.2226 258.102 52.9448C256.476 56.667 254.714 54.4957 254.036 52.9448C253.254 50.6185 252.16 44.9996 254.036 41.1342Z"
            strokeWidth="8"
            strokeLinecap="round"
            className="fill-delay"
          />
        </svg>
      </div>

      <div className="circles">
        <svg
          width="100%"
          height="auto"
          viewBox="0 0 1000 1000"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="circle"
        >
          <circle
            cx="447.5"
            cy="278.5"
            r="278.5"
            fill="url(#paint0_radial_29_2)"
            className="circle1"
          />
          <circle
            cx="639.5"
            cy="551.5"
            r="278.5"
            fill="url(#paint1_radial_29_2)"
            className="circle2"
          />
          <circle
            cx="278.5"
            cy="543.5"
            r="278.5"
            fill="url(#paint2_radial_29_2)"
            className="circle3"
          />
          <defs>
            <radialGradient
              id="paint0_radial_29_2"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(447.5 278.5) rotate(90) scale(278.5)"
            >
              <stop stopColor="#4C8CFF" />
              <stop offset="1" stopColor="#4C8CFF" stopOpacity="0" />
            </radialGradient>
            <radialGradient
              id="paint1_radial_29_2"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(639.5 551.5) rotate(90) scale(278.5)"
            >
              <stop stopColor="#9847FF" />
              <stop offset="1" stopColor="#9847FF" stopOpacity="0" />
            </radialGradient>
            <radialGradient
              id="paint2_radial_29_2"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(278.5 543.5) rotate(90) scale(278.5)"
            >
              <stop stopColor="#00D1FF" />
              <stop offset="1" stopColor="#00D1FF" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      <div
        className="loginBox"
        data-aos="fade-right"
        data-aos-duration="2000"
        data-aos-easing="ease-out-cubic"
        data-aos-delay="500"
      >
        {/* <img src={logo} alt="logo" className="logo" /> */}
        <p className="title">Login</p>
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

import { Navigate, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import * as S from '../styles/ErrorPageStyled';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <S.Layout>
      {/* <svg
        width="110.625"
        height="34.6875"
        viewBox="0 0 177 55.5"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 9.5328C5.5 6.7828 14.65 2.3828 23.25 6.7828M23.25 6.7828C22.8335 14.8662 20.75 33.7828 12 33.7828C9.25 30 12.25 16.3828 23.25 6.7828ZM23.25 6.7828C32 2.28282 46.2 1.38286 33 33.7828"
          stroke="url(#paint0Linear1996_8)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M2 41.25C9 42.6667 27 44.5 43 40.5"
          stroke="url(#paint1Linear1996_8)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M44.5 5.9641C46.9167 5.04745 53.8 3.41412 62 4.21412C64.826 4.48984 65.8845 6.704 65.815 9.71435M65.815 9.71435C65.6325 17.6224 57.6645 31.0251 53.5 29.21435C47.75 26.71435 59.8805 4.71436 65.815 9.71435ZM65.815 9.71435C68.71 10.631 74 15.664 72 28.464"
          stroke="url(#paint2Linear1996_8)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M72.5 9.75C74.9165 10.1667 80.55 10.6 83.75 9"
          stroke="url(#paint3Linear1996_8)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M82.5 2C83.5835 4.66667 85.1 13.55 82.5 27.75"
          stroke="url(#paint4Linear1996_8)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M53 39.8219C53.503 39.8219 96.1655 20.0026 78.849 53.5"
          stroke="url(#paint5Linear1996_8)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M93 41.25C100 42.6667 118 44.5 134 40.5"
          stroke="url(#paint6Linear1996_8)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M135.5 5.9641C138.916 5.04745 144.8 3.41412 153 4.21412C155.826 4.48984 156.884 6.704 156.815 9.71435M156.815 9.71435C156.632 17.6224 148.664 31.0251 145 29.21435C138.75 26.71435 150.8805 4.71436 156.815 9.71435ZM156.815 9.71435C159.71 10.631 165 15.664 163 28.464"
          stroke="url(#paint7Linear1996_8)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M163.5 9.75C165.916 10.1667 171.55 10.6 174.75 9"
          stroke="url(#paint8Linear1996_8)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M173.5 2C174.583 4.66667 176.1 13.55 173.5 27.75"
          stroke="url(#paint9Linear1996_8)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M144 39.8219C144.503 39.8219 187.165 20.0026 169.849 53.5"
          stroke="url(#paint10Linear1996_8)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M112 7.38865C116.75 5.05535 123.7 2.77725 127.5 6.37725M127.5 6.37725C132.25 10.87725 131 30.1273 124.5 34.1273C118 38.1273 120.25 9.37725 127.5 6.37725Z"
          stroke="url(#paint11Linear1996_8)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M127.018 20.5671C127.956 18.6345 128.765 19.7618 129.051 20.5671C129.39 21.7601 129.864 24.6113 129.051 26.4724C128.238 28.3334 127.357 27.2478 127.018 26.4724C126.627 25.3093 126.08 22.4998 127.018 20.5671Z"
          fill="#4C8CFF"
          stroke="url(#paint12Linear1996_8)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M93 9.9887C97.75 7.6554 108.2 3.88872 112 7.4887M112 7.4887C116.75 11.9887 115.5 31.2387 109 35.2387C102.5 39.2387 104.75 10.4887 112 7.4887Z"
          stroke="url(#paint13Linear1996_8)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M111.018 20.5671C111.956 18.6345 112.765 19.7618 113.051 20.5671C113.39 21.7601 113.864 24.6113 113.051 26.4724C112.238 28.3334 111.357 27.2478 111.018 26.4724C110.627 25.3093 110.08 22.4998 111.018 20.5671Z"
          fill="#4C8CFF"
          stroke="url(#paint14Linear1996_8)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient
            id="paint0Linear1996_8"
            x1="2"
            y1="19.1414"
            x2="38.3723"
            y2="19.1414"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#4C8CFF" />
            <stop offset="1" stopColor="#9847FF" />
          </linearGradient>
          <linearGradient
            id="paint1Linear1996_8"
            x1="2"
            y1="41.7129"
            x2="43"
            y2="41.7129"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#4C8CFF" />
            <stop offset="1" stopColor="#9847FF" />
          </linearGradient>
          <linearGradient
            id="paint2Linear1996_8"
            x1="44.5"
            y1="16.6904"
            x2="72.4405"
            y2="16.6904"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#4C8CFF" />
            <stop offset="1" stopColor="#9847FF" />
          </linearGradient>
          <linearGradient
            id="paint3Linear1996_8"
            x1="72.5"
            y1="9.568"
            x2="83.75"
            y2="9.568"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#4C8CFF" />
            <stop offset="1" stopColor="#9847FF" />
          </linearGradient>
          <linearGradient
            id="paint4Linear1996_8"
            x1="82.5"
            y1="14.875"
            x2="83.9355"
            y2="14.875"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#4C8CFF" />
            <stop offset="1" stopColor="#9847FF" />
          </linearGradient>
          <linearGradient
            id="paint5Linear1996_8"
            x1="53"
            y1="43.75"
            x2="83"
            y2="43.75"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#4C8CFF" />
            <stop offset="1" stopColor="#9847FF" />
          </linearGradient>
          <linearGradient
            id="paint6Linear1996_8"
            x1="93"
            y1="41.7129"
            x2="134"
            y2="41.7129"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#4C8CFF" />
            <stop offset="1" stopColor="#9847FF" />
          </linearGradient>
          <linearGradient
            id="paint7Linear1996_8"
            x1="135.5"
            y1="16.6904"
            x2="163.4405"
            y2="16.6904"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#4C8CFF" />
            <stop offset="1" stopColor="#9847FF" />
          </linearGradient>
          <linearGradient
            id="paint8Linear1996_8"
            x1="163.5"
            y1="9.568"
            x2="174.75"
            y2="9.568"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#4C8CFF" />
            <stop offset="1" stopColor="#9847FF" />
          </linearGradient>
          <linearGradient
            id="paint9Linear1996_8"
            x1="173.5"
            y1="14.875"
            x2="174.935"
            y2="14.875"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#4C8CFF" />
            <stop offset="1" stopColor="#9847FF" />
          </linearGradient>
          <linearGradient
            id="paint10Linear1996_8"
            x1="144"
            y1="43.75"
            x2="174"
            y2="43.75"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#4C8CFF" />
            <stop offset="1" stopColor="#9847FF" />
          </linearGradient>
          <linearGradient
            id="paint11Linear1996_8"
            x1="112"
            y1="23.3883"
            x2="130.3685"
            y2="23.3883"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#4C8CFF" />
            <stop offset="1" stopColor="#9847FF" />
          </linearGradient>
          <linearGradient
            id="paint12Linear1996_8"
            x1="126.5"
            y1="23.5"
            x2="129.5"
            y2="23.5"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#4C8CFF" />
            <stop offset="1" stopColor="#9847FF" />
          </linearGradient>
          <linearGradient
            id="paint13Linear1996_8"
            x1="93"
            y1="20.7198"
            x2="114.868"
            y2="20.7198"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#4C8CFF" />
            <stop offset="1" stopColor="#9847FF" />
          </linearGradient>
          <linearGradient
            id="paint14Linear1996_8"
            x1="111"
            y1="23.5"
            x2="114"
            y2="23.5"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#4C8CFF" />
            <stop offset="1" stopColor="#9847FF" />
          </linearGradient>
        </defs>
      </svg> */}

      <S.Title>404 ERROR</S.Title>

      <S.Content>
        죄송합니다. 페이지를 찾을 수 없습니다.
        <br />
        존재하지 않는 주소를 입력하셨거나,
        <br />
        요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.
      </S.Content>

      <S.HomeLink onClick={() => navigate('/')}>홈으로</S.HomeLink>
    </S.Layout>
  );
};

export default ErrorPage;

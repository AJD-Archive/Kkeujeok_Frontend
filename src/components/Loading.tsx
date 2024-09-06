import React, { useEffect } from 'react';
import { Container } from '../styles/LoadingStyled';
import { useNavigate } from 'react-router-dom';
import Qudy from '../image/Qtudy_char.png';
import axios from 'axios';

const Loading = () => {
  return (
    <Container>
      <div className="spinner"></div>
      <svg
        width="4rem"
        height="3rem"
        viewBox="0 0 90 85"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 77.5C18 80.3333 54 84 86 76"
          stroke="url(#paint0_linear_1255_21)"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          d="M42 9.77734C51.5 5.11068 65.4 0.554493 73 7.75449M73 7.75449C82.5 16.7545 80 55.2546 67 63.2546C54 71.2546 58.5 13.7544 73 7.75449Z"
          stroke="url(#paint1_linear_1255_21)"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          d="M72.0362 36.1342C73.9127 32.2689 75.5287 34.5237 76.1021 36.1342C76.7797 38.5202 77.7283 44.2226 76.1021 47.9448C74.4758 51.667 72.7138 49.4957 72.0362 47.9448C71.2542 45.6185 70.1596 39.9996 72.0362 36.1342Z"
          fill="#4C8CFF"
          stroke="url(#paint2_linear_1255_21)"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          d="M4 14.9774C13.5 10.3108 34.4 2.77745 42 9.97745M42 9.97745C51.5 18.9774 49 57.4775 36 65.4775C23 73.4775 27.5 15.9774 42 9.97745Z"
          stroke="url(#paint3_linear_1255_21)"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          d="M41.0362 36.1342C42.9127 32.2689 44.5287 34.5237 45.1021 36.1342C45.7797 38.5202 46.7283 44.2226 45.1021 47.9448C43.4758 51.667 41.7138 49.4957 41.0362 47.9448C40.2542 45.6185 39.1596 39.9996 41.0362 36.1342Z"
          fill="#4C8CFF"
          stroke="url(#paint4_linear_1255_21)"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient
            id="paint0_linear_1255_21"
            x1="4"
            y1="78.4258"
            x2="86"
            y2="78.4258"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#4C8CFF" />
            <stop offset="1" stopColor="#9847FF" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_1255_21"
            x1="42"
            y1="34.0083"
            x2="78.7373"
            y2="34.0083"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#4C8CFF" />
            <stop offset="1" stopColor="#9847FF" />
          </linearGradient>
          <linearGradient
            id="paint2_linear_1255_21"
            x1="71"
            y1="42"
            x2="77"
            y2="42"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#4C8CFF" />
            <stop offset="1" stopColor="#9847FF" />
          </linearGradient>
          <linearGradient
            id="paint3_linear_1255_21"
            x1="4"
            y1="36.6197"
            x2="47.7373"
            y2="36.6197"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#4C8CFF" />
            <stop offset="1" stopColor="#9847FF" />
          </linearGradient>
          <linearGradient
            id="paint4_linear_1255_21"
            x1="40"
            y1="42"
            x2="46"
            y2="42"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#4C8CFF" />
            <stop offset="1" stopColor="#9847FF" />
          </linearGradient>
        </defs>
      </svg>
    </Container>
  );
};
export default Loading;

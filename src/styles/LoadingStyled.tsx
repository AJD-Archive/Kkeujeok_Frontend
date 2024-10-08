import styled, { keyframes } from 'styled-components';
import theme from './Theme/Theme';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: white;

  display: flex;
  justify-content: center;
  align-items: center;

  .spinner {
    position: absolute;
    border: 10px solid rgba(0, 0, 0, 0.1); /* 스피너의 배경색 */
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
    border-left-color: ${theme.color.gray}; /* 스피너의 색상 */
    animation: ${rotate} 1s ease-in-out infinite;
  }

  .logo {
    stroke: ${theme.color.main};
  }
`;

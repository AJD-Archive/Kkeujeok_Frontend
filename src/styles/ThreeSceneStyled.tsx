import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html, body {
    overflow: hidden;
    -webkit-overflow-scrolling: auto;
    position: fixed;
  }
  body {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    touch-action: pan-left, pan-right, pan-up, pan-down;
  }
`;

export const CanvasContainer = styled.div`
  canvas {
    width: 20vw !important;
    height: 20vw !important;
    clip-path: circle(calc(50% - 1px));
  }
`;

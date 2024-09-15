import styled from 'styled-components';
import background_login from '../img/background_login.png';
import theme from './Theme/Theme';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  /* background-image: url(${background_login});
  background-size: cover;
  background-position: center; */

  /* background: linear-gradient(180deg, #9847ff 0%, #00d1ff 50%, #4c8cff 100%); */
  background: linear-gradient(to left, #f8fbff, #e9f2ff);

  display: flex;
  justify-content: center;
  align-items: center;

  .drawLogo {
    width: 60vw;
    height: 100vh;
    position: absolute;
    right: 0;
    z-index: 1;

    overflow: hidden;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .circles {
    width: 60vw;
    height: 100vh;
    position: absolute;
    right: 0;

    /* background-color: red; */
  }

  .loginBox {
    width: 40vw;
    height: 50vh;

    position: absolute;
    left: 0;

    /* background-color: rgba(255, 255, 255, 0.536); */
    /* background-color: red; */
    /* background: linear-gradient(90deg, #9847ff 0%, #00d1ff 50%, #4c8cff 100%); */
    border-radius: 0 100px 100px 0;
    backdrop-filter: blur(1rem);
    /* border: 3px solid ${theme.color.lightGray}; */
    border-left: none;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .logo {
    width: 10rem;
  }

  .title {
    font-size: 3rem;
    font-weight: bold;
    color: ${theme.color.main};
  }

  .subTitle {
    margin-top: 1.5rem;
    font-size: 1rem;
    color: ${theme.color.gray};
  }

  .socialLogin {
    margin-top: 2rem;

    display: flex;
    flex-direction: column;
  }

  .socialLogin > img {
    width: 15rem;
    margin: 0.5rem 0;
    filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.03));

    cursor: pointer;
  }

  // * svg 애니메이션
  .kkeujeok {
    stroke-dasharray: 500;
    stroke-dashoffset: 500;
    /* animation: draw 10s ease-in-out infinite; */
    animation: draw 10s linear infinite;

    stroke: white;
  }

  @keyframes draw {
    0% {
      stroke-dashoffset: 500;
    }
    50% {
      stroke-dashoffset: 0;
    }
    100% {
      stroke-dashoffset: -500;
    }
  }

  .fill-delay {
    opacity: 0; /* Initially hidden */
    fill: none;
    animation: fadeIn 500ms ease-out 2.5s forwards; /* Fade in after the line is drawn */
  }

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }

  .circle {
    /* margin-top: 5vh; */
  }

  // 첫 번째 원 애니메이션
  .circle1 {
    animation: moveAndChange1 10s ease-in-out infinite;
  }

  @keyframes moveAndChange1 {
    0% {
      transform: scale(1) translate(100px, 100px);
      opacity: 0.4;
    }
    50% {
      transform: scale(1.2) translate(-90px, 10px);
      opacity: 0.7;
    }
    100% {
      transform: scale(1) translate(100px, 100px);
      opacity: 0.4;
    }
  }

  // 두 번째 원 애니메이션
  .circle2 {
    animation: moveAndChange2 7s ease-in-out infinite;
  }

  @keyframes moveAndChange2 {
    0% {
      transform: scale(1) translate(10px, 0);
      opacity: 0.3;
    }
    50% {
      transform: scale(1.05) translate(80px, 80px);
      opacity: 0.65;
    }
    100% {
      transform: scale(1) translate(10px, 0);
      opacity: 0.3;
    }
  }

  // 세 번째 원 애니메이션
  .circle3 {
    animation: moveAndChange3 9s ease-in-out infinite;
  }

  @keyframes moveAndChange3 {
    0% {
      transform: scale(1) translate(0, 0);
      opacity: 0.5;
    }
    50% {
      transform: scale(1.1) translate(-20px, 80px);
      opacity: 0.8;
    }
    100% {
      transform: scale(1) translate(0, 0);
      opacity: 0.5;
    }
  }
`;

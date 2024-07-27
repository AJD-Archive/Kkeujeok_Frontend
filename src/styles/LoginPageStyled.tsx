import styled from 'styled-components';
import background_login from '../img/background_login.png';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  /* background-image: url(${background_login});
  background-size: cover;
  background-position: center; */

  background: linear-gradient(180deg, #9847ff 0%, #00d1ff 50%, #4c8cff 100%);

  display: flex;
  justify-content: center;
  align-items: center;

  .threeScene {
    height: 100vh;
    position: absolute;
    right: 0;

    overflow: hidden;
  }

  /* .loginBox {
    padding: 5rem 5rem;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.5);
    box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(40px);
    border-radius: 32px;
  } */
  .loginBox {
    width: 40vw;
    height: 50vh;

    position: absolute;
    left: 0;

    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 0 100px 100px 0;
    backdrop-filter: blur(1rem);

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .logo {
    width: 10rem;
  }

  .subTitle {
    margin-top: 1.5rem;
    font-size: 1rem;
    color: #4c8cff;
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
`;

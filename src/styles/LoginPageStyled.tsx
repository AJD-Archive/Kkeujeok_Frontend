import styled from 'styled-components';
import background_login from '../img/background_login.png';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  /* background-image: url(${background_login});
  background-size: cover;
  background-position: center; */

  background: linear-gradient(90deg, #bfd6ff 0%, #4c8cff 100%);

  display: flex;
  justify-content: center;
  align-items: center;

  .loginBox {
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
  }

  .logo {
    width: 10rem;
  }

  .subTitle {
    margin-top: 1.5rem;
    font-size: 1rem;
    color: white;
  }

  .socialLogin {
    margin-top: 2rem;

    display: flex;
    flex-direction: column;
  }

  .socialLogin > img {
    width: 15rem;
    margin: 0.5rem 0;

    cursor: pointer;
  }
`;

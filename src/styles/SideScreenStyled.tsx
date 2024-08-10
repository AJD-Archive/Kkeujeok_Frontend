import { styled } from 'styled-components';

export const SideScreenContainer = styled.div`
  background: rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  backdrop-filter: blur(4px);
`;

export const SideScreen = styled.div`
  position: absolute;
  top: 0;
  right: 0;

  width: 70%;
  height: 100%;
  padding: 4.0625rem 3.1875rem;
  background-color: white;

  box-shadow: -10px 0px 100px 10px rgba(0, 0, 0, 0.1);

  hr {
    margin-bottom: 1.6875rem;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.8125rem;
  h1 {
    font-size: 24px;
  }

  img {
    width: 20px;
    height: 20px;
  }
`;

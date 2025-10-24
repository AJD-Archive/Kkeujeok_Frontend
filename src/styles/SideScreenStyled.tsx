import { styled } from 'styled-components';

import theme from './Theme/Theme';

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

  input {
    width: 100%;
    margin-right: 1rem;

    outline: none;
    border: none;
    font-size: 20px;
    font-weight: 900;
  }

  input::placeholder {
    color: ${theme.color.lightGray};
  }
`;

export const ImgWrapper = styled.div`
  width: 15px;
  height: 15px;
  position: absolute;
  top: 20px;
  left: 20px;

  img {
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
`;

export const TextEditingWrapper = styled.div`
  &:focus {
    outline: none;
  }

  &:empty:not(:focus)::before {
    content: '여기에 글을 입력해주세요';
    color: ${theme.color.lightGray};
  }

  div {
    margin: 0.625rem 0;
  }
`;

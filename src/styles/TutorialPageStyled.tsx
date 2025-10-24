import { styled } from 'styled-components';

import theme from './Theme/Theme';

export const MainDashBoardLayout = styled.div`
  width: 100vw;
  min-width: 100vw;
  height: 100vh;
  display: flex;
`;

export const MainDashBoardContainer = styled.section`
  width: 100%;
  padding: 6rem 2.5rem;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  hr {
    border: 1px solid #f4f4f4;
  }
`;

export const Title = styled.p`
  font-size: 1.6rem;
  font-weight: ${theme.font.weight.bold};
  color: ${theme.color.text};
`;

export const SubTitle = styled.p`
  margin-top: 2rem;
  font-size: ${theme.font.size.mainTitle};
  font-weight: ${theme.font.weight.medium};
  color: ${theme.color.gray};
`;

export const tutorialContainer = styled.div`
  width: fit-content;
  /* padding: 3rem 4rem; */
  padding-left: 3rem;
  margin-top: 0.8rem;

  display: flex;
  align-items: center;

  border-radius: 1rem;
  border: 1px solid ${theme.color.stroke2};
  box-shadow: ${theme.boxShadow.default};
  cursor: pointer;
`;

export const content = styled.p`
  margin-top: 1rem;
  line-height: 1.2rem;
  font-size: ${theme.font.size.caption};
  font-weight: ${theme.font.weight.medium};
  color: ${theme.color.gray};
`;

export const TutorialImage = styled.img`
  width: 16rem;
  margin-left: 3rem;
  border-radius: 0 1rem 1rem 0;
  filter: grayscale(100%); // 이미지 흑백 처리
`;

import styled from 'styled-components';
import theme from '../styles/Theme/Theme';

export const CreateDashBoardLayout = styled.div`
  width: 100vw;
  min-width: 100vw;
  height: 100vh;
  display: flex;
`;

export const CreateDashBoardContainer = styled.section`
  width: 100%;
  padding: 4.3125rem 2.5rem;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.p`
  font-size: 1.5rem;
  font-weight: ${theme.font.weight.bold};
  color: ${theme.color.text};
`;

export const SubTitle = styled.p`
  margin-top: 1rem;
  font-size: ${theme.font.size.mainTitle};
  font-weight: ${theme.font.weight.medium};
  color: ${theme.color.gray};
`;

export const LinksContainer = styled.div`
  margin-top: 7rem;
`;

export const CreateBoardWrapper = styled.div`
  margin: 0 2rem;
  border-radius: 1rem;
  border: 1px solid ${theme.color.stroke2};
  box-shadow: ${theme.boxShadow.default};
`;

export const PersonalIconImgWrapper = styled.div`
  img {
    width: 2.5rem;
  }
`;

export const TeamIconImgWrapper = styled.div`
  img {
    width: 3rem;
  }
`;

export const Explanation = styled.p`
  margin: 1rem 0 3rem 0;
  line-height: 1rem;
  font-size: ${theme.font.size.caption};
  font-weight: ${theme.font.weight.light};
  color: ${theme.color.gray};
`;

export const BoardTitle = styled.p`
  margin: auto;
  font-size: ${theme.font.size.main};
  font-weight: ${theme.font.weight.bold};
  color: ${theme.color.text};
`;

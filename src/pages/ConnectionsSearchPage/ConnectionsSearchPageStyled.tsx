import { styled } from 'styled-components';
import theme from '../../styles/Theme/Theme';

export const MainDashBoardLayout = styled.div`
  width: 100vw;
  min-width: 100vw;
  height: 100vh;
  display: flex;
`;

export const MainDashBoardContainer = styled.section`
  width: 100%;
  padding: 4.3125rem 2.5rem;
  overflow: hidden;
  hr {
    border: 1px solid #f4f4f4;
  }
`;

export const HeaderLayout = styled.div`
  padding-bottom: 13px;
  border-bottom: 1px solid #f4f4f4;
  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    width: 1.5rem;
    cursor: pointer;
  }
`;

export const TitleWrapper = styled.div`
  p {
    font-size: 1.5rem;
    font-weight: ${theme.font.weight.bold};
    margin-right: 13px;
  }
`;

export const SecondaryTitleWrapper = styled(TitleWrapper)`
  p {
    font-size: 1rem;
    color: ${theme.color.gray};
    cursor: pointer;
  }
`;

export const SectionTitleWrapper = styled.div`
  p {
    width: 85%;
    margin: 0 auto;
    margin-top: 2rem;
    font-size: 1rem;
    color: ${theme.color.gray};
  }
`;

export const ConnectionsWrapper = styled.div`
  width: 100%;
  height: fit-content;
  margin-top: 1rem;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  overflow: hidden;

  &:after {
    content: '';
    flex-basis: calc(100% / 2 - 5rem); /* 빈 공간을 채워서 왼쪽 정렬처럼 보이게 함 */
  }
`;

export const SearchLayout = styled.div`
  width: 100%;
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SearchBarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 30rem;
  padding: 0.8rem 2rem;
  font-size: 0.8rem;
  border-radius: 5rem;
  border: 1px solid ${theme.color.stroke2};
  &:focus {
    outline: none;
  }

  svg {
    margin-right: 1rem;
  }
`;

export const InputWrapper = styled.input`
  width: 100%;
  border: none;
  &:focus {
    outline: none;
  }
`;

export const Button = styled.button`
  margin-left: 0.5rem;
  padding: 0.8rem 1rem;
  border-radius: 5rem;
  background-color: ${theme.color.lightGray};
  color: ${theme.color.white};
  &:hover {
    background-color: ${theme.color.gray};
  }
`;

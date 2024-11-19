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

export const FriendsWrapper = styled.div`
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

export const NoResultWrapper = styled.div`
  width: 100%;
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  p {
    width: fit-content;
    color: ${theme.color.gray};
    font-size: ${theme.font.size.caption};
  }
`;

export const PaginationWrapper = styled.div`
  width: 100%;
  margin-top: 1rem;
  display: flex;
  justify-content: center;
`;

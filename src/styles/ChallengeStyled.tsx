import { styled } from 'styled-components';
import theme from '../styles/Theme/Theme';

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

export const Header = styled.div`
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

export const Title = styled.p`
  font-size: 1.5rem;
  font-weight: ${theme.font.weight.bold};
`;

export const SubTitle = styled.p`
  margin-top: 0.5rem;
  font-size: 1rem;
  font-weight: ${theme.font.weight.medium};
  color: ${theme.color.gray};
  margin-right: 13px;
`;

export const CategoriesContainer = styled.p`
  margin: 2rem 0;
  display: flex;
  overflow-y: scroll;
`;

export const Category = styled.p`
  width: fit-content;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  margin-right: 0.7rem;
  white-space: nowrap;
  font-size: 0.8rem;
  color: ${theme.color.gray};
  background-color: ${theme.color.stroke2};
  cursor: pointer;
  background:
    linear-gradient(white, white) padding-box,
    linear-gradient(45deg, rgba(76, 140, 255, 0.5), rgba(152, 71, 255, 0.5)) border-box;
  border: 3px solid transparent;
  &:hover {
    background: linear-gradient(45deg, ${theme.color.main}, ${theme.color.main2}) border-box;
    color: ${theme.color.white};
  }
`;

export const SearchContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SearchBar = styled.div``;

export const Input = styled.input`
  width: 30rem;
  padding: 0.8rem 2rem;
  font-size: 0.8rem;
  border-radius: 5rem;
  border: 1px solid ${theme.color.lightGray};
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

export const ChallengeContainer = styled.div`
  width: 100%;
  margin-top: 2rem;
  height: 63%;
  display: flex;
  flex-wrap: wrap; /* 아이템이 컨테이너의 너비를 초과하면 자동으로 줄바꿈 */
  gap: 1rem; /* 아이템 간의 간격 */
  justify-content: center; /* 아이템들을 중앙 정렬 */
  overflow: hidden;
`;

export const ChallengeComponent = styled.div`
  margin-right: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ChallengeImg = styled.div`
  width: 9rem;
  height: 9rem;
  border-radius: 50%;
  background-color: ${theme.color.lightGray};
`;

export const ChallengeName = styled.p`
  margin-top: 1rem;
  font-size: 1.1rem;
  font-weight: ${theme.font.weight.semiBold};
`;

export const ChallengeHeadCount = styled.p`
  margin-top: 0.3rem;
  font-size: 0.8rem;
  font-weight: ${theme.font.weight.medium};
  color: ${theme.color.gray};
`;

export const PaginationWrapper = styled.div`
  width: 100%;
  margin-top: 1rem;
  display: flex;
  justify-content: center;
`;

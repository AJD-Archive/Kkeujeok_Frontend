import Navbar from '../components/Navbar';
import * as S from '../styles/ChallengeStyled';
import addbutton from '../img/addbutton.png';
import leftarrow from '../img/leftarrow.png';
import Flex from '../components/Flex';
import Pagination from '../components/CustomPagination';
import { useState } from 'react';
import ChallengeCard from '../components/ChallengeCard';
import { Link } from 'react-router-dom';

const ChallengeCommunityPage = () => {
  const [count, setCount] = useState<number>(1); // 총 페이지 수
  const [page, setPage] = useState<number>(1); // 현재 페이지

  // 페이지네이션 페이지 변경 감지 함수
  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value); // 페이지 변경 시 현재 페이지 상태 업데이트
  };

  return (
    <S.MainDashBoardLayout>
      <Navbar />
      <S.MainDashBoardContainer>
        <S.Header>
          <Flex>
            <img src={leftarrow} />
            <Flex flexDirection="column" alignItems="flex-start" margin="0 0 0 10px">
              <S.Title>챌린지</S.Title>
              <S.SubTitle>다른 참여자와 함께 이뤄나가요.</S.SubTitle>
            </Flex>
          </Flex>
          <Link to="create">
            <img src={addbutton} />
          </Link>
        </S.Header>

        <S.CategoriesContainer>
          <S.Category>카테고리 1</S.Category>
          <S.Category>카테고리 2</S.Category>
          <S.Category>카테고리 3</S.Category>
          <S.Category>카테고리 1</S.Category>
          <S.Category>카테고리 2</S.Category>
          <S.Category>카테고리 3</S.Category>
          <S.Category>카테고리 1</S.Category>
          <S.Category>카테고리 2</S.Category>
          <S.Category>카테고리 3</S.Category>
          <S.Category>카테고리 1</S.Category>
          <S.Category>카테고리 2</S.Category>
          <S.Category>카테고리 3</S.Category>
          <S.Category>카테고리 1</S.Category>
          <S.Category>카테고리 2</S.Category>
          <S.Category>카테고리 3</S.Category>
        </S.CategoriesContainer>

        <S.SearchContainer>
          <div className="searchBar">
            <S.Input placeholder="{name}님, {활동}은 어떠신가요?" type="text"></S.Input>
            <S.Button>검색</S.Button>
          </div>
        </S.SearchContainer>

        {/* 반응형 때문에 몇 개 렌더링 되는지 확인해야 함. 아니면 css 자체를 수정해야 함. */}
        <S.ChallengeContainer>
          <ChallengeCard />
          <ChallengeCard />
          <ChallengeCard />
          <ChallengeCard />
        </S.ChallengeContainer>

        <S.PaginationWrapper>
          <Pagination count={count} page={page} onChange={handleChangePage} />
        </S.PaginationWrapper>
      </S.MainDashBoardContainer>
    </S.MainDashBoardLayout>
  );
};

export default ChallengeCommunityPage;

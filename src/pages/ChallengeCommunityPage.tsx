import Navbar from '../components/Navbar';
import * as S from '../styles/ChallengeStyled';
import addbutton from '../img/addbutton.png';
import leftarrow from '../img/leftarrow.png';
import Flex from '../components/Flex';
import Pagination from '../components/CustomPagination';
import { useEffect, useState } from 'react';
import ChallengeCard from '../components/ChallengeCard';
import { Link } from 'react-router-dom';
import { Challenge, ChallengeCategory, ChallengeResponse } from '../types/ChallengeType';
import { getSearchChallenge } from '../api/ChallengeApi';

const ChallengeCommunityPage = () => {
  const [count, setCount] = useState<number>(1); // 총 페이지 수
  const [page, setPage] = useState<number>(1); // 현재 페이지
  const [pageInfo, setPageInfo] = useState<PageInfoResDto>({
    currentPage: 0,
    totalPages: 1,
    totalItems: 0,
  });
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [keyword, setKeyword] = useState<string>('');
  const [challenges, setChallenges] = useState<Challenge[]>();

  // * 페이지네이션 페이지 변경 감지 함수
  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value); // 페이지 변경 시 현재 페이지 상태 업데이트
    setPageInfo(prevPageInfo => ({
      ...prevPageInfo, // 기존 pageInfo 값을 유지
      currentPage: value - 1,
    }));
  };

  // * 카테고리로 선택하여 검색
  const handleCategoryClick = async (category: string) => {
    setSelectedCategory(category);
    setPage(1);
    setPageInfo(prevPageInfo => ({
      ...prevPageInfo, // 기존 pageInfo 값을 유지
      currentPage: 0,
    }));
  };

  // * 검색어 변경 함수
  // ? debounce 설정?
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  // * 팀 문서 카테고리별 검색 get
  const fetchDocumentData = async () => {
    const response = await getSearchChallenge(keyword, selectedCategory, pageInfo?.currentPage, 10);

    if (response) {
      console.log('이만큼 받아옴!', response);
      setChallenges(response.challengeInfoResDto);
      setPageInfo(response.pageInfoResDto);
    }
  };

  useEffect(() => {
    fetchDocumentData();
  }, [pageInfo.currentPage, location.pathname, selectedCategory, keyword]); // 페이지가 변경될 때와, 데이터가 변경되었을 때 (즉 라우터가 변경되었을 때) 리렌더링

  return (
    <S.MainDashBoardLayout>
      <Navbar />
      <S.MainDashBoardContainer>
        <S.Header>
          <Flex>
            {/* <img src={leftarrow} /> */}
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
          <S.Category onClick={() => handleCategoryClick('')} isSelected={selectedCategory === ''}>
            전체
          </S.Category>
          {Object.entries(ChallengeCategory).map(([key, value]) => (
            <S.Category
              key={key}
              onClick={() => handleCategoryClick(key)}
              isSelected={selectedCategory === key}
            >
              {value}
            </S.Category>
          ))}
        </S.CategoriesContainer>

        <S.SearchContainer>
          <S.SearchBar>
            <svg
              width="20"
              height="20"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.5 9.5L12.5 12.5"
                stroke="#D1D1D1"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5.75 10.5C8.37335 10.5 10.5 8.37335 10.5 5.75C10.5 3.12665 8.37335 1 5.75 1C3.12665 1 1 3.12665 1 5.75C1 8.37335 3.12665 10.5 5.75 10.5Z"
                stroke="#D1D1D1"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <S.Input
              placeholder="다양한 챌린지를 검색해보세요!"
              type="text"
              value={keyword}
              name="keyword"
              onChange={handleInput}
            ></S.Input>
            {/* <S.Button>검색</S.Button> */}
          </S.SearchBar>
        </S.SearchContainer>

        <Flex justifyContent="center">
          <S.ChallengeContainer>
            {challenges?.map((challenge, index) => (
              <ChallengeCard key={index} challenge={challenge} />
            ))}
          </S.ChallengeContainer>
        </Flex>

        <S.PaginationWrapper>
          <Pagination count={pageInfo?.totalPages} page={page} onChange={handleChangePage} />
        </S.PaginationWrapper>
      </S.MainDashBoardContainer>
    </S.MainDashBoardLayout>
  );
};

export default ChallengeCommunityPage;

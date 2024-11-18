import { Helmet } from 'react-helmet-async';
import Flex from '../../components/Flex';
import Navbar from '../../components/Navbar';
import * as S from './ConnectionsSearchPageStyled';
import leftarrow from '../../img/leftarrow.png';
import Connection from '../../components/Connection/Connection';
import Pagination from '../../components/CustomPagination';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import SearchIcon from './SearchIcon';
import { useSearchFriendsList } from '../../hooks/useFollowersList';
import { useDebounce } from '../../hooks/useDebounce';

const ConnectionsPage = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(0);
  const debouncedKeyword = useDebounce(keyword, 300); // debounce된 키워드로 검색

  const { data: followersList } = useSearchFriendsList(debouncedKeyword, currentPage, 8);

  // * 페이지네이션 페이지 변경 감지 함수
  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value - 1);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    setCurrentPage(0);
  };

  return (
    <>
      <Helmet>
        <title>끄적끄적 | 친구</title>
      </Helmet>
      <S.MainDashBoardLayout>
        <Navbar />
        <S.MainDashBoardContainer>
          <S.HeaderLayout>
            <Flex>
              <img src={leftarrow} onClick={() => navigate(`/mypage`)} />
              <S.TitleWrapper>
                <p>친구 찾기</p>
              </S.TitleWrapper>
              <S.SecondaryTitleWrapper onClick={() => navigate(`/friends/recommend`)}>
                <p>추천 친구</p>
              </S.SecondaryTitleWrapper>
              <S.SecondaryTitleWrapper onClick={() => navigate(`/connections`)}>
                <p>친구 목록</p>
              </S.SecondaryTitleWrapper>
            </Flex>
          </S.HeaderLayout>

          <S.SearchLayout>
            <S.SearchBarContainer>
              <SearchIcon />

              <S.InputWrapper
                placeholder="이름이나 이메일로 검색하기"
                type="text"
                value={keyword}
                name="keyword"
                onChange={handleInput}
              ></S.InputWrapper>
            </S.SearchBarContainer>
          </S.SearchLayout>

          <S.SectionTitleWrapper>
            <p>검색 결과</p>
          </S.SectionTitleWrapper>
          <S.ConnectionsWrapper>
            {followersList?.followInfoResDto.map((follower, index) => (
              <Connection key={index} follower={follower} />
            ))}
          </S.ConnectionsWrapper>

          {followersList?.followInfoResDto.length == 0 && (
            <S.NoResultWrapper>
              <p>검색 결과가 없습니다.</p>
            </S.NoResultWrapper>
          )}

          {followersList?.followInfoResDto.length !== 0 && (
            <S.PaginationWrapper>
              <Pagination
                count={followersList?.pageInfoResDto.totalPages ?? 1}
                page={currentPage + 1}
                onChange={handleChangePage}
              />
            </S.PaginationWrapper>
          )}
        </S.MainDashBoardContainer>
      </S.MainDashBoardLayout>
    </>
  );
};

export default ConnectionsPage;

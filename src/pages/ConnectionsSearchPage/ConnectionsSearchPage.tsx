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

const ConnectionsPage = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState<string>('');

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
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
              <S.SecondaryTitleWrapper onClick={() => navigate(`/connections`)}>
                <p>친구 목록</p>
              </S.SecondaryTitleWrapper>
            </Flex>
          </S.HeaderLayout>

          <S.SearchLayout>
            <S.SearchBarContainer>
              <SearchIcon />

              <S.InputWrapper
                placeholder="이메일 / 닉네임#고유번호로 검색하기"
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
            <Connection />
            <Connection />
            <Connection />
            <Connection />
          </S.ConnectionsWrapper>
        </S.MainDashBoardContainer>

        {/* 페이지네이션 */}
        {/* <S.PaginationWrapper>
          <Pagination count={pageInfo?.totalPages} page={page} onChange={handleChangePage} />
        </S.PaginationWrapper> */}
      </S.MainDashBoardLayout>
    </>
  );
};

export default ConnectionsPage;

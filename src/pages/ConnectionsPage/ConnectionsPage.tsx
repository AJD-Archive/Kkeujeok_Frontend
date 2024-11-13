import { Helmet } from 'react-helmet-async';
import Flex from '../../components/Flex';
import Navbar from '../../components/Navbar';
import * as S from './ConnectionsPageStyled';
import leftarrow from '../../img/leftarrow.png';
import Connection from '../../components/Connection/Connection';
import Pagination from '../../components/CustomPagination';
import { useNavigate } from 'react-router-dom';
import { useFollowersList } from '../../hooks/useFollowersList';
import { useState } from 'react';

const ConnectionsPage = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(0);

  const { data: followersList } = useFollowersList(currentPage, 8);
  console.log(followersList);

  // * 페이지네이션 페이지 변경 감지 함수
  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value - 1);
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
                <p>친구 목록</p>
              </S.TitleWrapper>
              <S.SecondaryTitleWrapper onClick={() => navigate(`/connectionsSearch`)}>
                <p>친구 찾기</p>
              </S.SecondaryTitleWrapper>
            </Flex>
          </S.HeaderLayout>

          <S.ConnectionsWrapper>
            {followersList?.followInfoResDto.map((follower, index) => (
              <Connection key={index} follower={follower} />
            ))}
          </S.ConnectionsWrapper>

          {followersList?.followInfoResDto.length == 0 && (
            <S.NoResultWrapper>
              <p>친구가 없습니다.</p>
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

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Pagination from '../../components/CustomPagination';
import Flex from '../../components/Flex';
import Friend from '../../components/Friend/Friend';
import Navbar from '../../components/Navbar';
import { useFollowersList, useRecommendFriendsList } from '../../hooks/useFollowersList';
import leftarrow from '../../img/leftarrow.png';
import * as S from './FriendsPageStyled';

const FriendsPage = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(0);

  const { data: followersList } = useFollowersList(currentPage, 6);
  const { data: recommendList } = useRecommendFriendsList(0, 8);

  // * 페이지네이션 페이지 변경 감지 함수
  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    console.log(event);
    setCurrentPage(value - 1);
  };

  return (
    <S.MainDashBoardLayout>
      <Navbar />
      <S.MainDashBoardContainer>
        <S.HeaderLayout>
          <Flex>
            <img src={leftarrow} onClick={() => navigate(`/mypage`)} />
            <S.TitleWrapper>
              <p>친구 목록</p>
            </S.TitleWrapper>
            <S.SecondaryTitleWrapper onClick={() => navigate(`/friends/search`)}>
              <p>친구 찾기</p>
            </S.SecondaryTitleWrapper>
            <S.SecondaryTitleWrapper onClick={() => navigate(`/friends/recommend`)}>
              <p>추천 친구</p>
            </S.SecondaryTitleWrapper>
          </Flex>
        </S.HeaderLayout>

        <S.SectionTitleWrapper>
          {followersList?.followInfoResDto.length == 0 ? <p>추천 친구</p> : <p>내 친구 목록</p>}
        </S.SectionTitleWrapper>

        <S.FriendsWrapper>
          {followersList?.followInfoResDto.length === 0
            ? recommendList?.followInfoResDto.map((follower, index) => <Friend key={index} follower={follower} />)
            : followersList?.followInfoResDto.map((follower, index) => <Friend key={index} follower={follower} />)}
        </S.FriendsWrapper>

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
  );
};

export default FriendsPage;

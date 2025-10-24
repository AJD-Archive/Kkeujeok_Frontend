import { useNavigate } from 'react-router-dom';

import Flex from '../../components/Flex';
import Friend from '../../components/Friend/Friend';
import Navbar from '../../components/Navbar';
import { useRecommendFriendsList } from '../../hooks/useFollowersList';
import leftarrow from '../../img/leftarrow.png';
import * as S from './RecommendedFriendsPageStyled';

const RecommendedFriendsPage = () => {
  const navigate = useNavigate();

  const { data: recommendList } = useRecommendFriendsList(0, 8);

  return (
    <S.MainDashBoardLayout>
      <Navbar />
      <S.MainDashBoardContainer>
        <S.HeaderLayout>
          <Flex>
            <img src={leftarrow} onClick={() => navigate(`/mypage`)} />
            <S.TitleWrapper>
              <p>추천 친구</p>
            </S.TitleWrapper>
            <S.SecondaryTitleWrapper onClick={() => navigate(`/friends`)}>
              <p>친구 목록</p>
            </S.SecondaryTitleWrapper>
            <S.SecondaryTitleWrapper onClick={() => navigate(`/friends/search`)}>
              <p>친구 찾기</p>
            </S.SecondaryTitleWrapper>
          </Flex>
        </S.HeaderLayout>

        <S.SectionTitleWrapper>
          <p>추천 친구</p>
        </S.SectionTitleWrapper>

        <S.FriendsWrapper>
          {recommendList?.followInfoResDto.map((follower, index) => (
            <Friend key={index} follower={follower} />
          ))}
        </S.FriendsWrapper>

        {recommendList?.followInfoResDto.length == 0 && (
          <S.NoResultWrapper>
            <p>추천 친구가 없습니다.</p>
          </S.NoResultWrapper>
        )}
      </S.MainDashBoardContainer>
    </S.MainDashBoardLayout>
  );
};

export default RecommendedFriendsPage;

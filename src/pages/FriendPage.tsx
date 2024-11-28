import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Flex from '../components/Flex';
import ChallengeBlock from '../components/ChallengeBlock';
import Profile from '../components/Profile';
import googleicon from '../img/googleicon.png';
import kakaologo from '../img/kakaologo.png';
import * as S from '../styles/MyPageStyled';
import { ChallengeList, PersonalDashboardList } from '../types/MyPage';
import { fetchFriendBlockData, friendProfile } from '../api/MyPageApi';
import { useQuery } from '@tanstack/react-query';
import Pagination from '@mui/material/Pagination';
import { Helmet } from 'react-helmet-async';

const FriendPage = () => {
  const navigate = useNavigate();
  const currentUrl = window.location.href;
  const friendId = currentUrl.split('/').pop() || '';

  const { data } = useQuery({
    queryKey: ['friendProfile', friendId],
    queryFn: () => friendProfile(friendId),
  });

  const { data: friendBlock } = useQuery({
    queryKey: ['friendBlock'],
    queryFn: () => fetchFriendBlockData(0, friendId),
  });

  const [teamBool, setTeamBool] = useState<string>('personal'); // 기본값으로 팀 탭을 보여줌
  const [pageNumber, setPageNumber] = useState(1); // 페이지네이션 변수

  //* 개인,팀,챌린지 정보 담는 변수들
  const [personalBlockData, setPersonalBlockData] = useState<PersonalDashboardList | undefined>();
  const [challengeBlockData, setChallengeBlockData] = useState<ChallengeList | undefined>();

  //* 페이지네이션 변경 시 동작하는 함수
  const onChangePageNation = async (event: React.ChangeEvent<unknown>, page: number) => {
    setPageNumber(page);
    const fetchData = await fetchFriendBlockData(page - 1, friendId);
    if (teamBool === 'personal') setPersonalBlockData(fetchData?.personalDashboardList);
    else if (teamBool === 'challenge') setChallengeBlockData(fetchData?.challengeList);
  };

  //* 개인 버튼 클릭 시 데이터 로드
  const onOpenPersonalFunc = async () => {
    setTeamBool('personal');
    setPageNumber(1);
    const fetchData = await fetchFriendBlockData(0, friendId); // 첫 페이지 데이터
    setPersonalBlockData(fetchData?.personalDashboardList);
  };

  //* 챌린지 버튼 클릭 시 데이터 로드
  const onOpenChallengeFunc = async () => {
    setTeamBool('challenge');
    setPageNumber(1);
    const fetchData = await fetchFriendBlockData(0, friendId); // 첫 페이지 데이터
    setChallengeBlockData(fetchData?.challengeList);
  };

  //* 처음 렌더링 시 팀 탭 데이터 호출
  useEffect(() => {
    setPersonalBlockData(friendBlock?.personalDashboardList);
    setChallengeBlockData(friendBlock?.challengeList);
  }, [friendBlock]);

  let content;
  if (teamBool === 'personal') {
    content = (
      <S.DashboardContainer>
        {personalBlockData?.personalDashboardInfoResDto.length === 0 ? (
          NoContentComponent
        ) : (
          <div>
            <S.GridContainer>
              {personalBlockData?.personalDashboardInfoResDto.map((item, idx) => {
                const { dashboardId, title, description } = item;
                return (
                  <S.TeamBlockWrapper
                    key={idx}
                    onClick={() => {
                      navigate(`/personal/${dashboardId}`, { state: { wrapper: true } });
                    }}
                  >
                    <ChallengeBlock title={title} description={description} />
                  </S.TeamBlockWrapper>
                );
              })}
            </S.GridContainer>

            <S.PagenateBox>
              <Pagination
                page={pageNumber}
                count={personalBlockData?.pageInfoResDto.totalPages}
                defaultPage={0}
                onChange={onChangePageNation}
              />
            </S.PagenateBox>
          </div>
        )}
      </S.DashboardContainer>
    );
  } else if (teamBool === 'challenge') {
    content = (
      <S.DashboardContainer>
        {challengeBlockData?.challengeInfoResDto.length === 0 ? (
          NoContentComponent
        ) : (
          <div>
            <S.GridContainer>
              {challengeBlockData?.challengeInfoResDto.map((item, idx) => {
                const { title, contents, cycle, challengeId } = item;

                return (
                  <div
                    key={idx}
                    onClick={() => {
                      navigate(`/challenge/${challengeId}`, { state: { title: title } });
                    }}
                  >
                    <ChallengeBlock key={idx} title={title} description={contents} />
                  </div>
                );
              })}
            </S.GridContainer>
            <S.PagenateBox>
              <Pagination
                page={pageNumber}
                count={challengeBlockData?.pageInfoResDto.totalPages}
                defaultPage={0}
                onChange={onChangePageNation}
              />
            </S.PagenateBox>
          </div>
        )}
      </S.DashboardContainer>
    );
  }

  return (
    <>
      <Helmet>
        <title>끄적끄적 | 마이페이지</title>
      </Helmet>
      <Flex alignItems="flex-start">
        <Navbar />
        <S.MyPageLayout>
          <Flex alignItems="center" justifyContent="space-between">
            <Flex
              width="100%"
              alignItems="center"
              margin="0 0 2.125rem 0"
              justifyContent="space-between"
            >
              <Flex justifyContent="space-between" gap="29px">
                <Profile width="8.875rem" height="8.875rem" profile={data?.data.picture} />
                <Flex
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="flex-start"
                  height="4rem"
                  gap="0.45rem"
                >
                  <Flex alignItems="center" gap="0.5625rem">
                    <S.GoogleImageIcon
                      src={data?.data.socialType === 'KAKAO' ? kakaologo : googleicon}
                      alt={data?.data.socialType === 'KAKAO' ? '카카오 아이콘' : '구글 아이콘'}
                    />
                    <S.MainText>{data?.data.name}</S.MainText>
                  </Flex>
                  <S.CaptionText>
                    {data?.data.introduction ? (
                      data?.data.introduction
                    ) : (
                      <span>자기 소개를 작성해주세요</span>
                    )}
                  </S.CaptionText>
                </Flex>
              </Flex>
            </Flex>
          </Flex>

          <Flex>
            <S.ButtonContainer teamBool={teamBool}>
              <button onClick={onOpenPersonalFunc}>개인</button>
              <button onClick={onOpenChallengeFunc}>챌린지</button>
            </S.ButtonContainer>

            {content}
          </Flex>
        </S.MyPageLayout>
      </Flex>
    </>
  );
};

export default FriendPage;

const NoContentComponent = (
  <S.NoContentComponent>
    <Flex height={500} alignItems="center" justifyContent="center">
      참여 내역이 없습니다.
    </Flex>
  </S.NoContentComponent>
);

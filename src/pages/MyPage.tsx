import Pagination from '@mui/material/Pagination';
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

import { fetchBlockData, fetchData, getAlarmList, updateAlarmIsRead } from '../api/MyPageApi';
import AlarmBlock from '../components/AlarmBlock';
import ChallengeBlock from '../components/ChallengeBlock';
import Flex from '../components/Flex';
import Navbar from '../components/Navbar';
import Profile from '../components/Profile';
import ProfileUpdateModal from '../components/ProfileUpdateModal';
import { notifications, unreadCount } from '../contexts/sseAtom';
import { useFollowersList } from '../hooks/useFollowersList';
import bell from '../img/bell.png';
import googleicon from '../img/googleicon.png';
import kakaologo from '../img/kakaologo.png';
import * as S from '../styles/MyPageStyled';
import type { ChallengeList, PersonalDashboardList, TeamDashboardList } from '../types/MyPage';

const MyPage = () => {
  const navigate = useNavigate();
  const { data, refetch } = useQuery({ queryKey: ['profile'], queryFn: fetchData });
  const { data: alarmNoti, refetch: AlarmRefetch } = useQuery({
    queryKey: ['alarmNoti'],
    queryFn: getAlarmList,
  });
  // console.log(alarmNoti);
  const { data: followersList } = useFollowersList(0, 8);

  const [teamBool, setTeamBool] = useState<string>('personal'); // 기본값으로 팀 탭을 보여줌
  const [pageNumber, setPageNumber] = useState(1); // 페이지네이션 변수

  //* 개인,팀,챌린지 정보 담는 변수들
  const [personalBlockData, setPersonalBlockData] = useState<PersonalDashboardList | undefined>();
  const [teamBlockData, setTeamBlockData] = useState<TeamDashboardList | undefined>();
  const [challengeBlockData, setChallengeBlockData] = useState<ChallengeList | undefined>();

  //* 알람 관련 변수
  const [unReadCount, setUnReadCount] = useAtom(unreadCount);
  const [alarmList, setAlarmList] = useAtom(notifications);
  const [visibleAlarm, setAlarmVisible] = useState(false);
  const [visibleModal, setModalVisible] = useState(false);

  const onAlarmVisibleFunc = async () => {
    setAlarmVisible((prev) => !prev);
    if (unReadCount !== 0) {
      // unReadCount가 0이 아닐 때만 업데이트
      setUnReadCount(0);
    }
    await updateAlarmIsRead();
  };

  const onModalVisibleFunc = () => {
    refetch();
    setModalVisible((prev) => !prev);
  };

  // 페이지네이션 변경 시 동작하는 함수
  const onChangePageNation = async (event: React.ChangeEvent<unknown>, page: number) => {
    console.log(event);
    setPageNumber(page);
    if (data?.data.email) {
      const fetchData = await fetchBlockData(page - 1, data?.data.email);

      if (teamBool === 'personal') setPersonalBlockData(fetchData?.data.personalDashboardList);
      else if (teamBool === 'team') setTeamBlockData(fetchData?.data.teamDashboardList);
    }
  };

  // 개인 버튼 클릭 시 데이터 로드
  const onOpenPersonalFunc = async () => {
    setTeamBool('personal');
    setPageNumber(1);
    if (data?.data.email) {
      const fetchData = await fetchBlockData(0, data?.data.email); // 첫 페이지 데이터
      setPersonalBlockData(fetchData?.data.personalDashboardList);
    }
  };
  // 팀 버튼 클릭 시 데이터 로드
  const onOpenTeamFunc = async () => {
    setTeamBool('team');
    setPageNumber(1);
    if (data?.data.email) {
      const fetchData = await fetchBlockData(0, data?.data.email); // 첫 페이지 데이터
      setTeamBlockData(fetchData?.data.teamDashboardList);
    }
  };

  // 챌린지 버튼 클릭 시 데이터 로드
  const onOpenChallengeFunc = async () => {
    setTeamBool('challenge');
    setPageNumber(1);
    if (data?.data.email) {
      const fetchData = await fetchBlockData(0, data?.data.email); // 첫 페이지 데이터
      setChallengeBlockData(fetchData?.data.challengeList);
    }
  };

  //로그아웃
  const onLogoutHandler = () => {
    localStorage.clear();
    navigate('/');
  };

  // 처음 렌더링 시 팀 탭 데이터 호출
  useEffect(() => {
    const fetchInitialBlockData = async () => {
      try {
        if (data?.data.email) {
          const initialData = await fetchBlockData(0, data.data.email); // 첫 페이지 데이터 호출
          setPersonalBlockData(initialData?.data.personalDashboardList);
          setTeamBlockData(initialData?.data.teamDashboardList);
          setChallengeBlockData(initialData?.data.challengeList);
        }
      } catch (error) {
        console.error('Failed to fetch block data:', error);
      }
    };

    fetchInitialBlockData();
  }, [data?.data.email]); // email이 있을 때만 데이터 호출

  // 처음 렌더링시 알람 데이터 불러오기
  useEffect(() => {
    if (alarmNoti?.data) {
      setAlarmList(alarmNoti);
      setUnReadCount(alarmNoti.data.notificationInfoResDto.filter((item) => !item.isRead).length);
    }
  }, [alarmNoti]);

  useEffect(() => {
    AlarmRefetch();
    setAlarmList(alarmNoti);
  }, [unReadCount]);

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
                      navigate(`/personal/${dashboardId}`);
                    }}
                  >
                    <ChallengeBlock description={description} title={title} />
                  </S.TeamBlockWrapper>
                );
              })}
            </S.GridContainer>

            <S.PagenateBox>
              <Pagination
                count={personalBlockData?.pageInfoResDto.totalPages}
                defaultPage={0}
                page={pageNumber}
                onChange={onChangePageNation}
              />
            </S.PagenateBox>
          </div>
        )}
      </S.DashboardContainer>
    );
  } else if (teamBool === 'team') {
    content = (
      <S.DashboardContainer>
        {teamBlockData?.teamDashboardInfoResDto.length === 0 ? (
          NoContentComponent
        ) : (
          <div>
            <S.GridContainer>
              {teamBlockData?.teamDashboardInfoResDto.map((item, idx) => {
                const { dashboardId, title, joinMembers, description } = item;
                return (
                  <S.TeamBlockWrapper
                    key={idx}
                    onClick={() => {
                      navigate(`/team/${dashboardId}`);
                    }}
                  >
                    <ChallengeBlock description={description} joinMembers={joinMembers ?? 0} title={title} />
                  </S.TeamBlockWrapper>
                );
              })}
            </S.GridContainer>
            <S.PagenateBox>
              <Pagination
                count={teamBlockData?.pageInfoResDto.totalPages}
                defaultPage={0}
                page={pageNumber}
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
                console.log(cycle);

                return (
                  <div
                    key={idx}
                    onClick={() => {
                      // navigate(`/challenge/${challengeId}`);
                      navigate(`/challenge/${challengeId}`, { state: { title: title } });
                    }}
                  >
                    <ChallengeBlock key={idx} description={contents} title={title} />
                  </div>
                );
              })}
            </S.GridContainer>
            <S.PagenateBox>
              <Pagination
                count={challengeBlockData?.pageInfoResDto.totalPages}
                defaultPage={0}
                page={pageNumber}
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
      <Flex alignItems='flex-start'>
        <Navbar />
        <S.MyPageLayout>
          <Flex alignItems='center' justifyContent='space-between'>
            <Flex alignItems='center' justifyContent='space-between' margin='0 0 2.125rem 0' width='100%'>
              <Flex gap='29px' justifyContent='space-between'>
                <Profile height='8.875rem' profile={data?.data.picture} width='8.875rem' />
                <Flex
                  alignItems='flex-start'
                  flexDirection='column'
                  gap='0.45rem'
                  height='4rem'
                  justifyContent='center'
                >
                  <Flex alignItems='center' gap='0.5625rem'>
                    <S.GoogleImageIcon
                      alt={data?.data.socialType === 'KAKAO' ? '카카오 아이콘' : '구글 아이콘'}
                      src={data?.data.socialType === 'KAKAO' ? kakaologo : googleicon}
                    />
                    <S.MainText>{data?.data.name}</S.MainText>
                  </Flex>
                  <S.CaptionText>
                    {data?.data.introduction ? data?.data.introduction : <span>자기 소개를 작성해주세요</span>}
                  </S.CaptionText>
                  <S.CaptionText onClick={() => navigate(`/friends`)}>
                    <span>친구 {followersList?.pageInfoResDto.totalItems}명</span>
                  </S.CaptionText>
                </Flex>
              </Flex>

              <Flex flexDirection='column' gap='0.75rem'>
                <S.ButtonWrapper onClick={onModalVisibleFunc}>프로필 수정</S.ButtonWrapper>
                <S.ButtonWrapper onClick={onLogoutHandler}> 로그아웃 </S.ButtonWrapper>
              </Flex>
            </Flex>

            <S.ImageWrapper onClick={onAlarmVisibleFunc}>
              <img alt='알림 아이콘' src={bell} />
              {unReadCount > 0 ? <div>!</div> : ''}
            </S.ImageWrapper>
            {visibleAlarm && (
              <S.AlarmDataContainer>
                {alarmList?.data.notificationInfoResDto.length === 0 ? (
                  <Flex alignItems='center' height={96} justifyContent='center'>
                    <span>생성된 알림이 없어요</span>
                  </Flex>
                ) : (
                  alarmList?.data.notificationInfoResDto
                    .slice()
                    .reverse()
                    .map((item, idx) => <AlarmBlock key={idx} isRead={item.isRead} message={item.message} />)
                )}
              </S.AlarmDataContainer>
            )}
          </Flex>

          <Flex>
            <S.ButtonContainer teamBool={teamBool}>
              <button onClick={onOpenPersonalFunc}>개인</button>
              <button onClick={onOpenTeamFunc}>팀</button>
              <button onClick={onOpenChallengeFunc}>챌린지</button>
            </S.ButtonContainer>

            {content}
          </Flex>
        </S.MyPageLayout>

        {visibleModal && (
          <ProfileUpdateModal
            introduction={data?.data.introduction}
            nickname={data?.data.nickName}
            onModalVisibleFunc={onModalVisibleFunc}
          />
        )}
      </Flex>
    </>
  );
};

export default MyPage;

const NoContentComponent = (
  <S.NoContentComponent>
    <Flex alignItems='center' height={500} justifyContent='center'>
      참여 내역이 없습니다.
    </Flex>
  </S.NoContentComponent>
);

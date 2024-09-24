import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Flex from '../components/Flex';
import AlarmBlock from '../components/AlarmBlock';
import ProfileUpdateModal from '../components/ProfileUpdateModal';
import ChallengeBlock from '../components/ChallengeBlock';
import Profile from '../components/Profile';

import googleicon from '../img/googleicon.png';
import kakaologo from '../img/kakaologo.png';
import bell from '../img/bell.png';

import * as S from '../styles/MyPageStyled';

import { ChallengeList, PersonalDashboardList, TeamDashboardList } from '../types/MyPage';
import { fetchBlockData, fetchData, getAlarmList, updateAlarmIsRead } from '../api/MyPageApi';
import { useAtom } from 'jotai';
import { useQuery } from '@tanstack/react-query';
import Pagination from '@mui/material/Pagination';
import { notifications, unreadCount } from '../contexts/sseAtom';
import useTeamDashBoard from '../hooks/useTeamDashBoard';
import { postTeamDashboard } from '../api/TeamDashBoardApi';

const MyPage = () => {
  const navigate = useNavigate();
  const { data, refetch } = useQuery({ queryKey: ['profile'], queryFn: fetchData });
  const { data: alarmNoti, refetch: AlarmRefetch } = useQuery({
    queryKey: ['alarmNoti'],
    queryFn: getAlarmList,
  });

  console.log(alarmNoti);
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

  const onAlarmVisibleFunc = () => {
    setAlarmVisible(prev => !prev);
    if (unReadCount !== 0) {
      // unReadCount가 0이 아닐 때만 업데이트
      setUnReadCount(0);
    }
    updateAlarmIsRead();
  };

  const onModalVisibleFunc = () => {
    refetch();
    setModalVisible(prev => !prev);
  };

  // 페이지네이션 변경 시 동작하는 함수
  const onChangePageNation = async (event: React.ChangeEvent<unknown>, page: number) => {
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
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/login');
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
      setUnReadCount(alarmNoti.data.notificationInfoResDto.filter(item => !item.isRead).length);
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
                      navigate(`/${dashboardId}`);
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
                      navigate(`/${dashboardId}`);
                    }}
                  >
                    <ChallengeBlock
                      title={title}
                      joinMembers={joinMembers ?? 0}
                      description={description}
                    />
                  </S.TeamBlockWrapper>
                );
              })}
            </S.GridContainer>
            <S.PagenateBox>
              <Pagination
                page={pageNumber}
                count={teamBlockData?.pageInfoResDto.totalPages}
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
                const { title, cycle } = item;
                return (
                  <div key={idx}>
                    <ChallengeBlock key={idx} />
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
                gap="0.75rem"
              >
                <Flex alignItems="center" gap="0.5625rem">
                  <S.GoogleImageIcon
                    src={data?.data.socialType === 'KAKAO' ? kakaologo : googleicon}
                    alt={data?.data.socialType === 'KAKAO' ? '카카오 아이콘' : '구글 아이콘'}
                  />
                  <S.MainText>{data?.data.name}</S.MainText>
                </Flex>
                <S.CaptionText>{data?.data.introduction}</S.CaptionText>
              </Flex>
            </Flex>

            <Flex flexDirection="column" gap="0.75rem">
              <S.ButtonWrapper onClick={onModalVisibleFunc}>프로필 수정</S.ButtonWrapper>
              <S.ButtonWrapper onClick={onLogoutHandler}> 로그아웃 </S.ButtonWrapper>
            </Flex>
          </Flex>

          <S.ImageWrapper onClick={onAlarmVisibleFunc}>
            <img src={bell} alt="알림 아이콘" />
            {unReadCount > 0 ? <div>!</div> : ''}
          </S.ImageWrapper>
          {visibleAlarm && (
            <S.AlarmDataContainer>
              {alarmList?.data.notificationInfoResDto.length === 0 ? (
                <Flex height={96} justifyContent="center" alignItems="center">
                  <span>생성된 알림이 없어요</span>
                </Flex>
              ) : (
                alarmList?.data.notificationInfoResDto
                  .slice()
                  .reverse()
                  .map((item, idx) => (
                    <AlarmBlock key={idx} message={item.message} isRead={item.isRead} />
                  ))
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

      {visibleModal && <ProfileUpdateModal onModalVisibleFunc={onModalVisibleFunc} />}
    </Flex>
  );
};

export default MyPage;

const NoContentComponent = (
  <S.NoContentComponent>
    <Flex height={500} alignItems="center" justifyContent="center">
      생성된 내용이 없어요
    </Flex>
  </S.NoContentComponent>
);

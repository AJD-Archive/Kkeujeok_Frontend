import Navbar from '../components/Navbar';
import Flex from '../components/Flex';
import googleicon from '../img/googleicon.png';
import kakaologo from '../img/kakaologo.png';
import bell from '../img/bell.png';
import ChallengeBlock from '../components/ChallengeBlock';
import * as S from '../styles/MyPageStyled';
import Profile from '../components/Profile';
import { useQuery } from '@tanstack/react-query';
import { fetchBlockData, fetchData, getAlarmList } from '../api/MyPageApi';
import { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import { ChallengeList, TeamDashboardList } from '../types/MyPage';
import { Link, useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { unreadCount } from '../contexts/sseAtom';

const MyPage = () => {
  const navigate = useNavigate();
  const { data } = useQuery({ queryKey: ['profile'], queryFn: fetchData });
  const { data: alarmNoti } = useQuery({ queryKey: ['alarmNoti'], queryFn: getAlarmList });

  const [teamBool, setTeamBool] = useState<boolean>(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [teamBlockData, setTeamBlockData] = useState<TeamDashboardList | undefined>();
  const [challengeBlockData, setChallengeBlockData] = useState<ChallengeList | undefined>();
  const [alarmData, setAramData] = useState(
    alarmNoti?.data.notificationInfoResDto.filter(item => !item.isRead).length
  );
  const [visible, setVisible] = useState(false);

  const clickHandler = () => {
    setVisible(prev => !prev);
  };
  // 페이지네이션 변경 시 동작하는 함수
  const onChangePageNation = async (event: React.ChangeEvent<unknown>, page: number) => {
    setPageNumber(page);
    const fetchData = await fetchBlockData(page - 1);
    setTeamBlockData(fetchData?.data.teamDashboardList);
  };

  const socialType = data?.data.socialType;

  const SocialIcon = () => (
    <S.GoogleImageIcon
      src={socialType === 'KAKAO' ? kakaologo : googleicon}
      alt={socialType === 'KAKAO' ? '카카오 아이콘' : '구글 아이콘'}
    />
  );

  //팀 버튼
  const onOpenTeamFunc = async () => {
    setTeamBool(true);
    setPageNumber(1);
    const fetchData = await fetchBlockData(pageNumber - 1);
    setTeamBlockData(fetchData?.data.teamDashboardList);
  };

  //챌린지 버튼
  const onChallengeFunc = async () => {
    setTeamBool(false);
    setPageNumber(1);
    const fetchData = await fetchBlockData(pageNumber - 1);
    setTeamBlockData(fetchData?.data.teamDashboardList);
  };

  const onEditProfileHandler = () => {
    // navigate('/profile/edit');
  };

  // 처음 렌더링 시 fetchBlockData 호출
  useEffect(() => {
    const fetchInitialBlockData = async () => {
      try {
        const initialData = await fetchBlockData(0); // 첫 페이지 데이터 호출
        setTeamBlockData(initialData?.data.teamDashboardList);
        setChallengeBlockData(initialData?.data.challengeList);
      } catch (error) {
        console.error('Failed to fetch block data:', error);
      }
    };

    fetchInitialBlockData();
  }, []);

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
                  <SocialIcon />
                  <S.MainText>{data?.data.name}</S.MainText>
                </Flex>
                <S.CaptionText>{data?.data.introduction}</S.CaptionText>
              </Flex>
            </Flex>

            <Flex flexDirection="column" gap="0.75rem">
              <Link to="edit">
                <S.ButtonWrapper onClick={onEditProfileHandler}>프로필 수정</S.ButtonWrapper>
              </Link>
              <S.ButtonWrapper> 로그아웃 </S.ButtonWrapper>
            </Flex>
          </Flex>

          <S.ImageWrapper onMouseEnter={clickHandler} onMouseLeave={clickHandler}>
            <img src={bell} alt="알림 아이콘" />
            <div>{alarmData ?? 0}</div>
          </S.ImageWrapper>
          {visible && (
            <S.AlarmDataContainer>
              {alarmNoti?.data.notificationInfoResDto.map((item, idx) => (
                <div key={idx}>{item.message}</div>
              ))}
            </S.AlarmDataContainer>
          )}
        </Flex>

        <S.ButtonContainer teamBool={teamBool}>
          <button onClick={onOpenTeamFunc}>팀</button>
          <button onClick={onChallengeFunc}>챌린지</button>
        </S.ButtonContainer>
        {teamBool ? (
          <div>
            <S.ChanllengeBlockContainer>
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
                      dashboardId={dashboardId}
                      title={title}
                      joinMembers={joinMembers ?? 0}
                      description={description}
                    />
                  </S.TeamBlockWrapper>
                );
              })}
            </S.ChanllengeBlockContainer>
            <S.PagenateBox>
              <Pagination
                page={pageNumber}
                count={teamBlockData?.pageInfoResDto.totalPages}
                defaultPage={0}
                onChange={onChangePageNation}
              />
            </S.PagenateBox>
          </div>
        ) : (
          <div>
            <S.ChanllengeBlockContainer>
              {challengeBlockData?.challengeInfoResDto.map((item, idx) => (
                <div key={idx}>
                  <ChallengeBlock key={idx} />
                </div>
              ))}
            </S.ChanllengeBlockContainer>
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
      </S.MyPageLayout>
    </Flex>
  );
};

export default MyPage;

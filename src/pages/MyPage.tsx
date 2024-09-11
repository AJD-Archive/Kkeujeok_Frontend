import Navbar from '../components/Navbar';
import Flex from '../components/Flex';
import googleicon from '../img/googleicon.png';
import kakaologo from '../img/kakaologo.png';
import bell from '../img/bell.png';
import ChallengeBlock from '../components/ChallengeBlock';
import * as S from '../styles/MyPageStyled';
import Profile from '../components/Profile';
import { useQuery } from '@tanstack/react-query';
import { fetchBlockData, fetchData } from '../api/MyPageApi';
import { ChangeEvent, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import { TeamDashboardInfoResDto } from '../types/TeamDashBoard';

const MyPage = () => {
  const { data } = useQuery({ queryKey: ['profile'], queryFn: fetchData });
  const { data: teamBlock } = useQuery({ queryKey: ['teamBlcok'], queryFn: fetchBlockData });

  const [teamBool, setTeamBool] = useState<boolean>(true);

  const socialType = data?.data.socialType;

  const SocialIcon = () => (
    <S.GoogleImageIcon
      src={socialType === 'KAKAO' ? kakaologo : googleicon}
      alt={socialType === 'KAKAO' ? '카카오 아이콘' : '구글 아이콘'}
    />
  );
  return (
    <Flex alignItems="flex-start">
      <Navbar />
      <S.MyPageLayout>
        <Flex alignItems="flex-start" justifyContent="space-between">
          <Flex alignItems="flex-end" margin="0 0 2.125rem 0">
            <Profile width="12.5rem" height="12.5rem" profile={data?.data.picture} />
            <Flex
              flexDirection="column"
              justifyContent="space-between"
              alignItems="flex-start"
              margin="0 0 1.1875rem 0.8125rem"
              height="4rem"
            >
              <S.MainText>{data?.data.name}</S.MainText>
              <S.CaptionText>{data?.data.introduction}</S.CaptionText>
              <SocialIcon />
            </Flex>
          </Flex>

          <S.ImageWrapper>
            <img src={bell} alt="알림 아이콘" />
            <div>1</div>
          </S.ImageWrapper>
        </Flex>
        <S.ChanllengeBlockContainer>
          {teamBool
            ? teamBlock?.data.teamDashboardList.teamDashboardInfoResDto.map((item, idx) => (
                <ChallengeBlock key={idx} />
              ))
            : teamBlock?.data.challengeList.challengeInfoResDto.map((item, idx) => (
                <ChallengeBlock key={idx} />
              ))}
        </S.ChanllengeBlockContainer>
        <S.PagenateBox>
          {/* <Pagination
            page={teamPage}
            count={teamBlock?.data.teamDashboardList.pageInfoResDto.totalPages}
            defaultPage={1}
            onChange={onChangePageNation}
          /> */}
        </S.PagenateBox>
      </S.MyPageLayout>
    </Flex>
  );
};
export default MyPage;

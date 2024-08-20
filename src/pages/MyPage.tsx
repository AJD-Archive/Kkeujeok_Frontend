import Navbar from '../components/Navbar';
import Flex from '../components/Flex';
import googleicon from '../img/googleicon.png';
import bell from '../img/bell.png';
import ChallengeBlock from '../components/ChallengeBlock';
import ReactPaginate from 'react-paginate';
import * as S from '../styles/MyPageStyled';
import Profile from '../components/Profile';

const MyPage = () => (
  <Flex alignItems="flex-start">
    <Navbar />
    <S.MyPageLayout>
      <Flex alignItems="flex-start" justifyContent="space-between">
        <Flex alignItems="flex-end" margin="0 0 2.125rem 0">
          <Profile width="12.5rem" height="12.5rem" />
          <Flex
            flexDirection="column"
            justifyContent="space-between"
            alignItems="flex-start"
            margin="0 0 1.1875rem 0.8125rem"
            height="4rem"
          >
            <S.MainText>김신아</S.MainText>
            <S.CaptionText>이 부분은 자기소개에요</S.CaptionText>
            <S.GoogleImageIcon src={googleicon} alt="구글 아이콘" />
          </Flex>
        </Flex>

        <S.ImageWrapper>
          <img src={bell} alt="알림 아이콘" />
          <div>1</div>
        </S.ImageWrapper>
      </Flex>
      <S.ChanllengeBlockContainer>
        <ChallengeBlock />
        <ChallengeBlock />
        <ChallengeBlock />
        <ChallengeBlock />
        <ChallengeBlock />
        <ChallengeBlock />
      </S.ChanllengeBlockContainer>
      <S.PagenateBox>
        <ReactPaginate pageCount={6} pageRangeDisplayed={6} previousLabel="<" nextLabel=">" />
      </S.PagenateBox>
    </S.MyPageLayout>
  </Flex>
);
export default MyPage;

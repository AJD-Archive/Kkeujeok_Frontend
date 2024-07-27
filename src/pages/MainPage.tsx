import { styled } from 'styled-components';
import Navbar from '../components/Navbar';
import setting from '../assets/images/setting.png';
import Flex from '../components/Flex';
import theme from '../styles/Theme/Theme';
import Graph from '../components/Graph';
import DashboardCard from '../components/DashboardCard';
import deleteicon from '../assets/images/delete2.png';
import main from '../assets/images/main.png';
import main2 from '../assets/images/main2.png';
import main3 from '../assets/images/main3.png';

const MainPage = () => {
  return (
    <MainDashBoardLayout>
      <Navbar />
      <MainDashBoardContainer>
        <Flex justifyContent="space-between">
          <div>
            <Flex margin="0px 0px 6px 0px">
              <TitleWrapper>개인 대시보드 1</TitleWrapper>
              <SettingImgWrapper>
                <img src={setting} alt="설정 이미지" />
              </SettingImgWrapper>
            </Flex>
            <SubtitleWrapper>개인 대시보드를 설명하는 자리입니다.</SubtitleWrapper>
          </div>
          <Flex>
            <Graph />
            <TeamDocButton>팀문서</TeamDocButton>
          </Flex>
        </Flex>
        <hr></hr>

        <CardContainer>
          <DashboardCard
            backGroundColor="#E8FBFF"
            highlightColor={theme.color.main3}
            state="시작 전"
            imgSrc={main3}
          />
          <DashboardCard
            backGroundColor="#EDF3FF"
            highlightColor={theme.color.main}
            state="진행 중"
            imgSrc={main}
          />
          <DashboardCard
            backGroundColor="#F7F1FF"
            highlightColor={theme.color.main2}
            state="완료"
            imgSrc={main2}
          />
        </CardContainer>

        <DeleteIcon>
          <img src={deleteicon} alt="휴지통아이콘" />
        </DeleteIcon>
      </MainDashBoardContainer>
    </MainDashBoardLayout>
  );
};
export default MainPage;

const MainDashBoardLayout = styled.div`
  width: 100vw;
  min-width: 100vw;
  height: 100vh;
  display: flex;
`;

const MainDashBoardContainer = styled.section`
  width: 100%;
  padding: 4.3125rem 1.875rem;

  hr {
    border: 1px solid #f4f4f4;
  }
`;

const TitleWrapper = styled.h1`
  font-size: 24px;
  font-weight: ${theme.font.weight.bold};
  margin-right: 13px;
`;

const SubtitleWrapper = styled.p`
  font-size: ${theme.font.size.main};
  font-weight: ${theme.font.weight.medium};
  color: ${theme.color.gray};
`;

const SettingImgWrapper = styled.div`
  width: 17px;

  img {
    width: 100%;
  }
`;

const CardContainer = styled.section`
  display: flex;
  justify-content: space-between;
  padding: 4.5rem 3.8125rem;
  gap: 39px;

  @media screen and (min-width: 1000px) {
    justify-content: center;
  }
`;

const DeleteIcon = styled.div`
  width: 3.375rem;
  height: 3.375rem;

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  right: 30px;
  bottom: 20px;

  background: #f4f4f4;
  border-radius: 50%;

  img {
    width: 27px;
    height: 31px;
  }
`;

const TeamDocButton = styled.button`
  display: flex;
  height: 1.3125rem;
  align-items: center;
  margin-left: 1.0625rem;

  font-size: ${theme.font.size.caption};
  font-weight: ${theme.font.weight.light};
  color: ${theme.color.white};

  background: ${theme.color.gray};
  border-radius: 0.625rem;
  padding: 0.3125rem 1.875rem;
`;

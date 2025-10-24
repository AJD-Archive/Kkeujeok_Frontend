import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import Flex from '../components/Flex';
import Navbar from '../components/Navbar';
import personalDashboardIcon from '../img/personalDashboardIcon.png';
import teamDashboardIcon from '../img/teamDashboardIcon.png';
import {
  BoardTitle,
  CreateBoardWrapper,
  CreateDashBoardContainer,
  CreateDashBoardLayout,
  Explanation,
  LinksContainer,
  PersonalIconImgWrapper,
  SubTitle,
  TeamIconImgWrapper,
  Title,
} from '../styles/CreateBoardPageStyled';

const CreateBoard = () => {
  return (
    <>
      <Helmet>
        <title>끄적끄적 | 대시보드 생성</title>
      </Helmet>
      <CreateDashBoardLayout>
        <Navbar />
        <CreateDashBoardContainer>
          <Title>끄적끄적을 어떻게 사용하고 싶으세요?</Title>
          <SubTitle>생성할 대시보드 종류를 선택해주세요.</SubTitle>

          <LinksContainer>
            <Flex alignItems='center' justifyContent='center'>
              <Link to='/createPersonalBoard'>
                <CreateBoardWrapper>
                  <Flex
                    alignItems='flex-start'
                    flexDirection='column'
                    height='13rem'
                    justifyContent='center'
                    padding='3rem 4rem 2rem 4rem'
                  >
                    <PersonalIconImgWrapper>
                      <img alt='설정 이미지' src={personalDashboardIcon} />
                    </PersonalIconImgWrapper>
                    <Explanation>
                      정신 없는 하루도, <br />
                      복잡한 작업도 끄적끄적과 함께 해요.
                    </Explanation>
                    <BoardTitle>개인 대시보드</BoardTitle>
                  </Flex>
                </CreateBoardWrapper>
              </Link>

              <Link to='/createTeamBoard'>
                <CreateBoardWrapper>
                  <Flex
                    alignItems='flex-start'
                    flexDirection='column'
                    height='13rem'
                    justifyContent='center'
                    padding='3rem 4rem 2rem 4rem'
                  >
                    <TeamIconImgWrapper>
                      <img alt='설정 이미지' src={teamDashboardIcon} />
                    </TeamIconImgWrapper>
                    <Explanation>
                      협업도 문제 없어요. <br />
                      팀원을 등록하고 프로젝트를 관리해요.
                    </Explanation>
                    <BoardTitle>팀 대시보드</BoardTitle>
                  </Flex>
                </CreateBoardWrapper>
              </Link>
            </Flex>
          </LinksContainer>
        </CreateDashBoardContainer>
      </CreateDashBoardLayout>
    </>
  );
};

export default CreateBoard;

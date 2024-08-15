import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Flex from '../components/Flex';

import personalDashboardIcon from '../assets/images/personalDashboardIcon.png';
import teamDashboardIcon from '../assets/images/teamDashboardIcon.png';

import {
  CreateDashBoardLayout,
  CreateDashBoardContainer,
  BoardTitle,
  CreateBoardWrapper,
  Explanation,
  LinksContainer,
  PersonalIconImgWrapper,
  SubTitle,
  TeamIconImgWrapper,
  Title,
} from '../styles/CreateBoardPageStyled';

const CreateBoard = () => {
  return (
    <CreateDashBoardLayout>
      <Navbar />
      <CreateDashBoardContainer>
        <Title>끄적끄적을 어떻게 사용하고 싶으세요?</Title>
        <SubTitle>생성할 대시보드 종류를 선택해주세요.</SubTitle>

        <LinksContainer>
          <Flex justifyContent="center" alignItems="center">
            <Link to="/createPersonalBoard">
              <CreateBoardWrapper>
                <Flex
                  height="13rem"
                  padding="3rem 4rem 2rem 4rem"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="flex-start"
                >
                  <PersonalIconImgWrapper>
                    <img src={personalDashboardIcon} alt="설정 이미지" />
                  </PersonalIconImgWrapper>
                  <Explanation>
                    정신 없는 하루도, <br />
                    복잡한 작업도 끄적끄적과 함께 해요.
                  </Explanation>
                  <BoardTitle>개인 대시보드</BoardTitle>
                </Flex>
              </CreateBoardWrapper>
            </Link>

            <Link to="/createTeamBoard">
              <CreateBoardWrapper>
                <Flex
                  height="13rem"
                  padding="3rem 4rem 2rem 4rem"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="flex-start"
                >
                  <TeamIconImgWrapper>
                    <img src={teamDashboardIcon} alt="설정 이미지" />
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
  );
};

export default CreateBoard;

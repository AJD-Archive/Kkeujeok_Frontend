import React, { useState } from 'react';

import ErrorIcon from '../img/error.png';
import Flex from './Flex';
import {
  StyledModal,
  customStyles,
  ErrorImg,
  SubTitle,
  Title,
  BtnYes,
  BtnNo,
} from '../styles/ModalStyled';
import * as S from '../styles/ChallengeStyled';
import { searchPersonalDashBoard } from '../api/BoardApi';
import { useQuery } from '@tanstack/react-query';
import { DashboardItem } from '../types/PersonalDashBoard';
import { joinChallenge } from '../api/ChallengeApi';

export interface CustomModalProps {
  challengeId: string;
  onNoClick: () => void; // onNoClick의 타입 정의
}

const JoinChallengeModal = ({ challengeId, onNoClick }: CustomModalProps) => {
  // 데이터 가져오기
  const { data, error } = useQuery({
    queryKey: ['personalDashboard'],
    queryFn: searchPersonalDashBoard,
  });
  const [selectDashboard, setSelectDashboard] = useState<string>('');

  // * 선택된 개인 대시보드 (챌린지 추가할 대시보드)
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectDashboard(event.target.value);
  };

  // * 챌린지 참여 api
  const submitJoin = () => {
    console.log(selectDashboard);
    joinChallenge(challengeId, selectDashboard);
    onNoClick();
  };

  return (
    <StyledModal isOpen={true} shouldFocusAfterRender={false} style={customStyles}>
      {/* <ErrorImg src={ErrorIcon} alt="error_icon" /> */}
      <Flex flexDirection="column">
        <Title>챌린지 참여하기</Title>
        <SubTitle
          style={{
            marginTop: '0.7rem',
          }}
        >
          챌린지를 추가할 대시보드를 선택해주세요.
        </SubTitle>
      </Flex>
      <S.JoinSelect onChange={handleSelectChange}>
        {data?.data.personalDashboardListResDto?.map((item: DashboardItem) => (
          <option
            key={item.dashboardId}
            value={
              item.dashboardId !== null && item.dashboardId !== undefined ? item.dashboardId : ''
            }
          >
            {item.title}
          </option>
        ))}
      </S.JoinSelect>

      <Flex>
        <BtnYes onClick={onNoClick}>취소</BtnYes>
        <BtnNo onClick={submitJoin}>참여</BtnNo>
      </Flex>
    </StyledModal>
  );
};

export default JoinChallengeModal;

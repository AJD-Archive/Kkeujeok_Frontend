import React, { useEffect, useState } from 'react';

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
import { useNavigate } from 'react-router-dom';

export interface CustomModalProps {
  challengeId: string;
  onNoClick: () => void;
  fetchedData: () => void;
}

const JoinChallengeModal = ({ challengeId, onNoClick, fetchedData }: CustomModalProps) => {
  // 데이터 가져오기
  const { data } = useQuery({
    queryKey: ['personalDashboard'],
    queryFn: searchPersonalDashBoard,
  });
  const [selectDashboard, setSelectDashboard] = useState<string>('');

  // * 데이터가 로드되면 첫 번째 대시보드 ID를 기본값으로 설정
  useEffect(() => {
    if (
      data?.data.personalDashboardListResDto &&
      data.data.personalDashboardListResDto.length > 0
    ) {
      const firstDashboardId = data.data.personalDashboardListResDto[0].dashboardId;
      if (firstDashboardId !== null && firstDashboardId !== undefined) {
        setSelectDashboard(String(firstDashboardId)); // 첫 번째 값을 기본 선택값으로 설정
      }
    }
  }, [data]);

  // * 선택된 개인 대시보드 (챌린지 추가할 대시보드)
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectDashboard(event.target.value);
  };

  // * 챌린지 참여 api
  const submitJoin = async () => {
    try {
      await joinChallenge(challengeId, selectDashboard); // 챌린지 참여
      fetchedData(); // 참여 후 데이터 다시 불러오기
      onNoClick(); // 모달 닫기
    } catch (error) {
      console.error('Error joining challenge:', error);
    }
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

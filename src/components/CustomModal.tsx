import React from 'react';
import { useAtom } from 'jotai';

import { realDeleteBlock, restoreBlockFunc } from '../api/PersonalBlockApi';
import {
  StyledModal,
  customStyles,
  ErrorImg,
  SubTitle,
  Title,
  BtnYes,
  BtnNo,
} from '../styles/ModalStyled';
import ErrorIcon from '../img/error.png';
import Flex from './Flex';
import { CustomModalProps } from '../types/CustomModal';
import { fetchTriggerAtom } from '../contexts/atoms';

const CustomModal = ({ title, subTitle, onClose, removeapi, blockId }: CustomModalProps) => {
  const [, setFetchTrigger] = useAtom(fetchTriggerAtom); // 트리거 업데이트 함수 가져오기

  const onClickHandler = async () => {
    //삭제
    if (title.includes('삭제') && blockId) {
      await realDeleteBlock(blockId); // 블록 삭제 API 호출
    } else if (title.includes('복구') && blockId) {
      await restoreBlockFunc(blockId);
    }
    setFetchTrigger(prev => prev + 1); // 상태를 변경하여 MainPage에서 데이터를 다시 불러오도록 트리거
    onClose(); // 모달 닫기

    //복구
  };

  return (
    <StyledModal
      isOpen={true}
      shouldFocusAfterRender={false}
      onRequestClose={onClose}
      style={customStyles}
    >
      <ErrorImg src={ErrorIcon} alt="error_icon"></ErrorImg>
      <Flex flexDirection="column">
        <SubTitle>{subTitle}</SubTitle>
        <Title>{title}</Title>
      </Flex>
      <Flex>
        <BtnYes onClick={onClickHandler}>예</BtnYes>
        <BtnNo onClick={onClose}>아니오</BtnNo>
      </Flex>
    </StyledModal>
  );
};

export default CustomModal;

import React from 'react';

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
import { CustomModalProps } from '../types/CustomModal';

const CustomModal = ({ title, subTitle, onYesClick, onNoClick }: CustomModalProps) => {
  return (
    <StyledModal
      isOpen={true}
      shouldFocusAfterRender={false}
      onRequestClose={onNoClick} // 기본적으로 No 버튼 클릭 시 모달 닫힘
      style={customStyles}
    >
      <ErrorImg src={ErrorIcon} alt="error_icon" />
      <Flex flexDirection="column">
        <SubTitle>{subTitle}</SubTitle>
        <Title>{title}</Title>
      </Flex>
      <Flex>
        <BtnYes onClick={onYesClick}>예</BtnYes>
        <BtnNo onClick={onNoClick}>아니오</BtnNo>
      </Flex>
    </StyledModal>
  );
};

export default CustomModal;

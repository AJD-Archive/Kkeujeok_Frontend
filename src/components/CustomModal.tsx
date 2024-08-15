import React from 'react';

import ErrorIcon from '../img/error.png';
import Flex from './Flex';
import {} from '../styles/CreateBoardPageStyled';
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

/*
>>>>> 모달창 사용 방법
<CustomModal title="블록을 삭제하시겠습니까?" subTitle="삭제 이후 되돌릴 수 없습니다." />
이렇게 컴포넌트로 불러와서 사용할 수 있습니다.

추후 기능에 맞춰 다른 함수를 받아 사용할 수 있도록 수정할 예정입니다.
*/

const CustomModal = ({ title, subTitle, onClose }: CustomModalProps) => {
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
        <BtnYes onClick={onClose}>예</BtnYes>
        <BtnNo onClick={onClose}>아니오</BtnNo>
      </Flex>
    </StyledModal>
  );
};

export default CustomModal;

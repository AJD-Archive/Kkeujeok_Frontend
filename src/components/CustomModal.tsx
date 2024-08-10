import React, { useState } from 'react';

import ErrorIcon from '../img/error.png';
import Flex from './Flex';
import { SubTitle, Title } from '../styles/CreateBoardPageStyled';
import { StyledModal, customStyles, ErrorImg, BtnYes, BtnNo } from '../styles/ModalStyled';

interface CustomModalProps {
  title: string;
  subTitle: string;
}

/*
>>>>> 모달창 사용 방법
<CustomModal title="블록을 삭제하시겠습니까?" subTitle="삭제 이후 되돌릴 수 없습니다." />
이렇게 컴포넌트로 불러와서 사용할 수 있습니다.

추후 기능에 맞춰 다른 함수를 받아 사용할 수 있도록 수정할 예정입니다.
*/

const CustomModal: React.FC<CustomModalProps> = ({ title, subTitle }) => {
  const [isModal, setIsModal] = useState<boolean>(true);

  return (
    <StyledModal
      isOpen={isModal}
      shouldFocusAfterRender={false}
      onRequestClose={() => setIsModal(false)}
      style={customStyles}
    >
      <ErrorImg src={ErrorIcon} alt="error_icon"></ErrorImg>
      <Flex flexDirection="column">
        <SubTitle>{subTitle}</SubTitle>
        <Title>{title}</Title>
      </Flex>
      <Flex>
        <BtnYes onClick={() => setIsModal(false)}>예</BtnYes>
        <BtnNo onClick={() => setIsModal(false)}>아니오</BtnNo>
      </Flex>
    </StyledModal>
  );
};

export default CustomModal;

import ErrorIcon from '../img/error.png';
import { BtnNo, BtnYes, customStyles, ErrorImg, StyledModal, SubTitle, Title } from '../styles/ModalStyled';
import type { CustomModalProps } from '../types/CustomModal';
import Flex from './Flex';

const CustomModal = ({ title, subTitle, onYesClick, onNoClick }: CustomModalProps) => {
  return (
    <StyledModal
      isOpen
      shouldFocusAfterRender={false}
      style={customStyles}
      onRequestClose={onNoClick} // 기본적으로 No 버튼 클릭 시 모달 닫힘
    >
      <ErrorImg alt='error_icon' src={ErrorIcon} />
      <Flex flexDirection='column'>
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

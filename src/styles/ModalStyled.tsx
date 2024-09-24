import Modal from 'react-modal';

import styled from 'styled-components';
import theme from '../styles/Theme/Theme';

/* 모달 뒷배경 스타일 */
export const customStyles = {
  overlay: {
    background: 'rgba(0, 0, 0, 0.4)',
    backdropFilter: 'blur(2px)',
    zIndex: 1,
  },
};

/* 모달창 스타일 */
export const StyledModal = styled(Modal)`
  width: 27rem;
  height: 15rem;
  padding: 2rem 3rem;

  /* 화면 중앙에 고정 (navbar 크기 제외) */
  position: fixed;
  top: 50%;
  left: calc(50% + 6.25rem);
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  border-radius: 0.625rem;
  border: 1px solid ${theme.color.stroke2};
  box-shadow: ${theme.boxShadow.default};

  background-color: ${theme.color.white};
`;

export const ErrorImg = styled.img`
  width: 2rem;
  height: 2rem;
`;

export const Title = styled.p`
  font-size: 1rem;
  font-weight: ${theme.font.weight.bold};
  color: ${theme.color.text};
`;

export const SubTitle = styled.p`
  margin-bottom: 0.5rem;
  font-size: ${theme.font.size.caption};
  font-weight: ${theme.font.weight.medium};
  color: ${theme.color.gray};
`;

export const BtnYes = styled.button`
  width: 5rem;
  padding: 0.3rem 1rem;
  border: 1px solid ${theme.color.stroke2};
  margin-right: 2rem;
  color: ${theme.color.text};
  border-radius: 0.625rem;

  &:hover {
    background-color: ${theme.color.stroke2};
  }
`;

export const BtnNo = styled.button`
  width: 5rem;
  padding: 0.3rem 1rem;
  border: 1px solid ${theme.color.stroke2};
  background: ${theme.color.gradation};
  color: ${theme.color.white};
  border-radius: 0.625rem;

  &:hover {
    background: ${theme.color.main};
  }
`;

export const BtnUpdate = styled.button`
  width: 7rem;
  padding: 0.7rem 1rem;
  border: 1px solid ${theme.color.stroke2};
  background: ${theme.color.gradation};
  color: ${theme.color.white};
  border-radius: 0.625rem;
`;

export const StyledModalUpdate = styled(Modal)`
  width: 27rem;
  padding: 1rem 1rem 2rem 1rem;

  /* 화면 중앙에 고정 (navbar 크기 제외) */
  position: fixed;
  top: 50%;
  left: calc(50% + 6.25rem);
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  border-radius: 0.625rem;
  border: 1px solid ${theme.color.stroke2};
  box-shadow: ${theme.boxShadow.default};

  background-color: ${theme.color.white};

  gap: 40px;

  input:focus {
    outline: none;
  }

  &:focus {
    outline: none;
  }
`;

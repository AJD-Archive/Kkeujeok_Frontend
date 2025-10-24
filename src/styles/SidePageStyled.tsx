import 'react-datepicker/dist/react-datepicker.css';

import styled from 'styled-components';

import theme from './Theme/Theme';

type Props = {
  highlightColor?: string;
  progress?: string;
};

export const SideScreenContainer = styled.div`
  background: rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  backdrop-filter: blur(4px);

  hr {
    border: 1px solid #f4f4f4;
  }
`;

export const SideScreen = styled.div`
  position: absolute;
  top: 0;
  right: 0;

  width: 70%;
  height: 100%;
  padding: 4.0625rem 3.1875rem;
  background-color: white;

  box-shadow: -10px 0px 100px 10px rgba(0, 0, 0, 0.1);

  hr {
    margin-bottom: 1.6875rem;
  }
`;

export const TitleContainer = styled.div`
  margin: 2rem 0 0 3.5rem;
`;

export const ImgWrapper = styled.img`
  width: 1rem;
  cursor: pointer;
`;

export const DateContainer = styled.div`
  margin: 0 3.5rem;
`;

export const StatusBarContainer = styled.div<Props>`
  width: fit-content;
  justify-content: space-between;
  /* height: auto; */
  display: flex;
  align-items: center;
  padding: 0.2344rem 0;
  border-radius: 2.3438rem;
  font-size: ${theme.font.size.caption};
  font-weight: ${theme.font.weight.medium};
  background: ${({ highlightColor }) => highlightColor};

  &::before {
    content: '';
    width: 0.75rem;
    height: 0.75rem;
    margin-left: 0.2813rem;
    border-radius: 50%;
    background: ${theme.color.white};
  }
  span {
    color: ${theme.color.white};
    margin-right: 0.5313rem;
    margin-left: 0.2344rem;
  }
`;

export const CategoryContainer = styled.div`
  /* margin: 0 3.5rem; */
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.5rem 0;
  margin-top: 1rem;
  border: none;
  font-size: ${theme.font.size.mainTitle};
  font-weight: ${theme.font.weight.bold};

  &:focus {
    outline: none;
  }
`;

export const InputCategory = styled.input`
  width: 50%;
  padding: 0.5rem 0;
  border: none;
  font-size: ${theme.font.size.main};
  font-weight: ${theme.font.weight.medium};

  &:focus {
    outline: none;
  }
`;

export const RowWrapper = styled.div`
  margin: 0.5rem 0;

  display: flex;
  align-items: center;
`;

export const D_Day = styled.p`
  font-size: ${theme.font.size.main};
  font-weight: ${theme.font.weight.bold};
`;

export const StyledDatePicker = styled.div`
  width: 40vw;
  display: flex;
  align-items: center;

  p {
    font-weight: ${theme.font.weight.bold};
  }

  .react-datepicker {
    border: 1px solid ${theme.color.lightGray};
    font-size: 0.8rem;
  }

  .react-datepicker__triangle {
    display: none;
  }

  .react-datepicker__input-container {
    input {
      width: 100%;
      padding: 0.5rem;
      border: none;
      font-size: 1rem;
      border-bottom: 2px solid ${theme.color.white};
    }
    input:focus {
      outline: none;
      border-bottom: 2px solid ${theme.color.lightGray};
    }
  }

  .react-datepicker__month-container {
    border: none;
  }

  .react-datepicker__time-container {
    border-left: 1px solid ${theme.color.lightGray};
  }

  .date-picker-container {
    display: block;
  }

  .react-datepicker__header {
    background-color: #f0f0f0;
    border-bottom: 1px solid ${theme.color.stroke2};
  }

  .react-datepicker__day--selected,
  .react-datepicker__day--keyboard-selected {
    background: ${theme.color.gradation};
    color: white;
  }

  .react-datepicker__time-container
    .react-datepicker__time
    .react-datepicker__time-box
    ul.react-datepicker__time-list
    li.react-datepicker__time-list-item--selected {
    background: ${theme.color.gradation};
    color: white;
  }
`;

export const StyledEditorWrapper = styled.div`
  .bn-editor {
    height: 65vh;
    overflow-y: scroll;
  }
`;

export const DeleteIcon = styled.div`
  width: 1.8rem;
  height: 1.8rem;

  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 1rem;
    cursor: pointer;
  }

  &:hover {
    background-color: ${theme.color.stroke2};
  }
`;

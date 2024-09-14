import { styled } from 'styled-components';
import theme from '../styles/Theme/Theme';
import TextareaAutosize, { TextareaAutosizeProps } from 'react-textarea-autosize';
import DatePicker from 'react-datepicker';
interface StyledTextareaProps extends TextareaAutosizeProps {
  width?: string;
}

export const MainDashBoardLayout = styled.div`
  width: 100vw;
  min-width: 100vw;
  height: 100vh;
  display: flex;
`;

export const MainDashBoardContainer = styled.section`
  width: 100%;
  padding: 4.3125rem 2.5rem;
  overflow: hidden;

  hr {
    border: 1px solid #f4f4f4;
  }
`;

export const Header = styled.div`
  padding-bottom: 13px;
  border-bottom: 1px solid #f4f4f4;
  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    width: 1.5rem;
    cursor: pointer;
  }
`;

export const Title = styled.p`
  font-size: 1.5rem;
  font-weight: ${theme.font.weight.bold};
`;

export const SubTitle = styled.p`
  margin-top: 0.5rem;
  font-size: 1rem;
  font-weight: ${theme.font.weight.medium};
  color: ${theme.color.gray};
  margin-right: 13px;
`;

export const CategoriesContainer = styled.p`
  margin: 2rem 0;

  display: flex;
  overflow-y: scroll;
`;

export const Category = styled.p`
  width: fit-content;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  margin-right: 0.7rem;
  white-space: nowrap;
  font-size: 0.8rem;

  color: ${theme.color.gray};
  background-color: ${theme.color.stroke2};
  cursor: pointer;

  background:
    linear-gradient(white, white) padding-box,
    linear-gradient(45deg, rgba(76, 140, 255, 0.5), rgba(152, 71, 255, 0.5)) border-box;
  border: 3px solid transparent;

  &:hover {
    background: linear-gradient(45deg, ${theme.color.main}, ${theme.color.main2}) border-box;
    color: ${theme.color.white};
  }
`;

export const SearchContainer = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SearchBar = styled.div``;

export const Input = styled.input`
  width: 30rem;
  padding: 0.8rem 2rem;
  font-size: 0.8rem;
  border-radius: 5rem;
  border: 1px solid ${theme.color.lightGray};

  &:focus {
    outline: none;
  }
`;

export const Button = styled.button`
  margin-left: 0.5rem;
  padding: 0.8rem 1rem;
  border-radius: 5rem;

  background-color: ${theme.color.lightGray};
  color: ${theme.color.white};

  &:hover {
    background-color: ${theme.color.gray};
  }
`;

export const ChallengeContainer = styled.div`
  width: 100%;
  margin-top: 2rem;
  height: 63%;

  display: flex;
  flex-wrap: wrap; /* 아이템이 컨테이너의 너비를 초과하면 자동으로 줄바꿈 */
  gap: 1rem; /* 아이템 간의 간격 */
  justify-content: center; /* 아이템들을 중앙 정렬 */

  overflow: hidden;
`;

export const ChallengeComponent = styled.div`
  margin-right: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ChallengeImg = styled.div`
  width: 9rem;
  height: 9rem;
  border-radius: 50%;
  background-color: ${theme.color.lightGray};
`;

export const ChallengeName = styled.p`
  margin-top: 1rem;
  font-size: 1.1rem;
  font-weight: ${theme.font.weight.semiBold};
`;

export const ChallengeHeadCount = styled.p`
  margin-top: 0.3rem;
  font-size: 0.8rem;
  font-weight: ${theme.font.weight.medium};
  color: ${theme.color.gray};
`;

export const PaginationWrapper = styled.div`
  width: 100%;
  margin-top: 1rem;
  display: flex;
  justify-content: center;
`;

// * 챌린지 생성 디자인
export const CreateDashBoardContainer = styled.section`
  width: 100%;
  padding: 4.3125rem 2.5rem;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const CreateDashBoardModal = styled.div`
  padding: 5rem;
  border-radius: 1rem;
  border: 1px solid ${theme.color.stroke2};
  box-shadow: ${theme.boxShadow.default};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: relative;
`;

export const CreateSubTitle = styled(SubTitle)`
  align-self: flex-start;
  margin: 3rem 0 0.5rem 6.2rem;
`;

export const RowWrapper = styled.div`
  margin: 0.3rem 0;

  display: flex;
  align-items: center;
`;

export const Label = styled.label`
  width: 5.2rem;
  text-align: right;
  margin-right: 1rem;
  color: ${theme.color.black};
  font-size: 1rem;
`;

export const FileLabel = styled.label`
  width: 13.8rem;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  border-radius: 0.3rem;
  border: 1px solid ${theme.color.stroke2};
  color: ${theme.color.gray};

  overflow-x: scroll;

  input[type='file']::file-selector-button {
    padding: 0.2rem 0.5rem;
    background: #fff;
    border: 1px solid ${theme.color.stroke2};
    border-radius: 10px;
    cursor: pointer;
    &:hover {
      background: ${theme.color.stroke2};
    }
  }
`;

export const InputForm = styled.input`
  width: ${props => props.width};
  padding: 0.5rem 1rem;
  /* font-size: 1rem; */
  border-radius: 0.3rem;
  border: 1px solid ${theme.color.stroke2};
  color: ${theme.color.black};

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${theme.color.lightGray};
  }
`;

export const Textarea = styled(TextareaAutosize)<StyledTextareaProps>`
  width: ${props => props.width};
  min-width: ${props => props.width};
  max-width: ${props => props.width};
  min-height: 2rem;
  padding: 0.55rem 1rem;

  overflow-wrap: break-word;
  word-break: break-all;
  white-space: pre-wrap;
  resize: none;

  border-radius: 0.3rem;
  border: 1px solid ${theme.color.stroke2};

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${theme.color.lightGray};
  }
`;

export const Select = styled.select<StyledTextareaProps>`
  width: ${props => props.width};
  padding: 0.5rem 1rem;
  /* font-size: 1rem; */
  border-radius: 0.3rem;
  border: 1px solid ${theme.color.stroke2};
  color: ${theme.color.black};

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${theme.color.lightGray};
  }
`;

export const SubmitBtn = styled.button`
  margin-top: 3rem;
  padding: 0.65rem 3rem;
  border-radius: 0.625rem;
  background: ${theme.color.gradation};
  font-size: 1rem;
  color: ${theme.color.white};
`;

export const SelectTerm = styled.div`
  margin-right: 0.3rem;
  padding: 0.55rem 1rem;
  border-radius: 0.3rem;
  border: 1px solid ${theme.color.stroke2};
  color: ${theme.color.gray};
  font-size: 0.9rem;

  cursor: pointer;
`;

export const TermWrapper = styled.div`
  width: 15.5rem;
  /* padding: 0.55rem 0; */
  margin-left: 2.2rem;

  display: flex;
  /* justify-content: flex-end; */

  /* background-color: red; */
`;

export const Week = styled(SelectTerm)`
  width: fit-content;
  padding: 0.5rem;

  &:last-child {
    margin-right: 0;
  }
`;

export const Date = styled.div``;

export const DateContainer = styled.div`
  margin: 0 3.5rem;
`;

export const StyledDatePicker = styled.div`
  width: 6.6rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border: none;
  font-size: 0.9rem;

  p {
    color: ${theme.color.gray};
    white-space: nowrap;
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

  .react-datepicker__input-container {
    input {
      font-size: 0.9rem; /* 글자 크기 조정 */
      border: none;
      /* border-bottom: 1px solid lightgray; */
    }

    input:focus {
      outline: none; /* outline 제거 */
      border: none;
    }
  }
`;

export const EndDateWrapper = styled.div`
  width: 30rem;
  padding: 0 1rem;
  font-size: 0.9rem;
  border-radius: 0.3rem;
  border: 1px solid ${theme.color.stroke2};
`;

export const StyledDatePicker2 = styled(StyledDatePicker)`
  width: 8rem;
`;

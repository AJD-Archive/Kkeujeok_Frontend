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
    margin-right: 1rem;
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

export const Category = styled.p<{ isSelected: boolean }>`
  width: fit-content;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  margin-right: 0.7rem;
  white-space: nowrap;
  font-size: 0.9rem;

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

  background: ${props =>
    props.isSelected &&
    `linear-gradient(45deg, ${theme.color.main}, ${theme.color.main2}) border-box`};
  color: ${props => (props.isSelected ? `${theme.color.white}` : `${theme.color.gray}`)};
`;

export const SearchContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SearchBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 30rem;
  padding: 0.8rem 2rem;
  font-size: 0.8rem;
  border-radius: 5rem;
  border: 1px solid ${theme.color.lightGray};
  &:focus {
    outline: none;
  }

  svg {
    margin-right: 1rem;
  }
`;

export const Input = styled.input`
  width: 100%;
  /* width: 30rem;
  padding: 0.8rem 2rem;
  font-size: 0.8rem;
  border-radius: 5rem;
  border: 1px solid ${theme.color.lightGray}; */
  border: none;
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
  width: 80%;
  margin-top: 2rem;
  display: grid;
  gap: 2rem 0.5rem;

  grid-template-columns: repeat(5, 1fr); /* 각 줄에 5개의 열 */
  grid-template-rows: repeat(2, auto); /* 2줄로 고정 */
  max-width: 100vw;
`;

export const ChallengeComponent = styled.div`
  margin-right: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

export const ChallengeImg = styled.img`
  width: 9vw;
  height: 9vw;
  object-fit: cover;
  border-radius: 50%;
  background-color: ${theme.color.lightGray};
`;

export const ChallengeName = styled.p`
  width: 100%;
  text-align: center;

  margin-top: 1rem;
  font-size: 1.1rem;
  font-weight: ${theme.font.weight.semiBold};
`;

export const ChallengeHeadCount = styled.p`
  width: 100%;
  text-align: center;

  margin-top: 0.3rem;
  font-size: 0.8rem;
  font-weight: ${theme.font.weight.medium};
  color: ${theme.color.gray};
`;

export const PaginationWrapper = styled.div`
  width: 100%;
  margin-top: 2rem;
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
  padding: 4rem 5rem;
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
  /* width: 13.8rem; */
  z-index: 1;
  width: 6rem;
  height: 6rem;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  border-radius: 0.3rem;
  border: 1px solid ${theme.color.stroke2};
  color: ${theme.color.gray};
  overflow-x: scroll;
  cursor: pointer;
  input[type='file'] {
    display: none;
  }
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

export const JoinSelect = styled.select`
  padding: 0.5rem 1rem;
  margin: 1rem 0;
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

export const ErrorMessage = styled.p`
  color: ${theme.color.main};
  font-size: 0.9rem;
  text-align: center;
  line-height: 1.3rem;
`;

export const SubmitBtn = styled.button`
  margin-top: 3rem;
  padding: 0.65rem 3rem;
  border-radius: 0.625rem;
  background: ${theme.color.gradation};
  font-size: 1rem;
  color: ${theme.color.white};
`;

export const SelectTerm = styled.div<{ isSelected: boolean }>`
  margin-right: 0.3rem;
  padding: 0.55rem 1rem;
  border-radius: 0.3rem;
  border: 1px solid ${theme.color.stroke2};
  color: ${theme.color.gray};
  font-size: 0.9rem;
  white-space: nowrap;

  background-color: ${({ isSelected }) => (isSelected ? `${theme.color.stroke2}` : 'white')};
  color: ${({ isSelected }) => isSelected && `${theme.color.text}`};

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

export const Week = styled(SelectTerm)<{ isSelected: boolean }>`
  width: fit-content;
  padding: 0.5rem;

  background-color: ${({ isSelected }) => (isSelected ? `${theme.color.stroke2}` : 'white')};
  color: ${({ isSelected }) => isSelected && `${theme.color.text}`};

  &:last-child {
    margin-right: 0;
  }
`;

export const Month = styled.div<{ isSelected: boolean }>`
  width: 2rem;
  padding: 0.5rem;
  margin: 0.1rem;
  padding: 0.55rem 1rem;
  border-radius: 0.3rem;
  border: 1px solid ${theme.color.stroke2};
  color: ${theme.color.gray};
  font-size: 0.9rem;
  white-space: nowrap;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${({ isSelected }) => (isSelected ? `${theme.color.stroke2}` : 'white')};
  color: ${({ isSelected }) => isSelected && `${theme.color.text}`};

  cursor: pointer;
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

// * 챌린지 디테일 페이지 스타일
export const DetailHeader = styled.div`
  padding-bottom: 13px;
  border-bottom: 1px solid #f4f4f4;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const BackButton = styled.img`
  width: 1.5rem;
  cursor: pointer;
  margin-right: 1rem;
`;

export const DetaileSubTitle = styled(SubTitle)`
  margin-top: 0;
`;

export const DetailTitle = styled(Title)`
  margin-top: 0.3rem;
`;

export const JoinButton = styled.div`
  padding: 0.8rem 1.5rem;
  background: linear-gradient(90deg, #4c8cff 0%, #9847ff 100%);
  border-radius: 1.25rem;
  color: ${theme.color.white};
  cursor: pointer;
`;

export const EditDelButtonWrapper = styled.div`
  display: flex;
  margin-right: 1.5rem;
  /* position: absolute;
  right: 10rem; */
`;

export const EditDelButton = styled.img`
  width: 1rem;
  cursor: pointer;

  &:first-child {
    width: 1.1rem;
    margin-right: 1rem;
  }
`;

export const QuitButton = styled(JoinButton)`
  background: ${theme.color.gray};
`;

export const SectionTitle = styled.p`
  margin-top: 2rem;
  color: ${theme.color.text};
`;

export const ChallengeDetailContainer = styled.div`
  width: 100%;
  height: 40vh;
  margin-top: 1rem;
  border: 1px solid ${theme.color.stroke2};
  border-radius: 1.25rem;
`;

// 추후 img로 변환
export const ChallengeThumbnail = styled.img`
  width: 35%;
  height: 40vh;

  object-fit: cover;
  border-radius: 1.25rem 0 0 1.25rem;
  background-color: ${theme.color.stroke2};
`;

export const DetailContainer = styled.div`
  width: 65%;
  height: 40vh;
  padding: 2rem;
  border-radius: 0 1.25rem 1.25rem 0;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const DetailContentWrapper = styled.div``;

export const DetailSquareWrapper = styled.div`
  & > *:first-child {
    margin-bottom: 0.7rem;
  }
`;

export const DetailDate = styled.p`
  margin-top: 0.5rem;
  line-height: 1.4rem;
  /* font-weight: ${theme.font.weight.bold}; */
  color: ${theme.color.gray};
`;

export const DetailContent = styled.div`
  margin-top: 0.5rem;
  line-height: 1.4rem;

  max-height: 12vh;
  overflow-y: scroll;

  p {
    font-size: 0.9rem;
  }
`;

export const DetailTermSquare = styled.div`
  margin-left: 1.5rem;
  padding: 1rem 1.5rem;

  background: ${theme.color.gradation};
  color: ${theme.color.white};
  border-radius: 1.25rem;
  font-size: 0.9rem;
  white-space: nowrap;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DetailRealTimeCountSquare = styled(DetailTermSquare)`
  background: ${theme.color.stroke2};
  color: ${theme.color.text};
`;

export const ChallengeBlockPriview = styled.div`
  width: fit-content;
  min-width: 20rem;
  max-width: 30rem;
  margin-top: 0.5rem;

  background: ${theme.color.white};
  padding: 1.375rem 1.375rem 1.375rem 1.375em;
  border: 1px solid ${theme.color.stroke2};
  border-radius: 10px;

  h3 {
    font-size: ${theme.font.size.main};
    font-weight: ${theme.font.weight.medium};
    color: ${theme.color.black};
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.5em;
    max-height: 3em;
    margin-right: 23px;
    flex: 2;
  }

  p {
    margin-top: 0.5rem;
    font-size: ${theme.font.size.caption};
    font-weight: ${theme.font.weight.light};
    color: ${theme.color.gray};
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

export const ChallengeCreatorContainer = styled.div`
  width: fit-content;
  height: fit-content;
  display: flex;
  align-items: center;

  span {
    font-size: ${theme.font.size.caption};
    color: ${theme.color.gray};
    font-weight: ${theme.font.weight.light};
    cursor: pointer;
  }
`;

export const ProfileImage = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.5rem;
  border-radius: 50%;
  background-color: ${theme.color.stroke2};
`;

export const RealTimeContainer = styled.div`
  width: 100%;
  height: 25vh;
  margin-top: 1rem;

  display: flex;
  overflow-x: scroll;
`;

export const RealTimeComponent = styled.div`
  width: fit-content;
  padding: 2rem;
  margin-right: 1rem;
  border: 1px solid ${theme.color.stroke2};
  background: ${theme.color.white};
  border-radius: 1.25rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const RealTimeUserImg = styled.img`
  width: 5rem;
  height: 5rem;
  object-fit: cover;
  border-radius: 50%;
  background-color: ${theme.color.stroke2};
`;

export const RealTimeUserName = styled.p`
  max-width: 7rem;
  max-height: 3rem;
  overflow-y: scroll;
  /* white-space: nowrap; */

  margin-top: 1.5rem;
  font-size: 1rem;
  color: ${theme.color.text};
`;

export const errorMessage = styled.p`
  font-size: 1rem;
  color: ${theme.color.gray};
`;

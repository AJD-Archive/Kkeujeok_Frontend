import styled from 'styled-components';
import theme from '../styles/Theme/Theme';
import TextareaAutosize, { TextareaAutosizeProps } from 'react-textarea-autosize';
interface StyledTextareaProps extends TextareaAutosizeProps {
  width?: string;
}

export const CreateDashBoardLayout = styled.div`
  width: 100vw;
  min-width: 100vw;
  height: 100vh;
  display: flex;
`;

export const CreateDashBoardContainer = styled.section`
  width: 100%;
  padding: 4.3125rem 2.5rem;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.p`
  font-size: 1.5rem;
  font-weight: ${theme.font.weight.bold};
  color: ${theme.color.text};
`;

export const SubTitle = styled.p`
  margin-top: 1rem;
  font-size: ${theme.font.size.mainTitle};
  font-weight: ${theme.font.weight.medium};
  color: ${theme.color.gray};
`;

export const LinksContainer = styled.div`
  margin-top: 7rem;
`;

export const CreateBoardWrapper = styled.div`
  margin: 0 2rem;
  border-radius: 1rem;
  border: 1px solid ${theme.color.stroke2};
  box-shadow: ${theme.boxShadow.default};

  cursor: pointer;
`;

export const PersonalIconImgWrapper = styled.div`
  img {
    width: 2.5rem;
  }
`;

export const TeamIconImgWrapper = styled.div`
  img {
    width: 3rem;
  }
`;

export const Explanation = styled.p`
  margin: 1rem 0 3rem 0;
  line-height: 1rem;
  font-size: ${theme.font.size.caption};
  font-weight: ${theme.font.weight.light};
  color: ${theme.color.gray};
`;

export const BoardTitle = styled.p`
  margin: auto;
  font-size: ${theme.font.size.main};
  font-weight: ${theme.font.weight.bold};
  color: ${theme.color.text};
`;

/* 개인 대시보드 css */
export const CreateDashBoardModal = styled.div`
  padding: 5rem;
  border-radius: 1rem;
  border: 1px solid ${theme.color.stroke2};
  box-shadow: ${theme.boxShadow.default};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const CreateForm = styled.form`
  margin: 3rem;
  display: flex;
  flex-direction: column;
`;

export const RowWrapper = styled.div`
  margin: 0.5rem 0;

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

export const Input = styled.input`
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

export const Scope = styled.div`
  padding: 0.55rem 1rem;
  margin-left: 1rem;
  font-size: 0.8rem;
  border-radius: 0.3rem;
  border: 1px solid ${theme.color.stroke2};
  color: ${theme.color.lightGray};
  cursor: pointer;
  display: flex;

  p {
    color: ${theme.color.gray};
    margin-right: 0.2rem;
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

export const Select = styled.select`
  width: 14rem;
  margin-right: 0.3rem;
  padding: 0.44rem 1rem;
  /* font-size: 1rem; */
  border-radius: 0.3rem;
  border: 1px solid ${theme.color.stroke2};

  color: ${props => (props.value ? `${theme.color.black}` : `${theme.color.lightGray}`)};

  &:focus {
    outline: none;
  }
`;

export const SubmitBtn = styled.button`
  padding: 0.65rem 3rem;
  border-radius: 0.625rem;
  background: ${theme.color.gradation};
  font-size: 1rem;
  color: ${theme.color.white};
`;

/* 팀 대시보드 생성 */
export const InvitedBtn = styled.button`
  padding: 0.3rem 0.5rem;
  margin-left: 0.7rem;
  border-radius: 0.26rem;
  background: ${theme.color.lightGray};
  font-size: 0.75rem;
  color: ${theme.color.gray};
`;

export const MemberWrapper = styled.div`
  margin-left: 3.3rem;
  max-height: 11rem;
  overflow-y: scroll;
`;

export const Member = styled.div`
  width: 15rem;
  margin: 0.5rem 0;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

export const MemberImage = styled.image`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background-color: ${theme.color.stroke2};
`;

export const MemberEmail = styled.p`
  width: 10rem;
  font-size: 0.75rem;
  color: ${theme.color.black};
`;

export const MemberState = styled.p`
  font-size: 0.75rem;
  color: ${theme.color.gray};
`;

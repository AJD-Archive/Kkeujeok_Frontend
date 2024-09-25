import { styled } from 'styled-components';
import theme from '../styles/Theme/Theme';

export const MyPageLayout = styled.section`
  width: 43%;
  margin: 0 auto;
  margin-top: 4.125rem;
  position: relative;
`;
export const GridContainer = styled.div`
  display: grid;
  height: 23.875rem;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 1.0625rem;
`;
export const MainText = styled.span`
  font-size: ${theme.font.size.mainTitle};
  font-weight: ${theme.font.weight.bold};
  font-size: 20px;
`;

export const CaptionText = styled.span`
  font-size: ${theme.font.size.main};
  font-weight: ${theme.font.weight.light};
  color: ${theme.color.gray};
`;

export const GoogleImageIcon = styled.img`
  width: 18px;
  height: 18px;
`;

export const ImageWrapper = styled.div`
  width: 32px;
  height: 32px;
  position: relative;
  cursor: pointer;
  align-self: flex-start;
  position: absolute;
  right: 0px;
  top: -10px;
  background: white;
  border-radius: 1rem;
  z-index: 1;
  img {
    width: 100%;
    height: 100%;
  }

  div {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: #ff6c6c;
    color: white;
    font-weight: 100;
    position: absolute;
    bottom: -3px;
    right: -3px;
    text-align: center;
  }
`;

export const PagenateBox = styled.div`
  ul {
    display: flex;
    justify-content: center;
    width: 100%;
    margin: 80px 0;
    gap: 0.3125rem;
  }
`;

export const ChallengeLayout = styled.div`
  width: 100%;
  border: 1px solid ${theme.color.stroke2};
  padding: 1.1875rem 1.625rem 2.625rem 1.625rem;
  border-radius: 0.625rem;
`;

export const ChallengeBoxTitle = styled.span`
  display: inline-block;
  font-size: ${theme.font.size.main};
  font-weight: ${theme.font.weight.bold};
  margin-bottom: 0.4375rem;
`;

export const CahllengeInfo = styled.div`
  span {
    display: inline-block;
    margin-bottom: 0.4375rem;
  }
  span,
  p {
    font-size: ${theme.font.size.caption};
    font-weight: 400;
  }

  hr {
    border: 0.3px solid ${theme.color.stroke2};
  }
`;

export const CloseButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: end;

  img {
    width: 1rem;
  }

  img:hover {
    cursor: pointer;
  }
`;

export const ButtonContainer = styled.div<{ teamBool: string }>`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-self: start;

  button {
    width: 4rem;
    height: 2.5rem;
    border: 1px solid ${theme.color.stroke2};
    border-radius: 0.5rem 0 0 0.5rem;
    background: white;
  }

  button:first-child {
    background: ${props => props.teamBool === 'personal' && theme.color.gradation};
    color: ${props => props.teamBool === 'personal' && 'white'};
    border: ${props => props.teamBool === 'personal' && theme.color.stroke2};
  }

  button:nth-child(2) {
    background: ${props => props.teamBool === 'team' && theme.color.gradation};
    color: ${props => props.teamBool === 'team' && 'white'};
    border: ${props => props.teamBool === 'team' && theme.color.stroke2};
  }
  button:last-child {
    background: ${props => props.teamBool === 'challenge' && theme.color.gradation};
    color: ${props => props.teamBool === 'challenge' && 'white'};
    border: ${props => props.teamBool === 'challenge' && theme.color.stroke2};
  }
`;

export const TeamBlockWrapper = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

export const ButtonWrapper = styled.button`
  font-weight: 400;
  font-size: ${theme.font.size.caption};
  padding: 0.4375rem 0.75rem;
  border-radius: 0.625rem;
  width: 5.125rem;
  color: ${theme.color.gray};
  &:first-child {
    background-color: ${theme.color.stroke2};
  }
  &:last-child {
    border: 1px solid ${theme.color.lightGray};
  }
`;

export const EditLayout = styled.section`
  display: flex;
  width: 100%;
`;
export const EditContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  font-weight: ${theme.font.weight.bold};

  label {
    margin-bottom: 2rem;
  }
  form {
    width: 40rem;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  input {
    border: none;
    background: #f4f4f4;
    width: 15rem;
    padding: 1rem;
    border-radius: 1rem;
    margin-top: 0.5rem;
  }

  p {
    color: ${theme.color.main};
    margin-top: 0.5rem;
    margin-left: 0.5rem;
  }
`;

export const AlarmDataContainer = styled.div`
  position: absolute;
  right: 10px;
  top: 0px;
  width: 20.25rem;
  max-height: 39.25rem;
  background: white;
  border: 1px solid #f4f4f4;
  border-radius: 1rem;
  overflow: scroll;
  box-shadow: 0px 0px 10px rgba(1, 1, 1, 0.07);

  span {
    color: gray;
    font-weight: 600;
  }
`;

export const DashboardContainer = styled.div`
  flex: 1;
`;

export const NoContentComponent = styled.div`
  border: 1px solid ${theme.color.stroke2};
  border-radius: 1rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: ${theme.color.lightGray};
`;

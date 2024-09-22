import styled from 'styled-components';
import Flex from './Flex';
import theme from '../styles/Theme/Theme';
import { postTeamDashboard } from '../api/TeamDashBoardApi';

type Props = {
  message: string;
  isRead: boolean;
};
const AlarmBlock = ({ message, isRead }: Props) => {
  const nameMatch = message.match(/([가-힣]+)(?=님)/);

  const dashboardMatch = message.match(/\s(.+?)\s대시보드/);

  const numberMatch = message.match(/\d+$/);

  const name = nameMatch ? nameMatch[0] : null;
  const dashboard = dashboardMatch ? dashboardMatch[0] : null;
  const number = numberMatch ? numberMatch[0] : '';

  const onAcceptHandler = () => {
    postTeamDashboard(number);
  };
  return (
    <AlarmContainer isRead={isRead}>
      <Flex alignItems="center">
        <UserInfoContainer>
          <h6>{name}</h6>
          <p>{dashboard} 초대</p>
        </UserInfoContainer>
        {number !== '' ? <button onClick={onAcceptHandler}>수락</button> : ''}
      </Flex>
    </AlarmContainer>
  );
};
export default AlarmBlock;

const AlarmContainer = styled.div<{ isRead: boolean }>`
  padding: 2rem;
  background: ${props => (props.isRead ? 'white' : '#fffdcc')};
  font-size: 0.8rem;
  border-bottom: 1px solid ${theme.color.stroke2};
  h6 {
    margin-bottom: 0.2rem;
  }

  button {
    background: ${theme.color.lightGray};
    border-radius: 0.5rem;
    padding: 0.2rem 0.5rem;
    color: white;
    font-size: 0.8rem;
    font-weight: 600;
  }

  button:hover {
    background: ${theme.color.gradation};
  }
`;

const UserInfoContainer = styled.div`
  flex: 1;
`;

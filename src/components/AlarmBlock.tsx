import styled from 'styled-components';
import Flex from './Flex';
import theme from '../styles/Theme/Theme';
import { postTeamDashboard } from '../api/TeamDashBoardApi';
import { customErrToast } from '../utils/customErrorToast';
import { useAtom } from 'jotai';
import { navbarUpdateTriggerAtom } from '../contexts/atoms';

type Props = {
  message: string;
  isRead: boolean;
};
const AlarmBlock = ({ message, isRead }: Props) => {
  const modifiedMessage = message.replace(/^[^:]+: /, '');

  let nameMatch;
  let dashboardMatch;
  let description;
  if (message.includes('팀 대시보드 초대')) {
    nameMatch = modifiedMessage.split('님')[0];
    dashboardMatch = modifiedMessage.match(/\s(.+?)\s대시보드/);
    description = `${dashboardMatch ? dashboardMatch[1] : ''} 대시보드 초대`;
  } else if (message.includes('팀 초대 수락')) {
    nameMatch = modifiedMessage.split('님')[0];
    description = `초대를 수락하였습니다`;
  } else if (message.includes('챌린지 블록이 생성되었습니다')) {
    const index = modifiedMessage.indexOf('챌린지 블록이 생성되었습니다');
    nameMatch = message.slice(0, index).trim();
    description = '챌린지 블록이 생성되었습니다';
  } else {
    nameMatch = `반가워요! ${modifiedMessage.split('님')[0]}님이`;
    description = `챌린지에 참여했습니다`;
  }
  const numberMatch = modifiedMessage.match(/\d+$/);

  const name = nameMatch ? nameMatch : null;
  const dashboard = dashboardMatch ? dashboardMatch[0] : null;
  const number = numberMatch ? numberMatch[0] : '';
  const [, setUpdate] = useAtom(navbarUpdateTriggerAtom);

  const onAcceptHandler = async () => {
    const response = await postTeamDashboard(number);
    if (response) {
      customErrToast(`${dashboard} 초대를 수락했습니다.`);
    }
    setUpdate(prev => !prev);
  };

  return (
    <AlarmContainer isRead={isRead}>
      <Flex alignItems="center">
        <UserInfoContainer>
          <h6>{name}</h6>
          <p>{description}</p>
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

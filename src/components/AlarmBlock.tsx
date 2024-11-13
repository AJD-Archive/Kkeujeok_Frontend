import styled from 'styled-components';
import Flex from './Flex';
import theme from '../styles/Theme/Theme';
import { postTeamDashboard } from '../api/TeamDashBoardApi';
import { customErrToast } from '../utils/customErrorToast';
import { useAtom } from 'jotai';
import { navbarUpdateTriggerAtom } from '../contexts/atoms';
import { acceptFriendAlarm } from '../api/MyPageApi';

type Props = {
  message: string;
  isRead: boolean;
};
const AlarmBlock = ({ message, isRead }: Props) => {
  let modifiedMessage = '';
  let followerIdMatch: string = '';

  if (message.includes('followerId')) {
    const matchResult = message.match(/followerId(\d+)/);
    followerIdMatch = matchResult ? matchResult[1] : '';
  } else if (message.includes('teamdashbord')) {
    const matchResult = message.match(/teamdashbord(\d+)/);
    modifiedMessage = matchResult ? matchResult[1] : '';
  }

  let nameMatch;
  let dashboardMatch;
  let description;
  let wordsBeforeLastDashboard: string;

  if (message.includes('팀 대시보드 초대')) {
    nameMatch = message.match(/([a-zA-Z가-힣]+)님/)?.[1] + '님이' || '';
    const trimmedMessage = message.trim();
    const dashboardIndex = trimmedMessage.lastIndexOf('대시보드');
    const nameEndIndex = trimmedMessage.indexOf('님');
    wordsBeforeLastDashboard = trimmedMessage.slice(nameEndIndex + 2, dashboardIndex);
    description = `${wordsBeforeLastDashboard} 대시보드에 초대했어요!`;
  } else if (message.includes('팀 초대 수락')) {
    const colonIndex = message.indexOf(':');
    const nameEndIndex = message.indexOf('님');
    nameMatch = `${message.slice(colonIndex + 2, nameEndIndex)}님이`;
    description = `초대를 수락했어요`;
  } else if (message.includes('챌린지 블록이 생성되었습니다')) {
    const index = message.indexOf('챌린지 블록이 생성되었습니다');
    nameMatch = message.slice(0, index).trim();
    description = '챌린지 블록이 생성됐어요';
  } else if (message.includes('친구 신청을 보냈습니다.')) {
    nameMatch = `${message.split('님')[0]}님이`;
    description = `친구 요청을 보냈어요!`;
  } else {
    const index = message.indexOf('님');
    nameMatch = `반가워요! ${message.slice(message.indexOf(' ') + 5, index)}님이`;
    description = `챌린지에 참여했어요`;
  }
  const numberMatch = modifiedMessage.match(/\d+$/);

  const name = nameMatch ? nameMatch : null;
  const dashboard = dashboardMatch ? dashboardMatch[0] : null;
  const number = numberMatch ? numberMatch[0] : '';
  const [, setUpdate] = useAtom(navbarUpdateTriggerAtom);

  const onAcceptHandler = async () => {
    const response = await postTeamDashboard(number);
    if (response) {
      customErrToast(`${wordsBeforeLastDashboard}대시보드 초대를 수락했어요!`);
    }
    setUpdate(prev => !prev);
  };

  const onAcceptFriend = async () => {
    await acceptFriendAlarm(followerIdMatch);
    customErrToast(`${message.split('님')[0]}님의 친구요청을 수락했어요!`);
  };

  return (
    <AlarmContainer isRead={isRead}>
      <Flex alignItems="center">
        <UserInfoContainer>
          <h6>{name}</h6>
          <p>{description}</p>
        </UserInfoContainer>
        {number !== '' ? <button onClick={onAcceptHandler}>수락</button> : ''}
        {message.includes('친구 신청을 보냈습니다.') === true ? (
          <button onClick={onAcceptFriend}>수락</button>
        ) : (
          ''
        )}
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

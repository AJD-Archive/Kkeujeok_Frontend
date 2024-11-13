import { FollowInfo } from '../../types/ConnectionType';
import * as S from './ConnectionStyled';

interface ConnectionProps {
  follower: FollowInfo;
}

const Connection = ({ follower }: ConnectionProps) => {
  return (
    <S.ConnectionLayout>
      <S.ProfileImageWrapper src={follower.profileImage} />
      <S.ConnectionUserWrapper>
        <p className="name">{follower.name}</p>
        <p className="nickName">{follower.nickname}</p>
      </S.ConnectionUserWrapper>
      <S.FriendRequestButtonWrapper>
        <p>친구 신청</p>
      </S.FriendRequestButtonWrapper>
    </S.ConnectionLayout>
  );
};

export default Connection;

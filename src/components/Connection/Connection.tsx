import { postFollow } from '../../api/ConnectionApi';
import { FollowInfo } from '../../types/ConnectionType';
import * as S from './ConnectionStyled';
import { customErrToast } from '../../utils/customErrorToast';

interface ConnectionProps {
  follower: FollowInfo;
}

const Connection = ({ follower }: ConnectionProps) => {
  const follow = async () => {
    const success = await postFollow(follower.memberId!); // memberId는 항상 존재하기 때문에 !로 검사 생략
    if (success) {
      customErrToast(`${follower.name}님에게 친구 신청을 보냈습니다.`);
    }
  };

  return (
    <S.ConnectionLayout>
      <S.ProfileImageWrapper src={follower.profileImage} />
      <S.ConnectionUserWrapper>
        <p className="name">{follower.name}</p>
        <p className="nickName">{follower.nickname}</p>
      </S.ConnectionUserWrapper>
      <S.FriendRequestButtonWrapper onClick={follow}>
        <p>친구 신청</p>
      </S.FriendRequestButtonWrapper>
    </S.ConnectionLayout>
  );
};

export default Connection;

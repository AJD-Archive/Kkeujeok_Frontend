import * as S from './ConnectionStyled';

const Connection = () => {
  return (
    <S.ConnectionLayout>
      <S.ProfileImageWrapper></S.ProfileImageWrapper>
      <S.ConnectionUserWrapper>
        <p className="name">본명</p>
        <p className="nickName">닉네임#고유번호 | 이메일</p>
      </S.ConnectionUserWrapper>
      <S.FriendRequestButtonWrapper>
        <p>친구 신청</p>
      </S.FriendRequestButtonWrapper>
    </S.ConnectionLayout>
  );
};

export default Connection;

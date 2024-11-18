import { deleteFollow, postFollow } from '../../api/ConnectionApi';
import { FollowInfo } from '../../types/ConnectionType';
import * as S from './ConnectionStyled';
import { customErrToast } from '../../utils/customErrorToast';
import CustomModal from '../CustomModal';
import useModal from '../../hooks/useModal';
import { useState } from 'react';

interface ConnectionProps {
  follower: FollowInfo;
}

const Connection = ({ follower }: ConnectionProps) => {
  const { isModalOpen, openModal, handleYesClick, handleNoClick } = useModal(); // 모달창 관련 훅 호출
  const [isDelModalOpen, setIsDelModalOpen] = useState<boolean>(false);

  const follow = async () => {
    const success = await postFollow(follower.memberId!); // memberId는 항상 존재하기 때문에 !로 검사 생략
    if (success) {
      customErrToast(`${follower.name}님에게 친구 신청을 보냈습니다.`);
    }
  };

  const unFollow = async () => {
    const success = await deleteFollow(follower.memberId!); // memberId는 항상 존재하기 때문에 !로 검사 생략
    if (success) {
      customErrToast(`${follower.name}님을 친구 목록에서 제거했습니다.`);
    }
  };

  // 친구 삭제를 모달창으로 확인
  const submitUnFollow = () => {
    setIsDelModalOpen(true);
    const handleModalClose = () => setIsDelModalOpen(false);
    openModal('yes', unFollow, handleModalClose);
  };

  return (
    <>
      <S.ConnectionLayout>
        <S.ProfileImageWrapper src={follower.profileImage} />
        <S.ConnectionUserWrapper>
          <p className="name">{follower.name}</p>
          <p className="nickName">{follower.nickname}</p>
        </S.ConnectionUserWrapper>
        {follower.isFollow ? (
          <S.FriendRequestButtonWrapper onClick={submitUnFollow}>
            <p>친구 삭제</p>
          </S.FriendRequestButtonWrapper>
        ) : (
          <S.FriendRequestButtonWrapper onClick={follow}>
            <p>친구 신청</p>
          </S.FriendRequestButtonWrapper>
        )}
      </S.ConnectionLayout>

      {isModalOpen && isDelModalOpen && (
        <CustomModal
          title="친구를 삭제하시겠습니까?"
          subTitle="한 번 삭제된 친구는 다시 추가해야 합니다."
          onYesClick={handleYesClick}
          onNoClick={handleNoClick}
        />
      )}
    </>
  );
};

export default Connection;

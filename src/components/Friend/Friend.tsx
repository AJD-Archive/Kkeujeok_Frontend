import { FollowInfo } from '../../types/FriendType';
import * as S from './FriendStyled';
import CustomModal from '../CustomModal';
import useModal from '../../hooks/useModal';
import { useState } from 'react';
import { useDeleteFollow, usePostFollow } from '../../hooks/useFollowersList';

interface FriendProps {
  follower: FollowInfo;
}

const Friend = ({ follower }: FriendProps) => {
  const { isModalOpen, openModal, handleYesClick, handleNoClick } = useModal(); // 모달창 관련 훅 호출
  const [isDelModalOpen, setIsDelModalOpen] = useState<boolean>(false);

  const { mutate: followMutate } = usePostFollow(follower.memberId!, follower.name!);
  const { mutate: unFollowMutate } = useDeleteFollow(follower.memberId!, follower.name!);

  const follow = async () => {
    followMutate();
  };

  const unFollow = async () => {
    unFollowMutate();
  };

  // 친구 삭제를 모달창으로 확인
  const submitUnFollow = () => {
    setIsDelModalOpen(true);
    const handleModalClose = () => setIsDelModalOpen(false);
    openModal('yes', unFollow, handleModalClose);
  };

  return (
    <>
      <S.FriendLayout>
        <S.ProfileImageWrapper src={follower.profileImage} />
        <S.FriendUserWrapper>
          <p className="name">{follower.name}</p>
          <p className="nickName">{follower.nickname}</p>
        </S.FriendUserWrapper>
        {follower.isFollow ? (
          <S.FriendRequestButtonWrapper onClick={submitUnFollow}>
            <p>친구 삭제</p>
          </S.FriendRequestButtonWrapper>
        ) : (
          <S.FriendRequestButtonWrapper onClick={follow}>
            <p>친구 신청</p>
          </S.FriendRequestButtonWrapper>
        )}
      </S.FriendLayout>

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

export default Friend;

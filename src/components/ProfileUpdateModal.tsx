import { customStyles, Title, BtnUpdate, StyledModalUpdate } from '../styles/ModalStyled';
import * as S from '../styles/MyPageStyled';
import Flex from './Flex';
import { updateUserInfo } from '../api/MyPageApi';
import { useState } from 'react';
import { useAtom } from 'jotai';
import { descriptionAtom, nicknameAtom } from '../contexts/NickName';
import { useQuery } from '@tanstack/react-query';
import { userInfoApi } from '../api/UserApi';

type Props = {
  onModalVisibleFunc: () => void;
};
const ProfileUpdateModal = ({ onModalVisibleFunc }: Props) => {
  const [nickname, setNicknameAtom] = useAtom(nicknameAtom);
  const [description, setDescriptionAtom] = useAtom(descriptionAtom);
  const [newNickname, setNewNickname] = useState<string>('');
  const [newDescription, setNewDescription] = useState<string>('');

  // 기존 데이터를 refetch하기 위해 useQuery 사용
  const { refetch } = useQuery({ queryKey: ['profile'], queryFn: userInfoApi });

  const onSubmitHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      // 유저 정보 업데이트 요청
      await updateUserInfo(newNickname, newDescription).then(() => {
        setNicknameAtom(newNickname); // Atom에 새로운 닉네임 저장
        setDescriptionAtom(newDescription); // Atom에 새로운 자기소개 저장
        refetch();
      });
    } catch (error) {
      console.error('프로필 업데이트 실패:', error);
    }
  };

  const onNickNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewNickname(e.target.value);
  };

  const onDescriptionHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewDescription(e.target.value);
  };

  return (
    <StyledModalUpdate isOpen={true} style={customStyles}>
      <Flex flexDirection="column">
        <Title>내 정보수정</Title>
      </Flex>
      <S.EditContainer>
        <form onSubmit={onModalVisibleFunc}>
          <label>
            <div>닉네임</div>
            <input
              value={newNickname}
              onChange={onNickNameHandler}
              placeholder="닉네임을 입력해주세요"
            />
          </label>
          <div>
            <label>
              <div>자기소개</div>
              <input
                value={newDescription}
                onChange={onDescriptionHandler}
                placeholder="자기소개를 입력해주세요"
              />
            </label>
          </div>
          <Flex>
            <BtnUpdate
              onClick={e => {
                onSubmitHandler(e);
                onModalVisibleFunc();
              }}
            >
              수정하기
            </BtnUpdate>
          </Flex>
        </form>
      </S.EditContainer>
    </StyledModalUpdate>
  );
};

export default ProfileUpdateModal;

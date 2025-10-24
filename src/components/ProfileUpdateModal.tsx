import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { useState } from 'react';

import { updateUserInfo } from '../api/MyPageApi';
import { userInfoApi } from '../api/UserApi';
import { descriptionAtom, nicknameAtom } from '../contexts/NickName';
import closebutton from '../img/closebutton.png';
import { BtnUpdate, customStyles, StyledModalUpdate, Title } from '../styles/ModalStyled';
import * as S from '../styles/MyPageStyled';
import Flex from './Flex';

type Props = {
  onModalVisibleFunc: () => void;
  nickname: string | undefined;
  introduction: string | undefined;
};
const ProfileUpdateModal = ({ onModalVisibleFunc, nickname, introduction }: Props) => {
  const [, setNicknameAtom] = useAtom(nicknameAtom);
  const [, setDescriptionAtom] = useAtom(descriptionAtom);
  const [newNickname, setNewNickname] = useState<string>(nickname || '');
  const [newDescription, setNewDescription] = useState<string>(introduction || '');
  const [errMsg, setErrMsg] = useState<string>('한글자 이상은 작성해주세요!');
  const [descriptionErrMsg, setDescriptionErrMsg] = useState<string>('한글자 이상은 작성해주세요!');

  // 기존 데이터를 refetch하기 위해 useQuery 사용
  const { refetch } = useQuery({ queryKey: ['profile'], queryFn: userInfoApi });

  const onSubmitHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (newNickname.length >= 7 || newNickname === '' || newDescription.length > 20 || newDescription === '') {
      return;
    }

    onModalVisibleFunc();

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
    if (e.target.value === '') {
      setErrMsg('한글자 이상은 작성해주세요!');
    } else if (e.target.value.length > 4) {
      setErrMsg('닉네임은 6자 이하로 작성해주세요');
    }
    setNewNickname(e.target.value);
  };

  const onDescriptionHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      setDescriptionErrMsg('한글자 이상은 작성해주세요!');
    } else if (e.target.value.length > 20) {
      setDescriptionErrMsg('자기소개는 20자 이하로 작성해주세요');
    }
    setNewDescription(e.target.value);
  };

  return (
    <StyledModalUpdate isOpen style={customStyles}>
      <S.CloseButtonWrapper>
        <img src={closebutton} onClick={onModalVisibleFunc} />
      </S.CloseButtonWrapper>
      <Flex flexDirection='column'>
        <Title>내 정보수정</Title>
      </Flex>
      <S.EditContainer>
        <form onSubmit={onModalVisibleFunc}>
          <label>
            <div>닉네임</div>
            <input placeholder='닉네임을 입력해주세요' value={newNickname} onChange={onNickNameHandler} />
            <p>{newNickname.length >= 7 && errMsg}</p>
            <p>{newNickname.length === 0 && errMsg}</p>
          </label>

          <label>
            <div>자기소개</div>
            <input placeholder='자기소개를 입력해주세요' value={newDescription} onChange={onDescriptionHandler} />
            <p>{newDescription.length >= 20 && descriptionErrMsg}</p>
            <p>{newDescription.length === 0 && descriptionErrMsg}</p>
          </label>

          <Flex>
            <BtnUpdate
              onClick={(e) => {
                onSubmitHandler(e);
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

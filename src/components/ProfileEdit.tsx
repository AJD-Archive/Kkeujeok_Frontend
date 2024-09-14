import Navbar from './Navbar';
import * as S from '../styles/MyPageStyled';
import React, { useState } from 'react';
import { updateUserInfo } from '../api/MyPageApi';
import { useNavigate } from 'react-router-dom';

const ProfileEdit = () => {
  const navigate = useNavigate();

  const [nickname, setNickName] = useState<string>('');
  const [description, setDescripton] = useState<string>('');

  const onSubmitHandler = (e: React.KeyboardEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateUserInfo(nickname, description);
    navigate('/mypage');
  };
  const onNickNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value);
  };
  const onDescriptionHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescripton(e.target.value);
  };
  return (
    <S.EditLayout>
      <Navbar />
      <S.EditContainer>
        <form onSubmit={onSubmitHandler}>
          <label>
            <div>닉네임</div>
            <input value={nickname} onChange={onNickNameHandler} />
          </label>

          <div>
            <label>
              <div>자기소개</div>
              <input value={description} onChange={onDescriptionHandler} />
            </label>
          </div>

          <button>수정</button>
        </form>
      </S.EditContainer>
    </S.EditLayout>
  );
};
export default ProfileEdit;

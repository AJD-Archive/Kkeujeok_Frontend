import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Folder from '../components/Folder';
import Flex from '../components/Flex';
import * as S from '../styles/TeamDocumentStyled';
import { useNavigate } from 'react-router-dom';
import folderimg from '../img/folderimg.png';
import { useState } from 'react';

const TeamDocument = () => {
  const [folder, setFolder] = useState('');
  const [folderArray, setFolderArray] = useState<string[]>(['프론트엔드', '백엔드', '기획']);
  const [visible, setVisible] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('1'); // 상대 경로로 이동 `1`은 추후에 서버에서 받아오는 id값으로 대체할 예정임
  };

  const onChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setFolder(e.currentTarget.value);
  };
  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFolderArray([...folderArray, folder]);
  };
  return (
    <S.MainDashBoardLayout>
      <Navbar />
      <S.MainDashBoardContainer>
        <Header
          mainTitle="팀 문서"
          subTitle="팀 대시보드의 설명이 동일하게 이 위치에도 적용됩니다"
        />
        <S.FolderEntireContainer>
          <Flex gap="4.5625rem">
            {folderArray.map((caption, id) => (
              <Folder key={id} caption={caption} />
            ))}
            {visible && (
              <S.FolderItmeContainer>
                <Flex justifyContent="center" flexDirection="column">
                  <img src={folderimg} alt="폴더 이미지" onClick={handleNavigate} />
                  <span>
                    <form onSubmit={onSubmitHandler}>
                      <input onChange={onChangeHandler} />
                    </form>
                  </span>
                </Flex>
              </S.FolderItmeContainer>
            )}
          </Flex>
        </S.FolderEntireContainer>
      </S.MainDashBoardContainer>
    </S.MainDashBoardLayout>
  );
};
export default TeamDocument;

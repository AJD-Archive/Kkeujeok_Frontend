import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Folder from '../components/Folder';
import Flex from '../components/Flex';
import * as S from '../styles/TeamDocumentStyled';

const TeamDocument = () => {
  const folderarray = ['프론트엔드', '백엔드', '기획'];
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
            {folderarray.map((caption, id) => (
              <Folder key={id} caption={caption} />
            ))}
          </Flex>
        </S.FolderEntireContainer>
      </S.MainDashBoardContainer>
    </S.MainDashBoardLayout>
  );
};
export default TeamDocument;

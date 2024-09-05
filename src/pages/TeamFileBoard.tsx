import Navbar from '../components/Navbar';
import Flex from '../components/Flex';
import Header from '../components/Header';
import File from '../components/File';
import SidebarScreen from '../components/SidebarScreen';
import * as S from '../styles/MainPageStyled';
import { FolderContainer } from '../styles/TeamDocumentStyled';
import { visibleAtom } from '../contexts/sideScreenAtom';
import { useAtom } from 'jotai';

const TeamFileBoard = () => {
  const [visibleValue, _] = useAtom(visibleAtom);

  return (
    <S.MainDashBoardLayout>
      <Navbar />
      <S.MainDashBoardContainer>
        <Header mainTitle="기획" subTitle="기획을 설명해주세요" blockProgress={50} />
        <FolderContainer>
          <Flex gap="4.5625rem">
            <File caption="기능명세서" />
            <File caption="ERD" />
            <File caption="color" />
          </Flex>
        </FolderContainer>
        {visibleValue && <SidebarScreen />}
      </S.MainDashBoardContainer>
    </S.MainDashBoardLayout>
  );
};
export default TeamFileBoard;

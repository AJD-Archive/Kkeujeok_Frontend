import { useAtom } from 'jotai';

import File from '../components/File';
import Flex from '../components/Flex';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import SidebarScreen from '../components/SidebarScreen';
import { visibleAtom } from '../contexts/sideScreenAtom';
import * as S from '../styles/MainPageStyled';
import { FolderContainer } from '../styles/TeamDocumentStyled';

const TeamFileBoard = () => {
  const [visibleValue, _] = useAtom(visibleAtom);

  return (
    <S.MainDashBoardLayout>
      <Navbar />
      <S.MainDashBoardContainer>
        <Header mainTitle='기획' subTitle='기획을 설명해주세요' />
        <FolderContainer>
          <Flex gap='4.5625rem'>
            <File caption='기능명세서' />
            <File caption='ERD' />
            <File caption='color' />
          </Flex>
        </FolderContainer>
        {visibleValue && <SidebarScreen />}
      </S.MainDashBoardContainer>
    </S.MainDashBoardLayout>
  );
};
export default TeamFileBoard;

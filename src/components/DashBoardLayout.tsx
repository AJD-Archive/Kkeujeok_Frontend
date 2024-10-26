import { Helmet } from 'react-helmet-async';
import Navbar from './Navbar';
import Header from './Header';
import * as S from '../styles/MainPageStyled';
import { DeleteButton } from '@blocknote/react';
import { DragDropContext } from 'react-beautiful-dnd';

interface DashBoardLayoutProps {
  children: React.ReactNode; // children의 타입을 명시합니다.
}
const DashBoardLayout = ({ children }: DashBoardLayoutProps) => {
  return (
    <>
      <S.MainDashBoardLayout>
        <Navbar />
        <S.MainDashBoardContainer>{children}</S.MainDashBoardContainer>
      </S.MainDashBoardLayout>
    </>
  );
};
export default DashBoardLayout;

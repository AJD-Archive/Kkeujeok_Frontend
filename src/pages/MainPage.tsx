import Navbar from '../components/Navbar';
import theme from '../styles/Theme/Theme';
import main from '../img/main.png';
import main2 from '../img/main2.png';
import main3 from '../img/main3.png';
import Header from '../components/Header';
import * as S from '../styles/MainPageStyled';
import NotStartedDashboard from '../components/NotStartedDashboard';
import InProgressDashboard from '../components/InProgressDashboard';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useState } from 'react';
import { handleAutoScroll } from '../utils/handleAutoScroll';

export type TItemStatus = 'todo' | 'doing' | 'done';

const MainPage = () => {
  return (
    <S.MainDashBoardLayout>
      <Navbar />
      <S.MainDashBoardContainer>
        <Header mainTitle="개인 대시보드" subTitle="개인 대시보드 설명하는 자리입니다" />
        <DragDropContext onDragEnd={onDragEnd} onDragUpdate={handleAutoScroll}>
          <S.CardContainer>
            {Object.values(columns).map(column => {
              const { id, component: DashboardComponent, ...props } = column;
              return <DashboardComponent key={id} id={id} {...props} />;
            })}
          </S.CardContainer>
        </DragDropContext>
      </S.MainDashBoardContainer>
    </S.MainDashBoardLayout>
  );
};
export default MainPage;

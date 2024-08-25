import Navbar from '../components/Navbar';
import theme from '../styles/Theme/Theme';
import deleteicon from '../img/delete2.png';
import main from '../img/main.png';
import main2 from '../img/main2.png';
import main3 from '../img/main3.png';
import Header from '../components/Header';
import * as S from '../styles/MainPageStyled';
import NotStartedDashboard from '../components/NotStartedDashboard';
import InProgressDashboard from '../components/InProgressDashboard';
import CompletedDashboard from '../components/CompletedDashboard';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useState } from 'react';
import { handleAutoScroll } from '../utils/handleAutoScroll';

export type TItemStatus = 'todo' | 'doing' | 'done';

const MainPage = () => {
  const initialColumns = {
    todo: {
      id: 'todo',
      list: ['item 1', 'item 2', 'item 3', 'item4', 'item5', 'item6', 'item7', 'item8', 'item9'],
      component: NotStartedDashboard,
      backGroundColor: '#E8FBFF',
      highlightColor: theme.color.main3,
      progress: '시작 전',
      imgSrc: main3,
    },
    doing: {
      id: 'doing',
      list: [],
      component: InProgressDashboard,
      backGroundColor: '#EDF3FF',
      highlightColor: theme.color.main,
      progress: '진행 중',
      imgSrc: main,
    },
    done: {
      id: 'done',
      list: [],
      component: CompletedDashboard,
      backGroundColor: '#F7F1FF',
      highlightColor: theme.color.main2,
      progress: '완료',
      imgSrc: main2,
    },
  };

  const [columns, setColumns] = useState(initialColumns);

  const onDragEnd = ({ source, destination }: DropResult) => {
    //droppable 하지 않곳에 block을 내려놨을시에 중단하고 return;
    if (!destination) return;

    const sourceKey = source.droppableId as TItemStatus;
    const destinationKey = destination.droppableId as TItemStatus;

    if (sourceKey === destinationKey) {
      const newList = Array.from(columns[sourceKey].list);
      const [movedItem] = newList.splice(source.index, 1);
      newList.splice(destination.index, 0, movedItem);

      setColumns({
        ...columns,
        [sourceKey]: {
          ...columns[sourceKey],
          list: newList,
        },
      });
    } else {
      const sourceList = Array.from(columns[sourceKey].list);
      const destinationList = Array.from(columns[destinationKey].list);
      const [movedItem] = sourceList.splice(source.index, 1);
      destinationList.splice(destination.index, 0, movedItem);

      setColumns({
        ...columns,
        [sourceKey]: {
          ...columns[sourceKey],
          list: sourceList,
        },
        [destinationKey]: {
          ...columns[destinationKey],
          list: destinationList,
        },
      });
    }
  };

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
        <S.DeleteIcon>
          <img src={deleteicon} alt="휴지통아이콘" />
        </S.DeleteIcon>
      </S.MainDashBoardContainer>
    </S.MainDashBoardLayout>
  );
};

export default MainPage;

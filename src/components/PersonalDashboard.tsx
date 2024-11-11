import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getPersonalBlock, getPersonalDashboard } from '../api/BoardApi';
import {
  deleteBlock,
  getDeleteBlock,
  updateOrderBlock,
  updatePersonalBlock,
} from '../api/PersonalBlockApi';
import DashBoardLayout from './DashBoardLayout';
import Header from './Header';
import { Outlet, useLocation } from 'react-router-dom';
import NotStartedDashboard from './NotStartedDashboard';
import InProgressDashboard from './InProgressDashboard';
import CompletedDashboard from './CompletedDashboard';
import { useState } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import * as S from '../styles/MainPageStyled';
import DeleteButton from './DeleteButton';
import { TItems, TItemStatus } from '../utils/columnsConfig';
import useItems from '../hooks/useItems';
import { BlockListResDto } from '../types/PersonalBlock';
import { useSSE } from '../hooks/useSSE';

type PageState = {
  todo: number; // 할 일 페이지 번호
  doing: number; // 진행 중인 일 페이지 번호
  completed: number; // 완료된 일 페이지 번호
};

const PersonalDashBoard = () => {
  const location = useLocation();
  const dashboardId = location.pathname.split('/')[2];
  // const [page, setPage] = useState<number>(0);
  const [todoPage, setTodoPage] = useState<number>(0);
  const [doingPage, setDoingPage] = useState<number>(0);
  const [page, setPage] = useState<PageState>({
    todo: 0,
    doing: 0,
    completed: 0,
  });
  const {
    items,
    setItems,
    fetchNextNotStarted,
    hasMoreNotStarted,
    fetchNextInProgress,
    hasMoreInProgress,
    fetchNextCompleted,
    hasMoreCompleted,
    blockTotal,
    setBlockTotal,
  } = useItems(dashboardId, page, location.pathname);

  const { data: PersonalDashboardInfo } = useQuery({
    queryKey: ['PersonalDashboardInfo', dashboardId],
    queryFn: () => getPersonalDashboard(dashboardId),
  });

  // * 세로 무한 스크롤 감지 이벤트
  const handleLoadMore = async (status: 'todo' | 'doing' | 'completed') => {
    // 다음 페이지 요청
    if (status === 'todo') {
      await fetchNextNotStarted(); // todo 상태에 대한 다음 페이지 요청
    } else if (status === 'doing') {
      // 비슷한 방식으로 진행 중인 상태에 대한 요청 추가
      await fetchNextInProgress(); // fetchNextDoing는 해당 상태에 맞는 함수를 정의해야 합니다.
    } else if (status === 'completed') {
      // 완료된 상태에 대한 요청 추가
      await fetchNextCompleted(); // fetchNextCompleted는 해당 상태에 맞는 함수를 정의해야 합니다.
    }

    // 페이지 상태 업데이트
    if (status === 'todo' && hasMoreNotStarted) {
      setPage(prevPage => ({
        ...prevPage,
        todo: prevPage.todo + 1,
      }));
    } else if (status === 'doing' && hasMoreInProgress) {
      // hasMoreDoing은 해당 상태에 대한 변수입니다.
      setPage(prevPage => ({
        ...prevPage,
        doing: prevPage.doing + 1,
      }));
    } else if (status === 'completed' && hasMoreCompleted) {
      // hasMoreCompleted은 해당 상태에 대한 변수입니다.
      setPage(prevPage => ({
        ...prevPage,
        completed: prevPage.completed + 1,
      }));
    }
  };

  // * 상태 변경 함수
  const updateState = (destinationKey: string, targetItem: BlockListResDto) => {
    const blockId = targetItem.blockId;

    if (blockId) {
      if (destinationKey !== 'delete') {
        updatePersonalBlock(blockId, status(destinationKey)); // 블록 상태 업데이트
      } else {
        console.log('블록 삭제할게요');
        deleteBlock(blockId); // 블록 삭제
      }
    }
  };

  // * 순서 변경 함수
  const updateOrder = (_items: TItems) => {
    const orderArray = {
      dashboardId: dashboardId,
      notStartedList: _items.todo.map(item => item.blockId),
      inProgressList: _items.doing.map(item => item.blockId),
      completedList: _items.completed.map(item => item.blockId),
    };
    updateOrderBlock(orderArray);
  };

  // * 드래그앤드롭 함수
  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) return;

    const sourceKey = source.droppableId as TItemStatus;
    const destinationKey = destination.droppableId as TItemStatus;

    const _items = JSON.parse(JSON.stringify(items)) as typeof items;

    if (!_items[sourceKey] || !_items[destinationKey]) {
      console.error('Invalid droppableId:', sourceKey, destinationKey);
      return;
    }
    const [targetItem] = _items[sourceKey].splice(source.index, 1);
    _items[destinationKey].splice(destination.index, 0, targetItem);
    setItems(_items);

    if (sourceKey !== destinationKey) {
      updateState(destinationKey, targetItem);
    }

    //시작점 상태에서 종착지가 시작점 상태와는 다른 상태일때 그 아이템 개수 -1
    if (source.droppableId === 'todo' && destination.droppableId !== 'todo')
      setBlockTotal(prev => ({
        ...prev,
        todo: blockTotal.todo - 1,
        [destination.droppableId]:
          blockTotal[destination.droppableId as keyof typeof blockTotal] + 1,
      }));
    else if (source.droppableId === 'doing' && destination.droppableId !== 'doing')
      setBlockTotal(prev => ({
        ...prev,
        doing: blockTotal.doing - 1,
        [destination.droppableId]:
          blockTotal[destination.droppableId as keyof typeof blockTotal] + 1,
      }));
    else if (source.droppableId === 'completed' && destination.droppableId !== 'completed')
      setBlockTotal(prev => ({
        ...prev,
        completed: blockTotal.completed - 1,
        [destination.droppableId]:
          blockTotal[destination.droppableId as keyof typeof blockTotal] + 1,
      }));
    else if (source.droppableId === 'delete' && destination.droppableId !== 'delete')
      setBlockTotal(prev => ({
        ...prev,
        delete: blockTotal.completed - 1,
        [destination.droppableId]:
          blockTotal[destination.droppableId as keyof typeof blockTotal] + 1,
      }));
    updateOrder(_items);
  };

  return (
    <>
      <DashBoardLayout>
        <Header
          mainTitle={PersonalDashboardInfo?.title || ''}
          subTitle={PersonalDashboardInfo?.description || ''}
          dashboardType={true}
          blockTotal={blockTotal}
        />
        <DragDropContext onDragEnd={onDragEnd}>
          <S.CardContainer>
            <NotStartedDashboard
              list={items.todo || []}
              id="todo"
              dashboardId={dashboardId}
              onLoadMore={() => handleLoadMore('todo')}
            ></NotStartedDashboard>
            <InProgressDashboard
              list={items.doing || []}
              id="doing"
              dashboardId={dashboardId}
              onLoadMore={() => handleLoadMore('doing')}
            ></InProgressDashboard>
            <CompletedDashboard
              list={items.completed || []}
              id="completed"
              dashboardId={dashboardId}
              onLoadMore={() => handleLoadMore('completed')}
            ></CompletedDashboard>
          </S.CardContainer>
          <DeleteButton key="delete" id="delete" removeValue={true} list={items.delete || []} />
        </DragDropContext>
        <Outlet />
      </DashBoardLayout>
    </>
  );
};
export default PersonalDashBoard;

const status = (status: string) => {
  switch (status) {
    case 'todo':
      return 'NOT_STARTED';
    case 'doing':
      return 'IN_PROGRESS';
    case 'completed':
      return 'COMPLETED';
    case 'delete':
      return 'DELETED';
    default:
      return 'UNKNOWN';
  }
};

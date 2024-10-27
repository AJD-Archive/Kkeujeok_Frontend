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
import { useLocation } from 'react-router-dom';
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
import { useDebounce } from '../hooks/useDebounce';

const PersonalDashBoard = () => {
  const location = useLocation();
  const dashboardId = location.pathname.split('/')[2];
  const { items, setItems } = useItems(dashboardId);

  const [page, setPage] = useState<number>(0);

  const { data: PersonalDashboardInfo } = useQuery({
    queryKey: ['PersonalDashboardInfo', dashboardId],
    queryFn: () => getPersonalDashboard(dashboardId),
  });

  // 세로 무한 스크롤 감지 이벤트
  const handleLoadMore = async () => {
    setPage(prevPage => prevPage + 1);
  };

  // * 상태 변경 함수
  const updateState = (destinationKey: string, targetItem: BlockListResDto) => {
    const blockId = targetItem.blockId;

    if (blockId) {
      if (destinationKey !== 'delete') {
        updatePersonalBlock(blockId, status(destinationKey)); // 블록 상태 업데이트
      } else {
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

    updateOrder(_items);
  };

  return (
    <>
      <DashBoardLayout>
        <Header
          mainTitle={PersonalDashboardInfo?.title || ''}
          subTitle={PersonalDashboardInfo?.description || ''}
          blockProgress={(Math.floor(PersonalDashboardInfo?.blockProgress ?? 0) * 10) / 10}
          dashboardType={true}
        />
        <DragDropContext onDragEnd={onDragEnd}>
          <S.CardContainer>
            <NotStartedDashboard
              list={items.todo || []}
              id="todo"
              dashboardId={dashboardId}
              onLoadMore={handleLoadMore}
            ></NotStartedDashboard>
            <InProgressDashboard
              list={items.doing || []}
              id="doing"
              dashboardId={dashboardId}
              onLoadMore={handleLoadMore}
            ></InProgressDashboard>
            <CompletedDashboard
              list={items.completed || []}
              id="completed"
              dashboardId={dashboardId}
              onLoadMore={handleLoadMore}
            ></CompletedDashboard>
          </S.CardContainer>
          <DeleteButton key="delete" id="delete" removeValue={true} list={items.delete || []} />
        </DragDropContext>
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
    case 'done':
      return 'COMPLETED';
    case 'delete':
      return 'DELETED';
    default:
      return 'UNKNOWN';
  }
};

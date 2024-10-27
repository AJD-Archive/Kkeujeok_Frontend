import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getPersonalBlock, getPersonalDashboard } from '../api/BoardApi';
import { getDeleteBlock } from '../api/PersonalBlockApi';
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
import { TItemStatus } from '../utils/columnsConfig';
import useItems from '../hooks/useItems';

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

  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) return;

    const scourceKey = source.droppableId as TItemStatus;
    const destinationKey = destination.droppableId as TItemStatus;

    const _items = JSON.parse(JSON.stringify(items)) as typeof items;

    if (!_items[scourceKey] || !_items[destinationKey]) {
      console.error('Invalid droppableId:', scourceKey, destinationKey);
      return;
    }
    const [targetItem] = _items[scourceKey].splice(source.index, 1);
    _items[destinationKey].splice(destination.index, 0, targetItem);
    setItems(_items);
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

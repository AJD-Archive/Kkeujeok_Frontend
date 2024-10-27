import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getPersonalBlock } from '../api/BoardApi';
import { getDeleteBlock } from '../api/PersonalBlockApi';
import { getTeamDashboard } from '../api/TeamDashBoardApi';
import DashBoardLayout from './DashBoardLayout';
import Header from './Header';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import NotStartedDashboard from './NotStartedDashboard';
import InProgressDashboard from './InProgressDashboard';
import CompletedDashboard from './CompletedDashboard';
import DeleteButton from './DeleteButton';
import * as S from '../styles/MainPageStyled';
import useItems from '../hooks/useItems';
import { TItemStatus } from '../utils/columnsConfig';

const TeamDashBoard = () => {
  const dashboardId = location.pathname.split('/')[2];
  const { items, setItems } = useItems(dashboardId);
  const [page, setPage] = useState<number>(0);

  const { data: TeamDashboardInfo } = useQuery({
    queryKey: ['TeamDashboardInfo', dashboardId],
    queryFn: () => getTeamDashboard(dashboardId),
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
          mainTitle={TeamDashboardInfo?.title || ''}
          subTitle={TeamDashboardInfo?.description || ''}
          blockProgress={(Math.floor(TeamDashboardInfo?.blockProgress ?? 0) * 10) / 10}
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
              list={items.delete || []}
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
export default TeamDashBoard;

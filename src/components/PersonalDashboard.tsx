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
import { DragDropContext } from 'react-beautiful-dnd';
import * as S from '../styles/MainPageStyled';
import DeleteButton from './DeleteButton';

const PersonalDashBoard = () => {
  const location = useLocation();

  const dashboardId = location.pathname.split('/')[2];

  const [page, setPage] = useState<number>(0);

  const { data: NotStarted } = useQuery({
    queryKey: ['NOT_STARTED', dashboardId],
    queryFn: () => getPersonalBlock(dashboardId, 0, 10, 'NOT_STARTED'),
  });
  const { data: InProgress } = useQuery({
    queryKey: ['IN_PROGRESS', dashboardId],
    queryFn: () => getPersonalBlock(dashboardId, 0, 10, 'IN_PROGRESS'),
  });
  const { data: COMPLETED } = useQuery({
    queryKey: ['COMPLETED', dashboardId],
    queryFn: () => getPersonalBlock(dashboardId, 0, 10, 'COMPLETED'),
  });
  const { data: DeletedBlock } = useQuery({
    queryKey: ['DeletedBlock', dashboardId],
    queryFn: () => getDeleteBlock(dashboardId),
  });
  console.log('지운거 조회 :', DeletedBlock);
  const { data: PersonalDashboardInfo } = useQuery({
    queryKey: ['PersonalDashboardInfo', dashboardId],
    queryFn: () => getPersonalDashboard(dashboardId),
  });

  // 세로 무한 스크롤 감지 이벤트
  const handleLoadMore = async () => {
    setPage(prevPage => prevPage + 1);
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
        <DragDropContext onDragEnd={() => {}}>
          <S.CardContainer>
            <NotStartedDashboard
              list={NotStarted?.blockListResDto || []}
              id="NOT_STARTED"
              dashboardId={dashboardId}
              onLoadMore={handleLoadMore}
            ></NotStartedDashboard>
            <InProgressDashboard
              list={InProgress?.blockListResDto || []}
              id="IN_PROGRESS"
              dashboardId={dashboardId}
              onLoadMore={handleLoadMore}
            ></InProgressDashboard>
            <CompletedDashboard
              list={COMPLETED?.blockListResDto || []}
              id="COMPLETED"
              dashboardId={dashboardId}
              onLoadMore={handleLoadMore}
            ></CompletedDashboard>
          </S.CardContainer>
          <DeleteButton key="delete" id="delete" removeValue={true} list={DeletedBlock || []} />
        </DragDropContext>
      </DashBoardLayout>
    </>
  );
};
export default PersonalDashBoard;

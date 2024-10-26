import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getPersonalBlock } from '../api/BoardApi';
import { getDeleteBlock } from '../api/PersonalBlockApi';
import { getTeamDashboard } from '../api/TeamDashBoardApi';
import DashBoardLayout from './DashBoardLayout';
import Header from './Header';
import { DragDropContext } from 'react-beautiful-dnd';
import NotStartedDashboard from './NotStartedDashboard';
import InProgressDashboard from './InProgressDashboard';
import CompletedDashboard from './CompletedDashboard';
import DeleteButton from './DeleteButton';
import * as S from '../styles/MainPageStyled';

const TeamDashBoard = () => {
  const dashboardId = location.pathname.split('/')[2];

  const [page, setPage] = useState<number>(0);

  const { data: NotStarted } = useQuery({
    queryKey: ['NOT_STARTED'],
    queryFn: () => getPersonalBlock(dashboardId, 0, 10, 'NOT_STARTED'),
  });

  const { data: InProgress } = useQuery({
    queryKey: ['IN_PROGRESS'],
    queryFn: () => getPersonalBlock(dashboardId, 0, 10, 'IN_PROGRESS'),
  });

  const { data: COMPLETED } = useQuery({
    queryKey: ['COMPLETED'],
    queryFn: () => getPersonalBlock(dashboardId, 0, 10, 'COMPLETED'),
  });

  const { data: DeletedBlock } = useQuery({
    queryKey: ['DeletedBlock'],
    queryFn: () => getDeleteBlock(dashboardId),
  });
  const { data: TeamDashboardInfo } = useQuery({
    queryKey: ['TeamDashboardInfo'],
    queryFn: () => getTeamDashboard(dashboardId),
  });
  // 세로 무한 스크롤 감지 이벤트
  const handleLoadMore = async () => {
    setPage(prevPage => prevPage + 1);
  };
  return (
    <>
      <DashBoardLayout>
        <Header
          mainTitle={TeamDashboardInfo?.title || ''}
          subTitle={TeamDashboardInfo?.description || ''}
          blockProgress={(Math.floor(TeamDashboardInfo?.blockProgress ?? 0) * 10) / 10}
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
export default TeamDashBoard;

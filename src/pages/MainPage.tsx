import { useEffect, useState, useCallback } from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import * as S from '../styles/MainPageStyled';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { handleAutoScroll } from '../utils/handleAutoScroll';
import { useLocation } from 'react-router-dom';
import { StatusPersonalBlock } from '../types/PersonalBlock';
import { updateOrderBlock, updatePersonalBlock } from '../api/PersonalBlockApi';
import { useDebounce } from '../hooks/useDebounce';
import { initialColumns } from '../utils/columnsConfig';
import { DashboardItem } from '../types/PersonalDashBoard';
import { getPersonalBlock, getPersonalDashboard } from '../api/BoardApi';
import { getTeamDashboard } from '../api/TeamDashBoardApi';
import { TeamDashboardInfoResDto } from '../types/TeamDashBoard';

export type TItemStatus = 'todo' | 'doing' | 'done';

const MainPage = () => {
  const location = useLocation();
  const dashboardId = location.pathname.split('/')[1];

  const [page, setPage] = useState<number>(0);
  const [dashboardDetail, setDashboardDetail] = useState<DashboardItem | null>(null);
  const [teamDashboardDetail, setTeamDashboardDetail] = useState<TeamDashboardInfoResDto | null>(
    null
  );
  const [columns, setColumns] = useState<{
    [key in TItemStatus]: {
      id: string;
      list: StatusPersonalBlock['blockListResDto'];
      pageInfo: StatusPersonalBlock['pageInfoResDto'];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      component: React.ComponentType<any>;
      backGroundColor?: string;
      highlightColor?: string;
      progress?: string;
      imgSrc?: string;
    };
  }>(initialColumns);

  // 개인 및 팀 대시보드 데이터를 가져오는 useCallback 함수
  const fetchData = useCallback(
    async (page: number = 0) => {
      try {
        // 개인 및 팀 데이터를 병렬로 가져옴
        const [todo, doing, done, personalDashboardData, teamDashboardData] = await Promise.all([
          getPersonalBlock(dashboardId, page, 10, 'NOT_STARTED'),
          getPersonalBlock(dashboardId, page, 10, 'IN_PROGRESS'),
          getPersonalBlock(dashboardId, page, 10, 'COMPLETED'),
          getPersonalDashboard(dashboardId),
          getTeamDashboard(dashboardId),
        ]);

        // 개인 블록 데이터를 업데이트
        if (todo && doing && done) {
          setColumns(prevColumns => ({
            ...prevColumns,
            todo: {
              ...prevColumns.todo,
              list:
                page === 0
                  ? todo.blockListResDto
                  : [...prevColumns.todo.list, ...todo.blockListResDto],
              pageInfo: todo.pageInfoResDto,
            },
            doing: {
              ...prevColumns.doing,
              list:
                page === 0
                  ? doing.blockListResDto
                  : [...prevColumns.doing.list, ...doing.blockListResDto],
              pageInfo: doing.pageInfoResDto,
            },
            done: {
              ...prevColumns.done,
              list:
                page === 0
                  ? done.blockListResDto
                  : [...prevColumns.done.list, ...done.blockListResDto],
              pageInfo: done.pageInfoResDto,
            },
          }));
        }

        // 개인 대시보드 데이터 업데이트
        setDashboardDetail(personalDashboardData);

        // 팀 대시보드 데이터 업데이트
        setTeamDashboardDetail(teamDashboardData);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    },
    [dashboardId]
  );

  // 데이터 fetch 후 팀 또는 개인 대시보드 데이터를 설정
  useEffect(() => {
    setPage(0);
    setColumns(prevColumns => ({
      ...prevColumns,
      todo: {
        ...prevColumns.todo,
        list: [],
        pageInfo: { currentPage: 0, totalPages: 1, totalItems: 1 },
      },
    }));

    fetchData(0);
  }, [location.pathname, fetchData]);

  // 페이지 변경 시 fetchData 호출
  useEffect(() => {
    if (page > 0) {
      fetchData(page);
    }
  }, [page, fetchData]);

  // Debounce 처리된 데이터를 이용하여 updateOrderBlock 호출
  const debouncedData = useDebounce(columns, 100);
  useEffect(() => {
    const orderArray = {
      notStartedList: columns.todo.list.map(item => item.blockId),
      inProgressList: columns.doing.list.map(item => item.blockId),
      completedList: columns.done.list.map(item => item.blockId),
    };
    updateOrderBlock(orderArray);
  }, [debouncedData]);

  // 페이지를 증가시켜 더 많은 데이터를 불러오는 함수
  const handleLoadMore = useCallback(() => {
    setPage(prevPage => prevPage + 1);
  }, []);

  // Drag and Drop 이벤트 처리 함수
  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) return;

    const sourceKey = source.droppableId as TItemStatus;
    const destinationKey = destination.droppableId as TItemStatus;

    if (!columns[sourceKey] || !columns[destinationKey]) {
      console.error('Invalid source or destination key');
      return;
    }

    const sourceList = columns[sourceKey].list;
    const destinationList = columns[destinationKey].list;

    const blockId = sourceList[source.index]?.blockId;
    if (!blockId) return;

    if (sourceKey === destinationKey) {
      const newList = Array.from(sourceList);
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
      const [movedItem] = sourceList.splice(source.index, 1);
      destinationList.splice(destination.index, 0, movedItem);
      updatePersonalBlock(blockId, status(destinationKey));

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

  // 유효한 데이터에 따라 mainTitle과 subTitle을 설정
  const mainTitle = teamDashboardDetail?.title || dashboardDetail?.title || '대시보드 제목';
  const subTitle =
    teamDashboardDetail?.description || dashboardDetail?.description || '대시보드 설명';
  const blockProgress = teamDashboardDetail?.blockProgress || dashboardDetail?.blockProgress || 0;

  return (
    <S.MainDashBoardLayout>
      <Navbar />
      <S.MainDashBoardContainer>
        <Header
          mainTitle={mainTitle}
          subTitle={subTitle}
          blockProgress={blockProgress}
          dashboardType={dashboardDetail ? true : false}
        />
        <DragDropContext onDragEnd={onDragEnd} onDragUpdate={handleAutoScroll}>
          <S.CardContainer>
            {Object.values(columns).map(column => {
              const { id, component: DashboardComponent, ...props } = column;
              return (
                <DashboardComponent
                  key={id}
                  id={id}
                  dashboardId={dashboardId}
                  onLoadMore={handleLoadMore}
                  {...props}
                />
              );
            })}
          </S.CardContainer>
        </DragDropContext>
      </S.MainDashBoardContainer>
    </S.MainDashBoardLayout>
  );
};

export default MainPage;

// Helper 함수: status 변환을 위한 함수
const status = (status: string) => {
  switch (status) {
    case 'todo':
      return 'NOT_STARTED';
    case 'doing':
      return 'IN_PROGRESS';
    case 'done':
      return 'COMPLETED';
  }
};

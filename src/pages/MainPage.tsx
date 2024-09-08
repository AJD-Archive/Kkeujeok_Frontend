import Navbar from '../components/Navbar';
import Header from '../components/Header';
import * as S from '../styles/MainPageStyled';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useEffect, useState } from 'react';
import { handleAutoScroll } from '../utils/handleAutoScroll';
import { useLocation } from 'react-router-dom';
import { StatusPersonalBlock } from '../types/PersonalBlock';
import {
  deleteBlock,
  getDeleteBlock,
  updateOrderBlock,
  updatePersonalBlock,
} from '../api/PersonalBlockApi';
import { useDebounce } from '../hooks/useDebounce';
import { initialColumns } from '../utils/columnsConfig';
import { DashboardItem } from '../types/PersonalDashBoard';
import { getPersonalBlock, getPersonalDashboard } from '../api/BoardApi';
import DeleteButton from '../components/DeleteButton';
import { useAtom } from 'jotai';
import { fetchTriggerAtom } from '../contexts/atoms';

export type TItemStatus = 'todo' | 'doing' | 'done' | 'delete';

const MainPage = () => {
  const location = useLocation();
  const dashboardId = location.pathname.split('/')[1];

  const [page, setPage] = useState<number>(0);
  const [fetchTrigger] = useAtom(fetchTriggerAtom); // 상태 트리거 가져오기
  const [dashboardDetail, setDashboardDetail] = useState<DashboardItem>();
  const [columns, setColumns] = useState<{
    [key in TItemStatus]: {
      id: string;
      list: StatusPersonalBlock['blockListResDto'];
      pageInfo?: StatusPersonalBlock['pageInfoResDto'];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      component?: React.ComponentType<any>;
      backGroundColor?: string;
      highlightColor?: string;
      progress?: string;
      imgSrc?: string;
    };
  }>(initialColumns);

  // 라우터가 변경되면 기존 리스트를 초기화하고 다시 불러옴
  useEffect(() => {
    setPage(0);
    setColumns(prevColumns => ({
      ...prevColumns,
      todo: {
        ...prevColumns.todo,
        list: [],
        pageInfo: { currentPage: 0, totalPages: 1, totalItems: 1 },
      },
      doing: {
        ...prevColumns.doing,
        list: [],
        pageInfo: { currentPage: 0, totalPages: 1, totalItems: 1 },
      },
      done: {
        ...prevColumns.done,
        list: [],
        pageInfo: { currentPage: 0, totalPages: 1, totalItems: 1 },
      },
      delete: {
        ...prevColumns.delete,
        list: [],
        pageInfo: { currentPage: 0, totalPages: 1, totalItems: 1 },
      },
    }));

    fetchBlockData(0);
    fetchDashboardData();
  }, [location.pathname]);

  // 페이지가 변경될 때 데이터를 다시 가져옴
  useEffect(() => {
    fetchBlockData(page);
  }, [page]);

  useEffect(() => {
    fetchBlockData(0); // 페이지가 로드될 때 처음으로 데이터를 불러옵니다.
  }, [dashboardId]);

  // fetchTrigger 상태가 변경되면 데이터를 다시 불러옴
  useEffect(() => {
    fetchBlockData(0); // 트리거가 변경되면 다시 데이터 호출
  }, [fetchTrigger]);
  // 블록 순서 변경 디바운스 처리
  const debouncedData = useDebounce(columns, 100);

  useEffect(() => {
    const orderArray = {
      notStartedList: columns.todo.list.map(item => item.blockId),
      inProgressList: columns.doing.list.map(item => item.blockId),
      completedList: columns.done.list.map(item => item.blockId),
    };
    updateOrderBlock(orderArray);
  }, [debouncedData]);

  // * get 대시보드 블록
  const fetchBlockData = async (page: number = 0) => {
    try {
      const [todo, doing, done, remove] = await Promise.all([
        getPersonalBlock(dashboardId, page, 10, 'NOT_STARTED'),
        getPersonalBlock(dashboardId, page, 10, 'IN_PROGRESS'),
        getPersonalBlock(dashboardId, page, 10, 'COMPLETED'),
        getDeleteBlock(dashboardId),
      ]);

      const removeBlockList = Array.isArray(remove?.blockListResDto) ? remove.blockListResDto : [];

      // 데이터가 존재하는지 확인
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
          delete: {
            ...prevColumns.delete,
            list: page === 0 ? remove.blockListResDto : [...remove.blockListResDto],
            pageInfo: remove.pageInfoResDto,
          },
        }));
      }
    } catch (error) {
      console.error('Failed to fetch block data:', error);
    }
  };

  // 세로 무한 스크롤 감지 이벤트
  const handleLoadMore = async () => {
    setPage(prevPage => prevPage + 1);
  };

  // 드래그 앤 드롭 핸들러
  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) return;

    const sourceKey = source.droppableId as TItemStatus;
    const destinationKey = destination.droppableId as TItemStatus;

    const sourceList = columns[sourceKey]?.list || [];
    const destinationList = columns[destinationKey]?.list || [];

    if (source.index < 0 || source.index >= sourceList.length) {
      return;
    }

    const blockId = sourceList[source.index]?.blockId;
    if (!blockId) {
      return;
    }

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
      if (destinationKey !== 'delete') updatePersonalBlock(blockId, status(destinationKey));
      else deleteBlock(blockId);
      if (sourceKey === 'delete') {
        deleteBlock(blockId);
      }
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

  // 대시보드 상세 정보 가져오기
  const fetchDashboardData = async () => {
    const data = await getPersonalDashboard(dashboardId);
    setDashboardDetail(data ?? undefined);
  };

  return (
    <S.MainDashBoardLayout>
      <Navbar />
      <S.MainDashBoardContainer>
        <Header
          mainTitle={dashboardDetail?.title || '개인 대시보드'}
          subTitle={dashboardDetail?.description || '개인 대시보드 설명'}
          blockProgress={dashboardDetail?.blockProgress || 0}
        />
        <DragDropContext onDragEnd={onDragEnd} onDragUpdate={handleAutoScroll}>
          <S.CardContainer>
            {Object.values(columns).map(column => {
              const { id, component: DashboardComponent, ...props } = column;
              if (!DashboardComponent) {
                return null;
              }
              return (
                <DashboardComponent
                  key={id}
                  id={id}
                  dashboardId={dashboardId}
                  onLoadMore={handleLoadMore} // 이 부분을 전달
                  {...props}
                />
              );
            })}
          </S.CardContainer>
          <DeleteButton key="delete" id="delete" list={columns.delete.list} />
        </DragDropContext>
      </S.MainDashBoardContainer>
    </S.MainDashBoardLayout>
  );
};

export default MainPage;

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

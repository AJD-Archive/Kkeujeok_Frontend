import Navbar from '../components/Navbar';
import theme from '../styles/Theme/Theme';
import main from '../img/main.png';
import main2 from '../img/main2.png';
import main3 from '../img/main3.png';
import Header from '../components/Header';
import * as S from '../styles/MainPageStyled';
import NotStartedDashboard from '../components/NotStartedDashboard';
import InProgressDashboard from '../components/InProgressDashboard';
import CompletedDashboard from '../components/CompletedDashboard';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useEffect, useState } from 'react';
import { handleAutoScroll } from '../utils/handleAutoScroll';
import { useBlocker, useLocation } from 'react-router-dom';
import { StatusPersonalBlock } from '../types/PersonalBlock';
import { getDashBoard } from '../api/BoardApi';
import ComponentStyle from 'styled-components/dist/models/ComponentStyle';
import { updateOrderBlock, updatePersonalBlock } from '../api/PersonalBlockApi';
import { useDebounce } from '../hooks/useDebounce';
import { initialColumns } from '../utils/columnsConfig';
export type TItemStatus = 'todo' | 'doing' | 'done';

const MainPage = () => {
  const location = useLocation();
  const dashboardId = location.pathname.split('/')[1];

  const [page, setPage] = useState<number>(0);

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

  // 라우터가 변경되면 기존 list를 한번 초기화 하고 다시 불러옴
  useEffect(() => {
    // 사이드 페이지를 닫고 대시보드로 돌아왔을 때 todo 컬럼을 초기화
    setPage(0);
    setColumns(prevColumns => ({
      ...prevColumns,
      todo: {
        ...prevColumns.todo,
        list: [], // 초기화 시 기존 리스트를 비웁니다.
        pageInfo: { currentPage: 0, totalPages: 1, totalItems: 1 },
      },
    }));

    fetchData(0);
  }, [location.pathname]); // 라우터 변경 감지

  // useEffect로 페이지가 변경될 때 데이터를 다시 가져오도록 설정
  useEffect(() => {
    fetchData(page);
  }, [page]); // page가 변경될 때마다 fetchData 실행

  //블록 순서 변경 디바운스 api
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
  const fetchData = async (page: number = 0) => {
    const todo = await getDashBoard(dashboardId, page, 10, 'NOT_STARTED');
    const doing = await getDashBoard(dashboardId, page, 10, 'IN_PROGRESS');
    const done = await getDashBoard(dashboardId, page, 10, 'COMPLETED');

    if (todo && doing && done) {
      setColumns(prevColumns => ({
        ...prevColumns,
        todo: {
          ...prevColumns.todo,
          list:
            page === 0 ? todo.blockListResDto : [...prevColumns.todo.list, ...todo.blockListResDto],
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
            page === 0 ? done.blockListResDto : [...prevColumns.done.list, ...done.blockListResDto],
          pageInfo: done.pageInfoResDto,
        },
      }));
    }
  };

  // * 세로 무한 스크롤 감지 이벤트 : 자식 컴포넌트에서 추가 데이터 요청을 감지 (props로 전달)
  const handleLoadMore = async () => {
    setPage(prevPage => prevPage + 1); // 페이지 번호를 증가시켜 다음 페이지 데이터 로드
  };

  // * 드래그 앤 드롭
  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) return;

    const sourceKey = source.droppableId as TItemStatus;
    const destinationKey = destination.droppableId as TItemStatus;

    // sourceKey와 destinationKey가 유효한지 확인
    if (!columns[sourceKey] || !columns[destinationKey]) {
      console.error('Invalid source or destination key');
      return;
    }

    const sourceList = columns[sourceKey].list;
    const destinationList = columns[destinationKey].list;

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

  return (
    <S.MainDashBoardLayout>
      <Navbar />
      <S.MainDashBoardContainer>
        <Header mainTitle="개인 대시보드" subTitle="개인 대시보드 설명하는 자리입니다" />
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
            {/* <NotStartedDashboard id="todo" list={columns.todo.list} /> */}
          </S.CardContainer>
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
  }
};

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

export type TItemStatus = 'todo' | 'doing' | 'done';

const MainPage = () => {
  const location = useLocation();
  const dashboardId = location.pathname.split('/')[1];

  const [page, setPage] = useState<number>(0);
  const [notStartedBlocks, setNotStartedBlocks] = useState<StatusPersonalBlock | undefined>(
    undefined
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
  }>({
    todo: {
      id: 'todo',
      list: [],
      pageInfo: { currentPage: 1, totalPages: 1, totalItems: 1 },
      component: NotStartedDashboard,
      backGroundColor: '#E8FBFF',
      highlightColor: theme.color.main3,
      progress: '시작 전',
      imgSrc: main3,
    },
    doing: {
      id: 'doing',
      list: [],
      pageInfo: { currentPage: 1, totalPages: 1, totalItems: 1 },
      component: InProgressDashboard,
      backGroundColor: '#EDF3FF',
      highlightColor: theme.color.main,
      progress: '진행 중',
      imgSrc: main,
    },
    done: {
      id: 'done',
      list: [],
      pageInfo: { currentPage: 1, totalPages: 1, totalItems: 1 },
      component: CompletedDashboard,
      backGroundColor: '#F7F1FF',
      highlightColor: theme.color.main2,
      progress: '완료',
      imgSrc: main2,
    },
  });

  // 블록 데이터 불러오기
  const fetchData = async (page: number = 0) => {
    const data = await getDashBoard(dashboardId, page, 10);
    console.log('옛다 데이터!', data);

    if (data) {
      setNotStartedBlocks(data);

      // columns 확인하기
      // console.log(JSON.stringify(columns) === JSON.stringify(data));

      setColumns(prevColumns => {
        console.log('받아온 데이터를 마지막으로 확인하고 추가하겠습니다.', data.blockListResDto);
        const updatedColumns = {
          ...prevColumns,
          todo: {
            ...prevColumns.todo,
            list: [...prevColumns.todo.list, ...data.blockListResDto],
            pageInfo: data.pageInfoResDto,
          },
        };

        // 상태 업데이트 후의 동작은 이 내부에서 처리할 수 있음
        console.log('colums 업데이트 후 상태 확인:', updatedColumns);

        return updatedColumns;
      });
    }
  };

  useEffect(() => {
    console.log(`${page} 페이지를 요청합니다!`);
    fetchData(page);
  }, [location.pathname, page]); // 데이터 불러오는 기준 : 다시 이 url에 접속했을 때 (dashboardId로 업데이트하게 되면, 사이드 페이지 자동 저장 후 바로 반영되지 않아 locaton 객체로 감지)

  // props로 넘겨주기 위한 columns 업데이트
  // const updateClums = () => {
  //   if (notStartedBlocks) {
  //     setColumns(prevColumns => ({
  //       ...prevColumns,
  //       todo: {
  //         ...prevColumns.todo,
  //         list: [...prevColumns.todo.list, ...notStartedBlocks.blockListResDto],
  //         pageInfo: notStartedBlocks.pageInfoResDto,
  //       },
  //     }));
  //   }
  // };

  useEffect(
    () => console.log(`진짜 columns 업데이트 확인할거임~~~~~~~~~~~~~~~~~~`, columns.todo.list),
    [columns]
  );

  // 세로 무한 스크롤 감지 이벤트 : 자식 컴포넌트에서 추가 데이터 요청을 감지 (props로 전달)
  const handleLoadMore = async () => {
    setPage(prevPage => prevPage + 1);
  };

  const onDragEnd = ({ source, destination }: DropResult) => {
    //droppable 하지 않곳에 block을 내려놨을시에 중단하고 return;
    console.log(columns);
    if (!destination) return;

    const sourceKey = source.droppableId as TItemStatus;
    const destinationKey = destination.droppableId as TItemStatus;

    if (sourceKey === destinationKey) {
      // console.log(columns[sourceKey]);
      const newList = Array.from(columns[sourceKey].list);
      // console.log(newList);
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

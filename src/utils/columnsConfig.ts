import theme from '../styles/Theme/Theme';
import main from '../img/main.png';
import main2 from '../img/main2.png';
import main3 from '../img/main3.png';
import NotStartedDashboard from '../components/NotStartedDashboard';
import InProgressDashboard from '../components/InProgressDashboard';
import CompletedDashboard from '../components/CompletedDashboard';

export type TItemStatus = 'todo' | 'doing' | 'done';

export const initialColumns = {
  todo: {
    id: 'todo',
    list: [],
    pageInfo: { currentPage: 0, totalPages: 1, totalItems: 1 },
    component: NotStartedDashboard,
    backGroundColor: '#E8FBFF',
    highlightColor: theme.color.main3,
    progress: '시작 전',
    imgSrc: main3,
  },
  doing: {
    id: 'doing',
    list: [],
    pageInfo: { currentPage: 0, totalPages: 1, totalItems: 1 },
    component: InProgressDashboard,
    backGroundColor: '#EDF3FF',
    highlightColor: theme.color.main,
    progress: '진행 중',
    imgSrc: main,
  },
  done: {
    id: 'done',
    list: [],
    pageInfo: { currentPage: 0, totalPages: 1, totalItems: 1 },
    component: CompletedDashboard,
    backGroundColor: '#F7F1FF',
    highlightColor: theme.color.main2,
    progress: '완료',
    imgSrc: main2,
  },
};

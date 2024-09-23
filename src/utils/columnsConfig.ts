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
  },
  doing: {
    id: 'doing',
    list: [],
    pageInfo: { currentPage: 0, totalPages: 1, totalItems: 1 },
    component: InProgressDashboard,
  },
  done: {
    id: 'done',
    list: [],
    pageInfo: { currentPage: 0, totalPages: 1, totalItems: 1 },
    component: CompletedDashboard,
  },
  delete: {
    id: 'delete',
    list: [],
    pageInfo: { currentPage: 0, totalPages: 1, totalItems: 0 },
  },
};

import NotStartedDashboard from '../components/NotStartedDashboard';
import InProgressDashboard from '../components/InProgressDashboard';
import CompletedDashboard from '../components/CompletedDashboard';
import { BlockListResDto } from '../types/PersonalBlock';

export type TItemStatus = 'todo' | 'doing' | 'completed' | 'delete' | 'icon';

export type TItems = {
  [key in TItemStatus]: BlockListResDto[];
};
export type TPages = {
  todo: number;
  doing: number;
  completed: number;
  delete: number;
};
//폐기할 코드
// export const initialColumns = {
//   todo: {
//     id: 'todo',
//     list: [],
//     pageInfo: { currentPage: 0, totalPages: 1, totalItems: 1 },
//     component: NotStartedDashboard,
//   },
//   doing: {
//     id: 'doing',
//     list: [],
//     pageInfo: { currentPage: 0, totalPages: 1, totalItems: 1 },
//     component: InProgressDashboard,
//   },
//   done: {
//     id: 'done',
//     list: [],
//     pageInfo: { currentPage: 0, totalPages: 1, totalItems: 1 },
//     component: CompletedDashboard,
//   },
//   delete: {
//     id: 'delete',
//     list: [],
//     pageInfo: { currentPage: 0, totalPages: 1, totalItems: 0 },
//   },
// };

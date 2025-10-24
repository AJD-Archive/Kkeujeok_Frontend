// types/Columns.ts
import type { BlockListResDto } from './PersonalBlock';

export type DashboardProps = {
  id: string;
  list: BlockListResDto[];
  component: React.FC<{ list: BlockListResDto[]; id: string }>;
  backGroundColor: string;
  highlightColor: string;
  progress: string;
  imgSrc: string;
};

export type Columns = {
  todo: DashboardProps;
  doing: DashboardProps;
  done: DashboardProps;
};

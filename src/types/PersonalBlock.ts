export interface StatusPersonalBlock {
  blockListResDto: BlockListResDto[];
  pageInfoResDto: PageInfoResDto;
}

export interface BlockListResDto {
  dashboardId?: string; // 지우) 따로 추가
  blockId?: string | null;
  title?: string;
  contents?: string;
  progress?: string;
  type?: string;
  startDate?: string | null;
  deadLine?: string | null;
  nickname?: string;
  dDay?: string;
  dType?: 'PersonalDashboard';
  picture?: string;
}

export interface DeletedBlockList {
  blockListResDto: BlockListResDto[];
  pageInfoResDto: PageInfoResDto;
}
export interface PageInfoResDto {
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

export interface BlockOrder {
  dashboardId: string;
  notStartedList: (string | null | undefined)[];
  inProgressList: (string | null | undefined)[];
  completedList: (string | null | undefined)[];
}

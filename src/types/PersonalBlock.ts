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
  dDay?: number;
}

export interface PageInfoResDto {
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

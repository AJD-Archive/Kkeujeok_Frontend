// * 팀 문서 타입
export interface TeamDocument {
  author?: string;
  picture?: string;
  title?: string;
  category?: string;
  content?: string;
  teamDocumentId?: string;
  teamDashboardId?: string; // ? 팀 대시보드 정보는 없어도 되는건가?
}

// * 페이지 정보 타입
export interface PageInfoResDto {
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

// * 최종 응답 타입
export interface TeamDocumentResponse {
  teamDocuments: TeamDocument[];
  pageInfoResDto: PageInfoResDto;
}

export interface PersonalDashBoard {
  title: string;
  description: string;
  isPublic: boolean;
  category: string | undefined;
}

export interface DashboardItem {
  dashboardId: number | null;
  myId: number | null;
  creatorId: number | null;
  title: string;
  description: string;
  isPublic: boolean;
  category: string;
  blockProgress: number;
}

interface PageInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

export interface PersonalSearchDashboardData {
  personalDashboardListResDto: DashboardItem[];
  pageInfoResDto: PageInfo;
}

export interface PersonalSearchDashBoard {
  statusCode: number;
  message: string;
  data: PersonalSearchDashboardData;
}

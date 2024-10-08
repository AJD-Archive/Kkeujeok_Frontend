import { ProfileData } from './UserInfo';

// 각 요소의 타입을 정의
export interface TeamDashboardInfoResDto {
  dashboardId?: string | null;
  myId?: string | null;
  creatorId?: string | null;
  title?: string;
  description?: string;
  blockProgress?: number;
  joinMembers?: ProfileData[] | null; // joinMembers가 배열일 수 있으므로 string[]로 정의. 타입에 따라 다를 수 있음.
  invitedEmails?: string[];
}
// 전체 응답 구조를 정의
export interface TeamDashboardResponse {
  statusCode: number;
  message: string;
  data: {
    teamDashboardInfoResDto: TeamDashboardInfoResDto[];
  };
}

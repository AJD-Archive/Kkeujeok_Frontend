export interface ProfileInfo {
  statusCode: number;
  message: 'string';
  data: {
    picture: 'string';
    email: 'string';
    name: 'string';
    nickName: 'string';
    socialType: 'KAKAO' | 'GOOGLE';
    introduction: 'string';
  };
}

interface PageInfoResDto {
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

interface TeamDashboardInfoResDto {
  blockProgress: number;
  creatorId: string;
  dashboardId: string;
  description: string;
  joinMembers: number | null;
  myId: string;
  title: string;
}

interface ChallengeInfoResDto {
  // 챌린지 정보에 맞는 속성들을 추가해야 합니다. 예시로는 아래와 같이 비워둡니다.
}

export interface TeamDashboardList {
  teamDashboardInfoResDto: TeamDashboardInfoResDto[];
  pageInfoResDto: PageInfoResDto;
}

export interface ChallengeList {
  challengeInfoResDto: ChallengeInfoResDto[];
  pageInfoResDto: PageInfoResDto;
}

interface ApiResponse {
  statusCode: number;
  message: string;
  data: {
    teamDashboardList: TeamDashboardList;
    challengeList: ChallengeList;
  };
}
export interface ReturnData {
  data: {
    teamDashboardList: TeamDashboardList;
    challengeList: ChallengeList;
  };
}

type NotificationInfoResDto = {
  id: number | null; // id가 null일 수 있으므로 number | null 타입으로 처리
  message: string;
  isRead: boolean;
};

type NotiPageInfoResDto = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
};

export type NotificationResponse = {
  data: {
    notificationInfoResDto: NotificationInfoResDto[];
    pageInfoResDto: NotiPageInfoResDto;
  };
};

export type PageNationProps = {
  page: number;
  size: number;
};

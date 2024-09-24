import { DashboardItem } from './PersonalDashBoard';

//* 사용자 프로필 타입
export interface ProfileInfo {
  statusCode: number;
  message: string;
  data: {
    picture: string;
    email: string;
    name: string;
    nickName: string;
    socialType: 'KAKAO' | 'GOOGLE';
    introduction: string;
  };
}

//* 페이지네이션 타입
interface PageInfoResDto {
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

//* 마이페이지 개인,팀,챌린지 대시보드 타입
export interface ReturnData {
  data: {
    personalDashboardList: PersonalDashboardList;
    teamDashboardList: TeamDashboardList;
    challengeList: ChallengeList;
  };
}

//* 팀 대시보드 정보 타입
interface TeamDashboardInfoResDto {
  blockProgress: number;
  creatorId: string;
  dashboardId: string;
  description: string;
  joinMembers: number | null;
  myId: string;
  title: string;
}

//* 챌린지 대시보드 정보 타입
interface ChallengeInfoResDto {
  challengeId: number;
  title: string;
  contents: string;
  category: string;
  cycle: string;
  cycleDetails: string[];
  startDate: number[];
  endDate: number[];
  representImage: string;
  authorName: string;
  authorProfileImage: string;
  blockName: string;
  participantCount: number;
  isParticipant: boolean;
  isAuthor: boolean;
  completedMembers: string[];
}

export interface PersonalDashboardList {
  personalDashboardInfoResDto: DashboardItem[];
  pageInfoResDto: PageInfoResDto;
}
export interface TeamDashboardList {
  teamDashboardInfoResDto: TeamDashboardInfoResDto[];
  pageInfoResDto: PageInfoResDto;
}

export interface ChallengeList {
  challengeInfoResDto: ChallengeInfoResDto[];
  pageInfoResDto: PageInfoResDto;
}

// * 알람 정보 타입
type NotificationInfoResDto = {
  id: number | null;
  message: string;
  isRead: boolean;
};

export type NotificationResponse = {
  data: {
    notificationInfoResDto: NotificationInfoResDto[];
  };
};

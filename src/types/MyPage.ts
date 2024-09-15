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
  // 팀 대시보드 정보에 맞는 속성들을 추가해야 합니다. 예시로는 아래와 같이 비워둡니다.
}

interface ChallengeInfoResDto {
  // 챌린지 정보에 맞는 속성들을 추가해야 합니다. 예시로는 아래와 같이 비워둡니다.
}

interface TeamDashboardList {
  teamDashboardInfoResDto: TeamDashboardInfoResDto[];
  pageInfoResDto: PageInfoResDto;
}

interface ChallengeList {
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

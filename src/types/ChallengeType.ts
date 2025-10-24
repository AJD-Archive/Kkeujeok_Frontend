// * 챌린지 타입
export interface Challenge {
  challengeId?: string;
  title?: string;
  contents?: string;
  category?: string;
  cycle?: string;
  cycleDetails?: string[] | string;
  startDate?: string;
  endDate?: string;
  representImage?: File | string;
  authorName?: string;
  authorProfileImage?: string;
  blockName?: string;
  participantCount?: 0;
  isParticipant?: false;
  isAuthor?: true;
  completedMembers?: completedMember[];
  authorId?: string;
}

// * 실시간 완료 멤버 타입
export interface completedMember {
  memberId?: string;
  picture?: string;
  nickname?: string;
}

// * 페이지 정보 타입
export interface PageInfoResDto {
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

// * 최종 응답 타입
export interface ChallengeResponse {
  challengeSummaries: Challenge[];
  pageInfoResDto: PageInfoResDto;
}

// * 챌린지 카테고리
export const ChallengeCategory = {
  HEALTH_AND_FITNESS: '건강 및 운동',
  MENTAL_WELLNESS: '정신 및 마음관리',
  PRODUCTIVITY_AND_TIME_MANAGEMENT: '생산성 및 시간 관리',
  FINANCE_AND_ASSET_MANAGEMENT: '재정 및 자산 관리',
  SELF_DEVELOPMENT: '자기 개발',
  LIFE_ORGANIZATION_AND_MANAGEMENT: '생활 정리 및 관리',
  SOCIAL_CONNECTIONS: '사회적 연결',
  CREATIVITY_AND_ARTS: '창의력 및 예술 활동',
  OTHERS: '기타',
};

// * 챌린지 주기
export const ChallengeCycle = {
  DAILY: '매일',
  WEEKLY: '매주',
  MONTHLY: '매달',
};

// * 챌린지 주기 상세 정보
export const ChallengeCycleDetail = {
  DAILY: '매일',
};

export const ChallengeCycleDetail_Weekly = {
  MON: '월',
  TUE: '화',
  WED: '수',
  THU: '목',
  FRI: '금',
  SAT: '토',
  SUN: '일',
};

export const ChallengeCycleDetail_Monthly = {
  FIRST: '1',
  SECOND: '2',
  THIRD: '3',
  FOURTH: '4',
  FIFTH: '5',
  SIXTH: '6',
  SEVENTH: '7',
  EIGHTH: '8',
  NINTH: '9',
  TENTH: '10',
  ELEVENTH: '11',
  TWELFTH: '12',
  THIRTEENTH: '13',
  FOURTEENTH: '14',
  FIFTEENTH: '15',
  SIXTEENTH: '16',
  SEVENTEENTH: '17',
  EIGHTEENTH: '18',
  NINETEENTH: '19',
  TWENTIETH: '20',
  TWENTY_FIRST: '21',
  TWENTY_SECOND: '22',
  TWENTY_THIRD: '23',
  TWENTY_FOURTH: '24',
  TWENTY_FIFTH: '25',
  TWENTY_SIXTH: '26',
  TWENTY_SEVENTH: '27',
  TWENTY_EIGHTH: '28',
  TWENTY_NINTH: '29',
  THIRTIETH: '30',
  THIRTY_FIRST: '31',
};

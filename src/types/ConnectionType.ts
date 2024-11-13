export type FollowInfo = {
  memberId?: number;
  nickname?: string;
  name?: string;
  profileImage?: string;
  isFollow?: boolean;
};

export type PageInfo = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
};

export type FollowersListData = {
  followInfoResDto: FollowInfo[];
  pageInfoResDto: PageInfo;
};

import { axiosInstance } from '../utils/apiConfig';
import { FollowersListData } from '../types/ConnectionType';

// * 내 친구 목록 get
export const getFollowersList = async (
  page: number,
  size: number
): Promise<FollowersListData | null> => {
  try {
    const response = await axiosInstance.get(`/member/follow?page=${page}&size=${size}`, {
      params: {
        page: page,
        size: size,
      },
    });
    console.log('내 친구 목록', response.data);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

// * 전체 친구 목록 get + 검색
export const getSearchFriendsList = async (
  keyword: string,
  page: number,
  size: number
): Promise<FollowersListData | null> => {
  try {
    const response = await axiosInstance.get(
      `/member/follow/search/all?keyword=${keyword}&page=${page}&size=${size}`
    );
    console.log('검색 친구 목록', response.data);

    return {
      followInfoResDto: response.data.data.memberInfoForFollowResDtos, // 원하는 필드 이름으로 매핑
      pageInfoResDto: response.data.data.pageInfoResDto,
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

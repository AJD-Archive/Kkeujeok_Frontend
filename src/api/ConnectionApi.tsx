import { axiosInstance } from '../utils/apiConfig';
import { FollowersListData } from '../types/ConnectionType';
import { customErrToast } from '../utils/customErrorToast';

// * 내 친구 목록 get
export const getFollowersList = async (
  page: number,
  size: number
): Promise<FollowersListData | null> => {
  try {
    const response = await axiosInstance.get(`/member/follow?page=${page}&size=${size}`);
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

    return {
      followInfoResDto: response.data.data.memberInfoForFollowResDtos,
      pageInfoResDto: response.data.data.pageInfoResDto,
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

// * 추천 친구 get
export const getRecommendedFriendsList = async (
  page: number,
  size: number
): Promise<FollowersListData | null> => {
  try {
    const response = await axiosInstance.get(
      `/member/follow/recommended?page=${page}&size=${size}`
    );

    return {
      followInfoResDto: response.data.data.recommendedFollowInfoResDtos,
      pageInfoResDto: response.data.data.pageInfoResDto,
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

// * 친구 신청 post
export const postFollow = async (memberId: string): Promise<boolean | null> => {
  try {
    await axiosInstance.post(`/member/follow`, {
      memberId: memberId,
    });

    return true;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.status == 403) customErrToast(error.response.data.message);
    return null;
  }
};

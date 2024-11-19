import { axiosInstance } from '../utils/apiConfig';
import { FollowersListData } from '../types/FriendType';
import { AxiosResponse } from 'axios';

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
export const postFollow = async (memberId: string): Promise<AxiosResponse | null> => {
  try {
    const response = await axiosInstance.post(`/member/follow`, {
      memberId: memberId,
    });

    return response;
  } catch (error) {
    console.log(error);

    return null;
  }
};

// * 친구 삭제 delete
export const deleteFollow = async (memberId: string): Promise<AxiosResponse | null> => {
  try {
    const response = await axiosInstance.delete(`/member/follow/${memberId}`);

    return response;
  } catch (error) {
    console.log(error);

    return null;
  }
};

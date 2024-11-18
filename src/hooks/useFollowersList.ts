import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FollowersListData } from '../types/ConnectionType';
import {
  deleteFollow,
  getFollowersList,
  getRecommendedFriendsList,
  getSearchFriendsList,
  postFollow,
} from '../api/ConnectionApi';
import { customErrToast } from '../utils/customErrorToast';
import { axiosInstance } from '../utils/apiConfig';

export const useFollowersList = (page: number, size: number) => {
  return useQuery<FollowersListData | null>({
    queryKey: ['followersList', page, size],
    queryFn: () => getFollowersList(page, size),
    staleTime: 1000 * 60 * 5,
  });
};

export const useSearchFriendsList = (keyword: string, page: number, size: number) => {
  return useQuery<FollowersListData | null>({
    queryKey: ['followersList', keyword, page, size],
    queryFn: () => getSearchFriendsList(keyword, page, size),
    staleTime: 1000 * 60 * 5,
  });
};

export const useRecommendFriendsList = (page: number, size: number) => {
  return useQuery<FollowersListData | null>({
    queryKey: ['recommendedFriendsList', page, size],
    queryFn: () => getRecommendedFriendsList(page, size),
    staleTime: 1000 * 60 * 5,
  });
};

export const usePostFollow = (id: string, name: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => postFollow(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['followersList'] });
      queryClient.invalidateQueries({ queryKey: ['recommendedFriendsList'] });
      customErrToast(`${name}님에게 친구 신청을 보냈습니다.`);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      if (error.response && error.response.status === 403) {
        customErrToast(error.response.data.message);
      } else {
        customErrToast('친구 신청 중 오류가 발생했습니다.');
      }
    },
  });
};

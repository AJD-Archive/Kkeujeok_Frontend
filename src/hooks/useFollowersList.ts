import { useQuery } from '@tanstack/react-query';
import { FollowersListData } from '../types/ConnectionType';
import { getFollowersList, getSearchFriendsList } from '../api/ConnectionApi';

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

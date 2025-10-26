import type { UserInfo } from '../types/UserInfo';
import { axiosInstance } from '../utils/apiConfig';

export const userInfoApi = async (): Promise<UserInfo | undefined> => {
  try {
    const response = await axiosInstance.get('/members/mypage');
    return response.data as UserInfo;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

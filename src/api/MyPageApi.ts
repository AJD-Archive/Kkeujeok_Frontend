import { ProfileInfo, ReturnData } from '../types/MyPage';
import { axiosInstance } from '../utils/apiConfig';

export const fetchData = async (): Promise<ProfileInfo | undefined> => {
  try {
    const res = await axiosInstance.get('/members/mypage');
    return res.data as ProfileInfo;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const fetchBlockData = async (): Promise<ReturnData | undefined> => {
  try {
    const res = await axiosInstance.get('/members/mypage/dashboard-challenges');

    return res.data as ReturnData;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

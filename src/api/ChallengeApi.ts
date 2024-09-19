import { Challenge } from '../types/ChallengeType';
import { axiosInstance } from '../utils/apiConfig';

// * 챌린지 create
export const createChallenge = async (data: FormData): Promise<void> => {
  try {
    console.log('챌린지 생성 데이터', JSON.stringify(data));
    const response = await axiosInstance.post('/challenges', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    console.log(response.data);
    //   return response.data.data.dashboardId;
  } catch (error) {
    console.error('Error fetching data:', error);
    //   return null;
  }
};

// * 챌린지 update
export const updateChallenge = async (data: Challenge, id: string): Promise<void> => {
  try {
    const response = await axiosInstance.post(`/challenges/${id}`, data);
    console.log(response.data);
    //   return response.data.data.dashboardId;
  } catch (error) {
    console.error('Error fetching data:', error);
    //   return null;
  }
};

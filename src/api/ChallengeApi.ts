import { Challenge, ChallengeResponse } from '../types/ChallengeType';
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

// * 챌린지 get
export const getSearchChallenge = async (
  keyword: string | null,
  category: string | null,
  page: number,
  size: number
): Promise<ChallengeResponse | null> => {
  try {
    console.log(keyword, category, '로 검색할게요');
    const response = await axiosInstance.get(`/challenges/search`, {
      params: {
        category: category || '', // 빈 문자열은 전체 검색
        keyword: keyword || '',
        page: page,
        size: size,
      },
    });
    console.log('챌린지 전체 데이터', response.data);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

// * 챌린지 상세보기 get

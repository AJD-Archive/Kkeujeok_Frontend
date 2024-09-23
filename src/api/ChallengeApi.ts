import { Challenge, ChallengeResponse } from '../types/ChallengeType';
import { axiosInstance } from '../utils/apiConfig';

// * 챌린지 create
export const createChallenge = async (data: FormData): Promise<void | string> => {
  try {
    const response = await axiosInstance.post('/challenges', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    console.log(response.data);
    return '';
  } catch (error) {
    console.error('Error fetching data:', error);
    //   return null;
  }
};

// * 챌린지 update
export const patchChallenge = async (id: string, data: FormData): Promise<void> => {
  try {
    const response = await axiosInstance.patch(`/challenges/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    // console.log(response.data);
    return response.data.data.challengeId;
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
export const getChallengeDetail = async (challengeId: string): Promise<Challenge | null> => {
  try {
    const response = await axiosInstance.get(`/challenges/${challengeId}`);
    // console.log(response.data.data);

    return response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

// * 챌린지 삭제
export const deleteChallenge = async (id: string): Promise<void> => {
  try {
    const response = await axiosInstance.delete(`/challenges/${id}`);

    console.log(response);
  } catch (error) {
    console.log('error');
  }
};

// * 챌린지 참여
export const joinChallenge = async (challengeId: string, dashboardId: string): Promise<void> => {
  try {
    const response = await axiosInstance.post(`/challenges/${challengeId}/${dashboardId}`);
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// * 챌린지 탈퇴
export const withdrawChallenge = async (id: string): Promise<void> => {
  try {
    const response = await axiosInstance.delete(`/challenges/${id}/withdraw`);

    console.log(response);
  } catch (error) {
    console.log('error');
  }
};

import { NotificationResponse, ProfileInfo, ReturnData } from '../types/MyPage';
import { axiosInstance } from '../utils/apiConfig';

export const fetchData = async (): Promise<ProfileInfo | undefined> => {
  try {
    const res = await axiosInstance.get('/members/mypage');
    return res.data as ProfileInfo;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

//마이페이지에서 팀블록 챌린지 블록 페이지네이션 데이터 받아오기
export const fetchBlockData = async (pageNum: number): Promise<ReturnData | undefined> => {
  try {
    const res = await axiosInstance.get(
      `/members/mypage/dashboard-challenges?page=${pageNum}&size=6`
    );
    return res.data as ReturnData;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

//알람 전체 리스트 조회
export const getAlarmList = async (): Promise<NotificationResponse | undefined> => {
  try {
    const res = await axiosInstance.get('/notifications');
    return res.data as NotificationResponse;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

//사용자 닉네임,자기소개 수정
export const updateUserInfo = async (nickname: string, introduction: string) => {
  try {
    const data = await axiosInstance.patch('/members/mypage', {
      nickname: nickname,
      introduction: introduction,
    });
    console.log(data);
  } catch (error) {
    console.error('Error fetching data :', error);
  }
};

import {
  FriendBlock,
  FrinedProfile,
  NotificationResponse,
  ProfileInfo,
  ReturnData,
} from '../types/MyPage';
import { axiosInstance } from '../utils/apiConfig';

// * 마이페이지 프로필 조회
export const fetchData = async (): Promise<ProfileInfo | undefined> => {
  try {
    const res = await axiosInstance.get('/members/mypage');
    return res.data as ProfileInfo;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// * 마이페이지 개인,팀,챌린지 블록 데이터 받아오기
export const fetchBlockData = async (
  pageNum: number,
  email: string
): Promise<ReturnData | undefined> => {
  try {
    const res = await axiosInstance.get(
      `/members/mypage/dashboard-challenges?requestEmail=${email}&page=${pageNum}&size=6`
    );
    return res.data as ReturnData;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// * 친구 마이페이지에서 개인,팀,챌린지 블록 데이터 받아오기
export const fetchFriendBlockData = async (
  pageNum: number,
  friendId: string
): Promise<FriendBlock | undefined> => {
  try {
    const res = await axiosInstance.get(
      `/members/mypage/${friendId}/dashboard-challenges?page=${pageNum}&size=6`
    );
    console.log(res.data.data);
    return res.data.data as FriendBlock;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// * 알람 리스트 전체 조회
export const getAlarmList = async (): Promise<NotificationResponse | undefined> => {
  try {
    const res = await axiosInstance.get('/notifications');
    return res.data as NotificationResponse;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

//* 사용자 닉네임,자기소개 수정
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

//* 알림 아이콘 클릭시 모든 알람 읽어진 것으로 수정
export const updateAlarmIsRead = async () => {
  try {
    await axiosInstance.patch('/notifications');
  } catch (error) {
    console.error('Error fetching data :', error);
  }
};

// * 친구 요청 알람 수락
export const acceptFriendAlarm = async (followId: string) => {
  try {
    const response = await axiosInstance.post(`/member/follow/accept/${followId}`);
  } catch (error) {
    console.error('Error fetching data :', error);
    throw error;
  }
};

// * 친구 마이페이지 프로필 조회
export const friendProfile = async (friendId: string) => {
  try {
    const res = await axiosInstance.get(`/members/mypage/${friendId}`);
    return res.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

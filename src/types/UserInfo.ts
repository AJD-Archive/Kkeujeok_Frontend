export interface ProfileData {
  id: number;
  picture: string;
  email: string;
  name: string;
  nickName: string;
  socialType: 'GOOGLE' | 'KAKAO';
  introduction: string;
  memberId?: number;
}

export interface UserInfo {
  statusCode: number;
  message: string;
  data: ProfileData;
}

export interface ProfileData {
  picture: string;
  email: string;
  name: string;
  nickName: string;
  socialType: 'GOOGLE' | 'KAKAO';
  introduction: string;
}

export interface UserInfo {
  statusCode: number;
  message: string;
  data: ProfileData;
}

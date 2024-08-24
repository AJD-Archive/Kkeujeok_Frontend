export interface ProfileInfo {
  statusCode: number;
  message: 'string';
  data: {
    picture: 'string';
    email: 'string';
    name: 'string';
    nickName: 'string';
    socialType: 'KAKAO' | 'GOOGLE';
    introduction: 'string';
  };
}

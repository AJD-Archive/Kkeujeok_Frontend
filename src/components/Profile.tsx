import * as S from '../styles/ProfileStyled';

export type Props = {
  width?: string;
  height?: string;
  profile?: string;
};
const Profile = ({ width, height, profile }: Props) => {
  return (
    <S.ProfileImgWrapper width={width} height={height}>
      <img src={profile} alt="프로필 이미지" />
    </S.ProfileImgWrapper>
  );
};
export default Profile;

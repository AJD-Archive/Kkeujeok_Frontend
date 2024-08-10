import profileimg from '../img/kakaoprofileimage.png';
import * as S from '../styles/ProfileStyled';

export type Props = {
  width?: string;
  height?: string;
};
const Profile = ({ width, height }: Props) => {
  return (
    <S.ProfileImgWrapper width={width} height={height}>
      <img src={profileimg} alt="프로필 이미지" />
    </S.ProfileImgWrapper>
  );
};
export default Profile;

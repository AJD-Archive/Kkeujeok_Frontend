import defaultImage from '../img/default.png';
import * as S from '../styles/ProfileStyled';

export type Props = {
  width?: string;
  height?: string;
  profile?: string;
};
const Profile = ({ width, height, profile }: Props) => {
  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = defaultImage; // 대체 이미지로 변경
  };

  return (
    <S.ProfileImgWrapper height={height} width={width}>
      <img alt='프로필 이미지' src={profile} onError={handleImageError} />
    </S.ProfileImgWrapper>
  );
};
export default Profile;

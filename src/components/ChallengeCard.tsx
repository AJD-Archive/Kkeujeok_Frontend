import { useNavigate } from 'react-router-dom';
import * as S from '../styles/ChallengeStyled';

const ChallengeCard = () => {
  const navigate = useNavigate();

  return (
    <S.ChallengeComponent onClick={() => navigate(1)}>
      <S.ChallengeImg></S.ChallengeImg>
      <S.ChallengeName>챌린지명</S.ChallengeName>
      <S.ChallengeHeadCount>참여 인원수</S.ChallengeHeadCount>
    </S.ChallengeComponent>
  );
};

export default ChallengeCard;

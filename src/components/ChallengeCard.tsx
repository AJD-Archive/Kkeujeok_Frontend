import * as S from '../styles/ChallengeStyled';

const ChallengeCard = () => {
  return (
    <S.ChallengeComponent>
      <S.ChallengeImg></S.ChallengeImg>
      <S.ChallengeName>챌린지명</S.ChallengeName>
      <S.ChallengeHeadCount>참여 인원수</S.ChallengeHeadCount>
    </S.ChallengeComponent>
  );
};

export default ChallengeCard;

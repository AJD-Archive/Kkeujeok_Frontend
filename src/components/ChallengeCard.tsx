import { useNavigate } from 'react-router-dom';
import * as S from '../styles/ChallengeStyled';
import {
  Challenge,
  ChallengeCycle,
  ChallengeCycleDetail_Monthly,
  ChallengeCycleDetail_Weekly,
} from '../types/ChallengeType';
import { useState, useEffect } from 'react';
import defaultImg from '../img/default.png';

const ChallengeCard = ({ challenge }: { challenge: Challenge }) => {
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (challenge.representImage instanceof File) {
      // File 타입일 경우 URL로 변환
      const objectUrl = URL.createObjectURL(challenge.representImage);
      setImageSrc(objectUrl);

      // 메모리 누수를 방지하기 위해 컴포넌트가 언마운트될 때 URL 해제
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      // string 타입일 경우 그대로 사용
      setImageSrc(challenge.representImage);
    }
  }, [challenge.representImage]);

  return (
    <S.ChallengeComponent onClick={() => navigate(`${challenge.challengeId}`)}>
      {imageSrc ? <S.ChallengeImg src={imageSrc} /> : <S.ChallengeImg src={defaultImg} />}
      <S.ChallengeName>{challenge.title}</S.ChallengeName>
      <S.ChallengeHeadCount>
        {challenge.cycle
          ? ChallengeCycle[challenge.cycle as keyof typeof ChallengeCycle]
          : '알 수 없는 주기'}{' '}
        {challenge.cycle === 'WEEKLY' &&
          Array.isArray(challenge.cycleDetails) &&
          challenge.cycleDetails
            .map(
              (detail: string) =>
                ChallengeCycleDetail_Weekly[detail as keyof typeof ChallengeCycleDetail_Weekly]
            )
            .join(', ')}
        {challenge.cycle === 'MONTHLY' &&
          Array.isArray(challenge.cycleDetails) &&
          challenge.cycleDetails
            .map(
              (detail: string) =>
                ChallengeCycleDetail_Monthly[detail as keyof typeof ChallengeCycleDetail_Monthly] +
                '일'
            )
            .join(', ')}
      </S.ChallengeHeadCount>
    </S.ChallengeComponent>
  );
};

export default ChallengeCard;

import * as S from '../styles/MyPageStyled';

interface Props {
  title?: string;
  joinMembers?: number;
  description?: string;
  cycle?: string;
}
const ChallengeBlock = ({ title, joinMembers, description, cycle }: Props) => {
  return (
    <S.ChallengeLayout>
      <S.ChallengeBoxTitle>{title}</S.ChallengeBoxTitle>
      <S.CahllengeInfo>
        {cycle && (
          <div>
            <span>주기</span>
            <span>&nbsp;|&nbsp;</span>
            <span>{joinMembers ?? 1}</span>{' '}
          </div>
        )}
        <hr />
        <p>{description}</p>
      </S.CahllengeInfo>
    </S.ChallengeLayout>
  );
};
export default ChallengeBlock;

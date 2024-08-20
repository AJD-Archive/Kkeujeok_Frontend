import * as S from '../styles/MyPageStyled';

const ChallengeBlock = () => {
  return (
    <S.ChallengeLayout>
      <S.ChallengeBoxTitle>대시보드 이름</S.ChallengeBoxTitle>
      <S.CahllengeInfo>
        <span>주기</span>
        <span>&nbsp;|&nbsp;</span>
        <span>참여인원</span>
        <hr />
        <p>챌린지 설명</p>
      </S.CahllengeInfo>
    </S.ChallengeLayout>
  );
};
export default ChallengeBlock;

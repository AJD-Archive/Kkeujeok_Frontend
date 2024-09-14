import * as S from '../styles/MyPageStyled';
import { TeamDashboardInfoResDto } from '../types/TeamDashBoard';

interface Props {
  dashboardId?: string;
  title?: string;
  joinMembers?: number;
  description?: string;
}
const ChallengeBlock = ({ dashboardId, title, joinMembers, description }: Props) => {
  return (
    <S.ChallengeLayout>
      <S.ChallengeBoxTitle>{title}</S.ChallengeBoxTitle>
      <S.CahllengeInfo>
        <span>주기</span>
        <span>&nbsp;|&nbsp;</span>
        <span>{joinMembers ?? 1}</span>
        <hr />
        <p>{description}</p>
      </S.CahllengeInfo>
    </S.ChallengeLayout>
  );
};
export default ChallengeBlock;

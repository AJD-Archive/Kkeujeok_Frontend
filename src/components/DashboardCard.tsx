import Block from './Block';
import * as S from '../styles/DashboardStyled';

type Props = {
  backGroundColor?: string;
  highlightColor?: string;
  state?: string;
  imgSrc?: string;
};

const DashboardCard = ({ backGroundColor, highlightColor, state, imgSrc }: Props) => {
  return (
    <S.CardContainer backGroundColor={backGroundColor}>
      <header>
        <S.StatusBarContainer highlightColor={highlightColor}>
          <span>{state}</span>
        </S.StatusBarContainer>
        <S.AddButtonWrapper>
          <img src={imgSrc} alt="블록 더하는 버튼" />
        </S.AddButtonWrapper>
      </header>
      <section>
        <Block />
      </section>
    </S.CardContainer>
  );
};
export default DashboardCard;

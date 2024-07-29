import { styled } from 'styled-components';
import theme from '../styles/Theme/Theme';
import Block from './Block';

type Props = {
  backGroundColor?: string;
  highlightColor?: string;
  state?: string;
  imgSrc?: string;
};

const DashboardCard = ({ backGroundColor, highlightColor, state, imgSrc }: Props) => {
  return (
    <CardContainer backGroundColor={backGroundColor}>
      <header>
        <StatusBarContainer highlightColor={highlightColor}>
          <span>{state}</span>
        </StatusBarContainer>
        <img src={imgSrc} alt="블록 더하는 버튼" />
      </header>
      <section>
        <Block />
      </section>
    </CardContainer>
  );
};
export default DashboardCard;

const CardContainer = styled.div<Props>`
  width: 19.875rem;
  height: 39.0625rem;
  padding: 0.625rem 0.5rem;
  flex-shrink: 0;
  border-radius: 10px;
  background: ${({ backGroundColor }) => backGroundColor};

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.9688rem;
  }

  img {
    width: 12px;
    height: 12px;
  }
`;

const StatusBarContainer = styled.div<Props>`
  justify-content: space-between;
  height: auto;
  display: flex;
  align-items: center;
  padding: 0.2344rem 0;
  border-radius: 2.3438rem;
  font-size: ${theme.font.size.caption};
  font-weight: ${theme.font.weight.medium};
  background: ${({ highlightColor }) => highlightColor};

  &::before {
    content: '';
    width: 12px;
    height: 12px;
    margin-left: 0.2813rem;
    border-radius: 50%;
    background: ${theme.color.white};
  }
  span {
    color: ${theme.color.white};
    margin-right: 0.5313rem;
    margin-left: 0.2344rem;
  }
`;

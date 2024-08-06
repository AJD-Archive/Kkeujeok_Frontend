import * as S from '../styles/DashboardStyled';

interface Props {
  text: string;
}
const Dashboard = ({ text }: Props) => {
  return (
    <S.DashboardContainer>
      <h6>{text} 대시보드</h6>
      {Array.from({ length: 7 }, (_, index) => (
        <S.DashboardItem key={index}>
          {text} 대시보드 {index + 1}
        </S.DashboardItem>
      ))}
    </S.DashboardContainer>
  );
};
export default Dashboard;

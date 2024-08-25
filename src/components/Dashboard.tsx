import * as S from '../styles/DashboardStyled';
import { DashboardItem } from '../types/PersonalDashBoard';
import { TeamDashboardInfoResDto } from '../types/TeamDashBoard';

interface Props {
  text: string;
  dashboard?: DashboardItem[] | TeamDashboardInfoResDto[];
}
const Dashboard = ({ text, dashboard }: Props) => {
  return (
    <S.DashboardContainer>
      <h6>{text} 대시보드</h6>
      {dashboard?.map((value, index) => (
        <S.DashboardItem key={index}>{value.title}</S.DashboardItem>
      ))}
    </S.DashboardContainer>
  );
};
export default Dashboard;

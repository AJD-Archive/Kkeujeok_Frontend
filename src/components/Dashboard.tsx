import { useNavigate, useLocation } from 'react-router-dom';
// import { getPersonalBlock } from '../api/BoardApi';
import * as S from '../styles/DashboardStyled';
import { DashboardItem } from '../types/PersonalDashBoard';
import { TeamDashboardInfoResDto } from '../types/TeamDashBoard';

interface Props {
  text: string;
  dashboard?: DashboardItem[] | TeamDashboardInfoResDto[];
}
const Dashboard = ({ text, dashboard }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split('/')[1];

  const onClick = (id: number | string) => {
    navigate(`/${id}`);
  };

  return (
    <S.DashboardContainer>
      <h6>{text} 대시보드</h6>
      {dashboard?.map((value, index) => (
        <S.DashboardItem
          key={index}
          onClick={() => {
            onClick(value.dashboardId ?? 0);
          }}
        >
          {value.title}
        </S.DashboardItem>
      ))}
    </S.DashboardContainer>
  );
};
export default Dashboard;

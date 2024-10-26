import { useNavigate, useLocation } from 'react-router-dom';
// import { getPersonalBlock } from '../api/BoardApi';
import * as S from '../styles/DashboardStyled';
import { DashboardItem } from '../types/PersonalDashBoard';
import { TeamDashboardInfoResDto } from '../types/TeamDashBoard';
import { useEffect, useState } from 'react';

interface Props {
  text: string;
  dashboard?: DashboardItem[] | TeamDashboardInfoResDto[];
}

interface GroupedDashboards {
  [category: string]: DashboardItem[];
}

const Dashboard = ({ text, dashboard }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split('/')[1];
  const [groupedDashboard, setGroupedDashboard] = useState<GroupedDashboards>({});

  const onChangeLocation = (id: number | string) => {
    if (text === '개인') {
      navigate(`/personal/${id}`);
      localStorage.setItem('PageSort', String('personal'));
    } else {
      navigate(`/team/${id}`);
      localStorage.setItem('PageSort', String('team'));
    }
    localStorage.setItem('LatestBoard', String(id));
  };

  const groupByCategory = (dashboardItems: DashboardItem[] | undefined): GroupedDashboards => {
    if (!dashboardItems) {
      return {}; // undefined일 경우 빈 객체 반환
    }

    return dashboardItems.reduce((acc, item) => {
      const category = item.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    }, {} as GroupedDashboards);
  };

  useEffect(() => {
    if (dashboard) {
      const grouped = groupByCategory(dashboard as DashboardItem[]);
      setGroupedDashboard(grouped);
    }
  }, [dashboard]);

  return (
    <S.DashboardContainer text={text}>
      <h6>{text} 대시보드</h6>
      {text === '팀' ? (
        // 팀 대시보드일 때 렌더링
        <S.DashboardItemContainer>
          {dashboard?.map((value, index) => (
            <S.TeamDashboardItem
              key={index}
              onClick={() => {
                onChangeLocation(value.dashboardId ?? 0);
              }}
            >
              {value.title}
            </S.TeamDashboardItem>
          ))}
        </S.DashboardItemContainer>
      ) : (
        // 개인 대시보드일 때 렌더링
        Object.keys(groupedDashboard).map(category => (
          <details key={category}>
            <summary>{category}</summary>
            <S.DashboardItemContainer>
              {groupedDashboard[category].map(dashboardItem => (
                <S.PersonalDashboardItem
                  key={dashboardItem.dashboardId}
                  onClick={() => onChangeLocation(dashboardItem.dashboardId ?? 0)}
                >
                  {dashboardItem.title}
                </S.PersonalDashboardItem>
              ))}
            </S.DashboardItemContainer>
          </details>
        ))
      )}
    </S.DashboardContainer>
  );
};
export default Dashboard;

import { TeamDashboardInfoResDto } from '../types/TeamDashBoard';
import { axiosInstance } from '../utils/apiConfig';

// * 팀 대시보드 create
export const createTeamDashBoard = async (
  data: TeamDashboardInfoResDto
): Promise<string | null> => {
  try {
    const response = await axiosInstance.post('/dashboards/team/', data);
    return response.data.data.dashboardId;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

// * 팀 대시보드 patch
export const patchTeamDashBoard = async (
  dashboardId: string,
  data: TeamDashboardInfoResDto
): Promise<string | null> => {
  try {
    const response = await axiosInstance.patch(`/dashboards/team/${dashboardId}`, data);
    console.log(response);
    return response.data.data.dashboardId;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

// * 팀 대시보드 상세 정보 get
export const getTeamDashboard = async (id: string): Promise<TeamDashboardInfoResDto | null> => {
  try {
    const response = await axiosInstance.get(`/dashboards/team/${id}`);
    return response.data.data;
  } catch (error) {
    console.log('error');
    return null;
  }
};

// * 팀 대시보드 삭제
export const deleteTeamDashboard = async (id: string): Promise<void> => {
  try {
    const response = await axiosInstance.delete(`/dashboards/team/${id}`);
    // return response.data.data;
    console.log(response);
  } catch (error) {
    console.log('error');
    // return null;
  }
};

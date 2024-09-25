import { TeamDashboardInfoResDto, TeamDashboardResponse } from '../types/TeamDashBoard';
import { axiosInstance } from '../utils/apiConfig';
import { customErrToast } from '../utils/customErrorToast';

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
export const getTeamDashboard = async (
  dashboardId: string
): Promise<TeamDashboardInfoResDto | null> => {
  try {
    const response = await axiosInstance.get(`/dashboards/team/${dashboardId}`);
    console.log('팀 대시보드 중간 확인', response);
    return response.data.data;
  } catch (error) {
    console.error('팀 대시보드 중간 확인에서 error');
    return null;
  }
};

// * 팀 대시보드 삭제
export const deleteTeamDashboard = async (id: string): Promise<void> => {
  try {
    const response = await axiosInstance.delete(`/dashboards/team/${id}`);
    console.log(response);
  } catch (error) {
    console.error('error');
  }
};

// * 팀 대시보드 참여 수락
export const postTeamDashboard = async (dashboardId: string) => {
  try {
    const response = await axiosInstance.post(`/dashboards/team/${dashboardId}/join`);
    return response.data;
  } catch (error) {
    console.error('error');
    customErrToast('이미 수락한 초대입니다');
  }
};

import { axiosInstance } from '../utils/apiConfig';
import {
  DashboardItem,
  // PersonalDashBoard,
  PersonalSearchDashBoard,
} from '../types/PersonalDashBoard';
import { TeamDashboardResponse } from '../types/TeamDashBoard';
import { StatusPersonalBlock } from '../types/PersonalBlock';

// * 개인 대시보드 블록 get (세로 무한 스크롤)
export const getPersonalBlock = async (
  id: number | string,
  page: number = 0, // default 페이지 0으로 설정
  size: number = 10,
  progress: string
): Promise<StatusPersonalBlock | undefined> => {
  try {
    const response = await axiosInstance.get(
      `/blocks?dashboardId=${id}&progress=${progress}&page=${page}&size=${size}`
    );
    // console.log(response.data.data);
    return response.data.data as StatusPersonalBlock;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// * 개인 대시보드 create
export const createDashBoard = async (data: DashboardItem): Promise<string | null> => {
  try {
    const response = await axiosInstance.post('/dashboards/personal/', data);
    console.log(response.data);
    return response.data.data.dashboardId;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

// * 개인 대시보드 patch
export const patchDashBoard = async (
  dashboardId: string,
  data: DashboardItem
): Promise<string | null> => {
  try {
    const response = await axiosInstance.patch(`/dashboards/personal/${dashboardId}`, data);
    console.log(response);
    return response.data.data.dashboardId;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

export const searchPersonalDashBoard = async (): Promise<PersonalSearchDashBoard | undefined> => {
  try {
    const response = await axiosInstance.get('/dashboards/personal/');
    return response.data as PersonalSearchDashBoard;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const searchTeamDashBoard = async (): Promise<TeamDashboardResponse | undefined> => {
  try {
    const response = await axiosInstance.get('/dashboards/team/');
    return response.data as TeamDashboardResponse;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// * 개인 대시보드 생성시 사용자 카테고리 get
export const getCategories = async (): Promise<string[] | null> => {
  try {
    const response = await axiosInstance.get(`/dashboards/personal/categories`);
    return response.data.data.categories;
  } catch (error) {
    console.log('error');
    return null;
  }
};

// * 개인 대시보드 상세 정보 get
export const getPersonalDashboard = async (id: string): Promise<DashboardItem | null> => {
  try {
    const response = await axiosInstance.get(`/dashboards/personal/${id}`);
    return response.data.data;
  } catch (error) {
    console.log('error');
    return null;
  }
};

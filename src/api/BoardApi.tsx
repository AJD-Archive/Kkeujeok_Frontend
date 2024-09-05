import { axiosInstance } from '../utils/apiConfig';
import { PersonalDashBoard, PersonalSearchDashBoard } from '../types/PersonalDashBoard';
import { TeamDashboardResponse } from '../types/TeamDashBoard';
import { StatusPersonalBlock } from '../types/PersonalBlock';

export const getDashBoard = async (
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

export const createDashBoard = async (data: PersonalDashBoard): Promise<void> => {
  try {
    const response = await axiosInstance.post('/dashboards/personal/', data);
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
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

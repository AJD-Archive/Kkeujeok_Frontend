import { axiosInstance } from '../utils/apiConfig';
import { PersonalDashBoard } from '../types/PersonalDashBoard';

export const createDashBoard = async (data: PersonalDashBoard): Promise<void> => {
  try {
    const response = await axiosInstance.post('/dashboards/personal/', data);
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

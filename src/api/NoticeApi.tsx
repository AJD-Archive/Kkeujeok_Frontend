import { axiosInstance } from '../utils/apiConfig';

interface NoticeListResDto {
  id?: string;
  version?: string;
  title?: string;
  content?: string;
  createdAt?: string;
}

export const getNotice = async (): Promise<NoticeListResDto[] | null> => {
  try {
    const response = await axiosInstance.get(`/admin/notices`, {});
    return response.data.data.noticeListResDto;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

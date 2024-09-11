// import { BlockListResDto, BlockOrder } from '../types/PersonalBlock';
import { axiosInstance } from '../utils/apiConfig';

// * 팀 문서 카테고리별 확인 api
export const getTeamDocument = async (
  teamDashboardId: string,
  category: string | null,
  page: number,
  size: number
): Promise<TeamDocumentResponse | null> => {
  try {
    const response = await axiosInstance.get(
      `/dashboards/team/document/search/${teamDashboardId}`,
      {
        params: {
          category: category || '', // category가 null이면 쿼리에서 생략
          page: page,
          size: size,
        },
      }
    );
    console.log('팀 문서 전체 데이터', response.data);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

// * 팀 문서 카테고리 확인 api
export const getTeamDocumentCategories = async (
  teamDashboardId: string
): Promise<string[] | null> => {
  try {
    const response = await axiosInstance.get(
      `/dashboards/team/document/categories/${teamDashboardId}`
    );
    return response.data.data.categories;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

// * 팀 문서 생성 api
export const createTeamDocument = async (data: TeamDocument): Promise<string | null> => {
  try {
    console.log('문서 생성할게요', data);
    const response = await axiosInstance.post('/dashboards/team/document', data);
    console.log('생성된 팀문서', response.data);
    return response.data.data.teamDocumentId;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

// * 팀 문서 상세 확인 get
export const getTeamDocumentDetail = async (
  teamDocumentId: string
): Promise<TeamDocument | null> => {
  try {
    const response = await axiosInstance.get(`/dashboards/team/document/${teamDocumentId}`);
    // console.log('팀 문서 상세 조회', response);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

// * 팀 문서 수정 patch
export const patchTeamDocument = async (data: TeamDocument): Promise<string | null> => {
  try {
    console.log('수정할게요', data);
    const response = await axiosInstance.patch(
      `/dashboards/team/document/${data.teamDocumentId}`,
      data
    );
    console.log('수정된 팀문서', response.data);
    return response.data.data.teamDocumentId;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

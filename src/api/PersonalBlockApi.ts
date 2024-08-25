import { PersonalBlock } from '../types/PersonalBlock';
import { axiosInstance } from '../utils/apiConfig';

// 블록 생성 post
export const createPersonalBlock = async (data: PersonalBlock): Promise<number | null> => {
  try {
    const response = await axiosInstance.post('/blocks/', data);
    console.log(response.data);

    return response.data.data.blockId;
  } catch (error) {
    console.error('Error fetching data:', error);

    return null;
  }
};

// 블록 수정 patch
/*
! /blocks/뒤에 대시보드 id 들어가야 함 (지금은 임시로 1로 되어 있음)
*/
export const patchPersonalBlock = async (data: PersonalBlock): Promise<number | null> => {
  try {
    const response = await axiosInstance.patch('/blocks/1', data);
    console.log(response.data);

    return response.data.data.blockId;
  } catch (error) {
    console.error('Error fetching data:', error);

    return null;
  }
};

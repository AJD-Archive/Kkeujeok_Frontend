import axios from 'axios';
import { BlockListResDto, BlockOrder } from '../types/PersonalBlock';
import { axiosInstance } from '../utils/apiConfig';

// 블록 생성 post
export const createPersonalBlock = async (data: BlockListResDto): Promise<number | null> => {
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
export const patchPersonalBlock = async (
  blockId: string | undefined,
  data: BlockListResDto
): Promise<number | null> => {
  try {
    const response = await axiosInstance.patch(`/blocks/${blockId}`, data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

// 블록 확인 api
export const getPersonalBlock = async (blockId: string | null): Promise<BlockListResDto | null> => {
  try {
    const response = await axiosInstance.get(`/blocks/${blockId}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

//블록의 상태 수정
export const updatePersonalBlock = async (blockId?: string, progress?: string) => {
  try {
    const response = await axiosInstance.patch(`/blocks/${blockId}/progress?progress=${progress}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

//블록 순서 수정
export const updateOrderBlock = async (data: BlockOrder) => {
  try {
    const response = await axiosInstance.patch(`/blocks/change`, data);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log('Error fetching data:', error);
  }
};
//블록 삭제 조회
export const getDeleteBlock = async (dashboardId: string, page?: number, size?: number) => {
  try {
    const response = await axiosInstance.get(
      `/blocks/deleted?dashboardId=${dashboardId}&page=0&size=10`
    );
    console.log(response);
    return response.data.data;
  } catch (error) {
    console.log('Error fetching data:', error);
  }
};

export const deleteBlock = async (blockId: string) => {
  try {
    const response = await axiosInstance.delete(`/blocks/${blockId}`);

    console.log(response);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const realDeleteBlock = async (blockId: string) => {
  try {
    const response = await axiosInstance.delete(`/blocks/permanent/${blockId}`);
    console.log(response);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const restoreBlockFunc = async (blockId: string) => {
  try {
    const response = await axiosInstance.delete(`/blocks/${blockId}`);
    console.log(response);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

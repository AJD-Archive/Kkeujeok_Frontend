import { z } from 'zod';

import { pageInfoResponseSchema } from '@/schemas/commons';
import { blockProgressSchema, blockTypeSchema, dashboardTypeSchema } from '@/schemas/enums';

/**
 * 블록 생성 요청 스키마
 * - 백엔드 BlockSaveReqDto 기준
 */
export const blockCreateRequestSchema = z.object({
  dashboardId: z.number().nullable(),
  title: z.string(),
  contents: z.string().optional(),
  progress: blockProgressSchema,
  startDate: z.string().optional(),
  deadLine: z.string().optional(),
});

/**
 * 블록 수정 요청 스키마
 * - 백엔드 BlockUpdateReqDto 기준
 */
export const blockUpdateRequestSchema = z.object({
  title: z.string().optional(),
  contents: z.string().optional(),
  startDate: z.string().optional(),
  deadLine: z.string().optional(),
});

/**
 * 블록 순서 변경 요청 스키마
 * - 백엔드 BlockSequenceUpdateReqDto 기준
 */
export const blockSequenceUpdateRequestSchema = z.object({
  dashboardId: z.number().nullable(),
  notStartedList: z.array(z.number()).optional(),
  inProgressList: z.array(z.number()).optional(),
  completedList: z.array(z.number()).optional(),
});

/**
 * 블록 아이템 스키마
 * - 백엔드 BlockInfoResDto 기준
 */
export const blockItemSchema = z.object({
  blockId: z.number().nullable(),
  title: z.string().nullable(),
  contents: z.string().nullable(),
  progress: blockProgressSchema.nullable(),
  type: blockTypeSchema.nullable(),
  dType: dashboardTypeSchema.nullable(),
  startDate: z.string().nullable(),
  deadLine: z.string().nullable(),
  nickname: z.string().nullable(),
  picture: z.string().nullable(),
  dDay: z.string().nullable(),
});

/**
 * 블록 목록 응답 스키마
 * - 백엔드 BlockListResDto 기준
 */
export const blockListResponseSchema = z.object({
  blockListResDto: z.array(blockItemSchema),
  pageInfoResDto: pageInfoResponseSchema,
});

/** 블록 생성 요청 타입 */
export type BlockCreateRequest = z.infer<typeof blockCreateRequestSchema>;
/** 블록 수정 요청 타입 */
export type BlockUpdateRequest = z.infer<typeof blockUpdateRequestSchema>;
/** 블록 순서 변경 요청 타입 */
export type BlockSequenceUpdateRequest = z.infer<typeof blockSequenceUpdateRequestSchema>;
/** 블록 아이템 타입 */
export type BlockItem = z.infer<typeof blockItemSchema>;
/** 블록 목록 응답 타입 */
export type BlockListResponse = z.infer<typeof blockListResponseSchema>;

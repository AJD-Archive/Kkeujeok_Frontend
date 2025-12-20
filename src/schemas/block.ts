import { z } from 'zod';

import { pageInfoResponseSchema } from '@/schemas/commons';
import { blockProgressSchema, blockTypeSchema, dashboardTypeSchema } from '@/schemas/enums';

/** 블록 아이템 스키마 */
export const blockItemSchema = z.object({
  blockId: z.number(),
  title: z.string(),
  contents: z.string(),
  progress: blockProgressSchema,
  type: blockTypeSchema,
  dType: dashboardTypeSchema,
  startDate: z.string().nullable(),
  deadLine: z.string(),
  nickname: z.string(),
  picture: z.string().url(),
  dDay: z.string(),
});

/** 블록 목록 응답 스키마 */
export const blockListResponseSchema = z.object({
  blockListResDto: z.array(blockItemSchema),
  pageInfoResDto: pageInfoResponseSchema,
});

/** 블록 순서 변경 요청 스키마 */
export const blockOrderRequestSchema = z.object({
  dashboardId: z.number(),
  notStartedList: z.array(z.number()),
  inProgressList: z.array(z.number()),
  completedList: z.array(z.number()),
});

/** 블록 아이템 타입 */
export type BlockItem = z.infer<typeof blockItemSchema>;
/** 블록 목록 응답 타입 */
export type BlockListResponse = z.infer<typeof blockListResponseSchema>;
/** 블록 순서 변경 요청 타입 */
export type BlockOrderRequest = z.infer<typeof blockOrderRequestSchema>;

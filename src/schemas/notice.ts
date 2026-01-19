import { z } from 'zod';

/**
 * 공지사항 아이템 스키마
 * - 백엔드 NoticeInfoResDto 기준
 */
export const noticeItemSchema = z.object({
  id: z.number().nullable(),
  version: z.string().nullable(),
  title: z.string().nullable(),
  content: z.string().nullable(),
  createdAt: z.string(),
});

/**
 * 공지사항 목록 응답 스키마
 * - 백엔드 NoticeListResDto 기준
 */
export const noticeListResponseSchema = z.object({
  noticeListResDto: z.array(noticeItemSchema),
});

/** 공지사항 아이템 타입 */
export type NoticeItem = z.infer<typeof noticeItemSchema>;
/** 공지사항 목록 응답 타입 */
export type NoticeListResponse = z.infer<typeof noticeListResponseSchema>;

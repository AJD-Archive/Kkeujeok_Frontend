import { z } from 'zod';

/**
 * 공지사항 아이템 스키마
 * - content: DTO 코드(@NotNull 부재)를 근거로 nullable 처리
 */
export const noticeItemSchema = z.object({
  id: z.number(),
  version: z.string(),
  title: z.string(),
  content: z.string().nullable(),
  createdAt: z.string(),
});

/**
 * 공지사항 목록 응답 스키마
 */
export const noticeListResponseSchema = z.object({
  noticeListResDto: z.array(noticeItemSchema),
});

/** 공지사항 아이템 타입 */
export type NoticeItem = z.infer<typeof noticeItemSchema>;
/** 공지사항 목록 응답 타입 */
export type NoticeListResponse = z.infer<typeof noticeListResponseSchema>;

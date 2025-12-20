import { z } from 'zod';

import { pageInfoResponseSchema } from '@/schemas/commons';
import { notificationTypeSchema } from '@/schemas/enums';

/** 알림 항목 스키마 */
export const notificationItemSchema = z.object({
  id: z.number(),
  message: z.string(),
  isRead: z.boolean(),
});

/** 알림 목록 응답 스키마 */
export const notificationListResponseSchema = z.object({
  notificationInfoResDto: z.array(notificationItemSchema),
  pageInfoResDto: pageInfoResponseSchema.optional(),
});

/** SSE 알림 스키마 */
export const sseNotificationSchema = z.object({
  notificationId: z.number(),
  type: notificationTypeSchema,
  message: z.string(),
  relatedId: z.number(),
  createdAt: z.string(),
  isRead: z.boolean(),
});

/** 알림 항목 타입 */
export type NotificationItem = z.infer<typeof notificationItemSchema>;
/** 알림 목록 응답 타입 */
export type NotificationListResponse = z.infer<typeof notificationListResponseSchema>;
/** SSE 알림 타입 */
export type SseNotification = z.infer<typeof sseNotificationSchema>;

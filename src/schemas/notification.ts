import { z } from 'zod';

/**
 * 알림 항목 스키마
 * 백엔드 NotificationInfoResDto 기준
 */
export const notificationItemSchema = z.object({
  id: z.number(),
  message: z.string(),
  isRead: z.boolean().nullable(),
});

/**
 * 알림 목록 데이터 스키마 (data 필드 내부 구조)
 * 백엔드 NotificationListResDto 기준
 */
export const notificationListDataSchema = z.object({
  notificationInfoResDto: z.array(notificationItemSchema),
});

/**
 * SSE 이벤트 타입 스키마
 */
export const sseEventTypeSchema = z.literal('message');

/**
 * SSE 알림 이벤트 스키마
 */
export const sseNotificationSchema = z.object({
  id: z.string(),
  type: sseEventTypeSchema,
  data: z.string(),
});

/** 알림 항목 타입 */
export type NotificationItem = z.infer<typeof notificationItemSchema>;
/** 알림 목록 데이터 타입 (data 필드 내부) */
export type NotificationListData = z.infer<typeof notificationListDataSchema>;
/** SSE 이벤트 타입 */
export type SseEventType = z.infer<typeof sseEventTypeSchema>;
/** SSE 알림 이벤트 타입 */
export type SseNotification = z.infer<typeof sseNotificationSchema>;

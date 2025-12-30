import { z } from 'zod';

import { apiSuccessResponseSchema } from './commons';

/**
 * 알림 항목 스키마
 * 백엔드 NotificationInfoResDto 기준
 * @see backend-docs/notification-api-schema.md#1-notificationinforesDTO-알림-정보-응답
 */
export const notificationItemSchema = z.object({
  id: z.number(),
  message: z.string(),
  isRead: z.boolean(),
});

/**
 * 알림 목록 데이터 스키마 (data 필드 내부 구조)
 * 백엔드 NotificationListResDto 기준
 * @see backend-docs/notification-api-schema.md#2-notificationlistresDTO-알림-목록-응답
 */
export const notificationListDataSchema = z.object({
  notificationInfoResDto: z.array(notificationItemSchema),
});

/**
 * 알림 목록 응답 스키마 (전체 API 응답 구조)
 * ApiResponse<NotificationListResDto> 래퍼 포함
 * @see backend-docs/notification-api-schema.md#2-알림-전체-조회-api
 *
 * 실제 API 응답 구조:
 * {
 *   "statusCode": 200,
 *   "message": "알림 조회 성공",
 *   "data": {
 *     "notificationInfoResDto": [...]
 *   }
 * }
 */
export const notificationListResponseSchema = apiSuccessResponseSchema(notificationListDataSchema);

/**
 * SSE 알림 스키마
 * 백엔드 SSE 스트림 응답 기준 (엔드포인트: /api/notifications/stream)
 * @see backend-docs/notification-api-schema.md#1-알림-스트림-등록-api-sse
 *
 * 주의: SSE는 ApiResponse 래퍼 없이 NotificationInfoResDto를 직접 전송
 * SSE 이벤트 형식:
 * event: notification
 * data: {"id": 1, "message": "새 알림이 도착했습니다", "isRead": false}
 */
export const sseNotificationSchema = z.object({
  id: z.number(),
  message: z.string(),
  isRead: z.boolean(),
});

/** 알림 항목 타입 */
export type NotificationItem = z.infer<typeof notificationItemSchema>;
/** 알림 목록 데이터 타입 (data 필드 내부) */
export type NotificationListData = z.infer<typeof notificationListDataSchema>;
/** 알림 목록 응답 타입 (전체 API 응답) */
export type NotificationListResponse = z.infer<typeof notificationListResponseSchema>;
/** SSE 알림 타입 */
export type SseNotification = z.infer<typeof sseNotificationSchema>;

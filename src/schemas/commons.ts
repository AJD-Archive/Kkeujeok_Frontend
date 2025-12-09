import { z } from 'zod';

/**
 * 페이지 정보 응답 스키마
 *
 * 페이징된 API 응답에서 페이지네이션 메타데이터를 나타냅니다.
 *
 * @property currentPage - 현재 페이지 번호 (0부터 시작)
 * @property totalPages - 전체 페이지 수
 * @property totalItems - 전체 아이템 수
 */
export const pageInfoResponseSchema = z.object({
  currentPage: z.number(),
  totalPages: z.number(),
  totalItems: z.number(),
});

/**
 * API 성공 응답 스키마
 *
 * API 성공 응답(200, 201 등)을 Zod 스키마로 생성합니다.
 * data 필드는 제네릭 형태이며 nullable입니다.
 *
 * @property statusCode - HTTP 상태 코드
 * @property message - 응답 메시지
 * @property data - 실제 응답 데이터 (nullable)
 *
 * @template T - 응답 데이터의 Zod 스키마 타입
 * @param dataSchema - 성공 응답의 data 필드에 해당하는 Zod 스키마
 * @returns 성공 응답을 나타내는 Zod 스키마
 */
export const apiSuccessResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    statusCode: z.number(),
    message: z.string(),
    data: dataSchema.nullable(),
  });

/**
 * API 에러 응답 스키마
 *
 * 400, 404 등 비즈니스 에러 시 사용되며,
 * data 필드가 존재하지 않습니다.
 *
 * @property statusCode - HTTP 상태 코드
 * @property message - 에러 메시지
 */
export const apiErrorResponseSchema = z.object({
  statusCode: z.number(),
  message: z.string(),
});

/**
 * API 통합 응답 스키마
 *
 * 성공 응답과 에러 응답을 모두 처리할 수 있는 union 스키마입니다.
 *
 * @template T - 성공 응답 데이터의 Zod 스키마 타입
 * @param dataSchema - 성공 응답의 data 필드에 해당하는 Zod 스키마
 * @returns 성공 또는 에러 응답을 나타내는 Zod union 스키마
 */
export const apiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.union([apiSuccessResponseSchema(dataSchema), apiErrorResponseSchema]);

/** 페이지 정보 응답 타입 */
export type PageInfoResponse = z.infer<typeof pageInfoResponseSchema>;

/**
 * API 성공 응답 타입(제네릭)
 *
 * API 요청 성공 시 반환되는 응답 구조입니다.
 */
export type ApiSuccessResponse<T> = {
  statusCode: number;
  message: string;
  data: T | null;
};

/**
 * API 에러 응답 타입
 *
 * 서버에서 비즈니스 에러 또는 처리 실패 시 반환하는 응답 타입입니다.
 */
export type ApiErrorResponse = z.infer<typeof apiErrorResponseSchema>;

/**
 * API 통합 응답 타입 (제네릭)
 *
 * 성공 응답 또는 에러 응답일 수 있는 통합 타입입니다.
 */
export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

/**
 * API 성공 여부 타입 가드
 *
 * @template T - 성공 응답의 data 타입
 * @param response - API 응답 객체
 * @returns 성공 응답이면 true, 타입이 ApiSuccessResponse<T>로 좁혀집니다.
 */
export function isApiSuccess<T>(response: ApiResponse<T>): response is ApiSuccessResponse<T> {
  return 'data' in response;
}

/**
 * API 에러 여부 타입 가드
 *
 * @template T - 성공 응답의 data 타입
 * @param response - API 응답 객체
 * @returns 에러 응답이면 true, 타입이 ApiErrorResponse로 좁혀집니다.
 */
export function isApiError<T>(response: ApiResponse<T>): response is ApiErrorResponse {
  return !('data' in response);
}

import { z } from 'zod';

/**
 * 페이지 정보 응답 스키마
 */
export const pageInfoResponseSchema = z.object({
  currentPage: z.number(),
  totalPages: z.number(),
  totalItems: z.number(),
});

/**
 * nullable 페이지네이션 메타데이터 스키마
 */
export const nullablePageInfoResponseSchema = pageInfoResponseSchema.nullable();

/**
 * API 성공 응답 스키마 (data 있음)
 *
 * GET, POST 등 데이터를 반환하는 API에서 사용
 */
export const apiSuccessResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    statusCode: z.number(),
    message: z.string(),
    data: dataSchema.nullable(),
  });

/**
 * API 성공 응답 스키마 (data 없음)
 *
 * DELETE, 일부 PATCH 등 데이터 없이 성공만 반환하는 API에서 사용
 */
export const apiSuccessResponseWithoutDataSchema = z.object({
  statusCode: z.number(),
  message: z.string(),
});

/**
 * API 에러 응답 스키마
 *
 * 400, 404, 500 등 에러 시 반환
 */
export const apiErrorResponseSchema = z.object({
  statusCode: z.number(),
  message: z.string(),
});

/**
 * API 통합 응답 스키마 (data 있는 API용)
 */
export const apiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.union([apiSuccessResponseSchema(dataSchema), apiErrorResponseSchema]);

/**
 * API 통합 응답 스키마 (data 없는 API용)
 *
 * 성공/에러 모두 같은 구조이므로 단일 스키마 사용
 * statusCode로 성공/에러 구분
 */
export const apiResponseWithoutDataSchema = z.object({
  statusCode: z.number(),
  message: z.string(),
});

/** API 성공 응답 타입 (data 있음) - 제네릭 함수 스키마이므로 수동 정의 */
export type ApiSuccessResponse<T> = {
  statusCode: number;
  message: string;
  data: T | null;
};

/** 페이지 정보 응답 타입 */
export type PageInfoResponse = z.infer<typeof pageInfoResponseSchema>;
/** API 성공 응답 타입 (data 없음) */
export type ApiSuccessResponseWithoutData = z.infer<typeof apiSuccessResponseWithoutDataSchema>;
/** API 에러 응답 타입 */
export type ApiErrorResponse = z.infer<typeof apiErrorResponseSchema>;
/** API 통합 응답 타입 (data 있음) */
export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
/** API 통합 응답 타입 (data 없음) */
export type ApiResponseWithoutData = z.infer<typeof apiResponseWithoutDataSchema>;

/**
 * API 성공 여부 타입 가드 (data 있는 API용)
 *
 * 'data' 필드 존재 여부로 판단
 * GET, POST 등 데이터를 반환하는 API에서 사용
 */
export function isApiSuccess<T>(response: ApiResponse<T>): response is ApiSuccessResponse<T> {
  return 'data' in response;
}

/**
 * API 성공 여부 타입 가드 (data 없는 API용)
 *
 * statusCode 200~299면 성공으로 판단
 * DELETE, 일부 PATCH 등에서 사용
 */
export function isApiSuccessWithoutData(response: ApiResponseWithoutData): response is ApiSuccessResponseWithoutData {
  return response.statusCode >= 200 && response.statusCode < 300;
}

/**
 * API 에러 여부 타입 가드
 *
 * statusCode 400 이상이면 에러로 판단
 * data 있는 API, 없는 API 모두에서 사용 가능
 */
export function isApiError<T>(response: ApiResponse<T> | ApiResponseWithoutData): response is ApiErrorResponse {
  return response.statusCode >= 400;
}

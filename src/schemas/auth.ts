import { z } from 'zod';

import { socialTypeSchema } from '@/schemas/enums';

/** OAuth2 콜백 Path Parameter 스키마 */
export const oauth2CallbackPathParamsSchema = z.object({
  provider: socialTypeSchema,
});

/** OAuth2 콜백 Query Parameter 스키마 */
export const oauth2CallbackQueryParamsSchema = z.object({
  code: z.string().min(1, 'OAuth2 인증 코드는 필수입니다'),
});

/** OAuth2 토큰 발급 요청 스키마 */
export const tokenRequestSchema = z.object({
  authCode: z.string().min(1, 'OAuth2 인증 코드는 필수입니다'),
});

/** Access Token 갱신 요청 스키마 */
export const refreshTokenRequestSchema = z.object({
  refreshToken: z.string().min(1, '리프레시 토큰은 필수입니다'),
});

/** IdToken 응답 스키마
 *
 * 백엔드는 `JsonNode` 타입으로 정의되어 있으나,
 * 실제 API 응답은 `JWT 문자열`로 반환됨 (JSON 객체 아님)
 */
export const idTokenResponseSchema = z.object({
  idToken: z.string(),
});

/** OAuth2 토큰 응답 스키마 (Access Token + Refresh Token) */
export const tokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

/** OAuth2 콜백 Path Parameter 타입 */
export type OAuth2CallbackPathParams = z.infer<typeof oauth2CallbackPathParamsSchema>;
/** OAuth2 콜백 Query Parameter 타입 */
export type OAuth2CallbackQueryParams = z.infer<typeof oauth2CallbackQueryParamsSchema>;
/** 토큰 발급 요청 타입 */
export type TokenRequest = z.infer<typeof tokenRequestSchema>;
/** 리프레시 토큰 요청 타입 */
export type RefreshTokenRequest = z.infer<typeof refreshTokenRequestSchema>;
/** IdToken 응답 타입 */
export type IdTokenResponse = z.infer<typeof idTokenResponseSchema>;
/** 토큰 응답 타입 */
export type Token = z.infer<typeof tokenSchema>;

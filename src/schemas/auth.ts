import { z } from 'zod';

import { socialTypeSchema } from '@/schemas/enums';

/** OAuth2 콜백 Path Parameter 스키마 */
export const oauth2CallbackPathParamsSchema = z.object({
  provider: socialTypeSchema,
});

/** OAuth2 콜백 Query Parameter 스키마 */
export const oauth2CallbackQueryParamsSchema = z.object({
  code: z.string().min(1, 'OAuth 인증 코드는 필수입니다'),
});

/** 토큰 발급 요청 스키마 */
export const tokenRequestSchema = z.object({
  authCode: z.string().min(1, '인증 코드는 필수입니다'),
});

/** 리프레시 토큰 요청 스키마 */
export const refreshTokenRequestSchema = z.object({
  refreshToken: z.string().min(1, '리프레시 토큰은 필수입니다'),
});

/** IdToken 응답 스키마 */
export const idTokenResponseSchema = z.object({
  idToken: z.string(),
});

/** 토큰 응답 스키마 */
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

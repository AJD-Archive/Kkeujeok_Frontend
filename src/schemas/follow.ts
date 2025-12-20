import { z } from 'zod';

import { pageInfoResponseSchema } from '@/schemas/commons';
import { followInfoSchema } from '@/schemas/user';

/** 팔로우 목록 응답 스키마 */
export const followListResponseSchema = z.object({
  followInfoResDto: z.array(followInfoSchema),
  pageInfoResDto: pageInfoResponseSchema,
});

/** 추천 팔로우 목록 응답 스키마 */
export const recommendedFollowListResponseSchema = z.object({
  recommendedFollowInfoResDtos: z.array(followInfoSchema),
  pageInfoResDto: pageInfoResponseSchema,
});

/**
 * 팔로우 검색 응답 스키마
 */
export const followSearchResponseSchema = z.object({
  memberInfoForFollowResDtos: z.array(followInfoSchema),
  pageInfoResDto: pageInfoResponseSchema,
});

/** 팔로우 목록 응답 타입 */
export type FollowListResponse = z.infer<typeof followListResponseSchema>;
/** 추천 팔로우 목록 응답 타입 */
export type RecommendedFollowListResponse = z.infer<typeof recommendedFollowListResponseSchema>;
/** 팔로우 검색 응답 타입 */
export type FollowSearchResponse = z.infer<typeof followSearchResponseSchema>;

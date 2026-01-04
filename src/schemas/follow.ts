import { z } from 'zod';

import { pageInfoResponseSchema } from '@/schemas/commons';

/**
 * 팔로우 정보 스키마
 * 백엔드 FollowInfoResDto 기준
 */
export const followInfoSchema = z.object({
  memberId: z.number(),
  nickname: z.string().nullable(),
  name: z.string(),
  profileImage: z.string().nullable(),
  isFollow: z.boolean(),
});

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

/** 팔로우 정보 타입 */
export type FollowInfo = z.infer<typeof followInfoSchema>;
/** 팔로우 목록 응답 타입 */
export type FollowListResponse = z.infer<typeof followListResponseSchema>;
/** 추천 팔로우 목록 응답 타입 */
export type RecommendedFollowListResponse = z.infer<typeof recommendedFollowListResponseSchema>;
/** 팔로우 검색 응답 타입 */
export type FollowSearchResponse = z.infer<typeof followSearchResponseSchema>;

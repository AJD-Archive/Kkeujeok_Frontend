import { z } from 'zod';

import { pageInfoResponseSchema } from '@/schemas/commons';

/** 팔로우 요청 스키마 */
export const followRequestSchema = z.object({
  memberId: z.number(),
});

/** 팔로우 응답 스키마 */
export const followResponseSchema = z.object({
  toMemberId: z.number(),
});

/**
 * 팔로우 정보 스키마
 * - nickname: DTO 코드(@NotNull 부재)를 근거로 nullable 처리
 * - profileImage: DTO 코드(@NotNull 부재)를 근거로 nullable 처리
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

/**
 * 내 팔로우 수 응답 스키마
 * - myFollowsCount: DTO 코드(@NotNull 부재)를 근거로 nullable 처리
 */
export const myFollowsResponseSchema = z.object({
  myFollowsCount: z.number().nullable(),
});

/**
 * 추천 팔로우 정보 스키마
 * - nickname: DTO 코드(@NotNull 부재)를 근거로 nullable 처리
 * - profileImage: DTO 코드(@NotNull 부재)를 근거로 nullable 처리
 */
export const recommendedFollowInfoSchema = z.object({
  memberId: z.number(),
  nickname: z.string().nullable(),
  name: z.string(),
  profileImage: z.string().nullable(),
  isFollow: z.boolean(),
});

/** 추천 팔로우 목록 응답 스키마 */
export const recommendedFollowListResponseSchema = z.object({
  recommendedFollowInfoResDtos: z.array(recommendedFollowInfoSchema),
  pageInfoResDto: pageInfoResponseSchema,
});

/**
 * 회원 검색 정보 스키마
 * - nickname: DTO 코드(@NotNull 부재)를 근거로 nullable 처리
 * - profileImage: DTO 코드(@NotNull 부재)를 근거로 nullable 처리
 */
export const memberInfoForFollowSchema = z.object({
  memberId: z.number(),
  nickname: z.string().nullable(),
  name: z.string(),
  profileImage: z.string().nullable(),
  isFollow: z.boolean(),
});

/** 회원 검색 응답 스키마 */
export const followSearchResponseSchema = z.object({
  memberInfoForFollowResDtos: z.array(memberInfoForFollowSchema),
  pageInfoResDto: pageInfoResponseSchema,
});

/** 팔로우 요청 타입 */
export type FollowRequest = z.infer<typeof followRequestSchema>;
/** 팔로우 응답 타입 */
export type FollowResponse = z.infer<typeof followResponseSchema>;
/** 팔로우 정보 타입 */
export type FollowInfo = z.infer<typeof followInfoSchema>;
/** 팔로우 목록 응답 타입 */
export type FollowListResponse = z.infer<typeof followListResponseSchema>;
/** 내 팔로우 수 응답 타입 */
export type MyFollowsResponse = z.infer<typeof myFollowsResponseSchema>;
/** 추천 팔로우 정보 타입 */
export type RecommendedFollowInfo = z.infer<typeof recommendedFollowInfoSchema>;
/** 추천 팔로우 목록 응답 타입 */
export type RecommendedFollowListResponse = z.infer<typeof recommendedFollowListResponseSchema>;
/** 회원 검색 정보 타입 */
export type MemberInfoForFollow = z.infer<typeof memberInfoForFollowSchema>;
/** 회원 검색 응답 타입 */
export type FollowSearchResponse = z.infer<typeof followSearchResponseSchema>;

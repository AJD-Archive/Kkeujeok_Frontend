import { z } from 'zod';

import { challengeDetailSchema } from '@/schemas/challenge';
import { nullablePageInfoResponseSchema } from '@/schemas/commons';
import { personalDashboardItemSchema, teamDashboardItemSchema } from '@/schemas/dashboard';
import { socialTypeSchema } from '@/schemas/enums';

/**
 * 사용자 프로필 스키마
 * - nickName: DTO 코드(@NotNull 부재)를 근거로 nullable 처리
 * - picture: DTO 코드(@NotNull 부재)를 근거로 nullable 처리
 * - introduction: DTO 코드(@NotNull 부재)를 근거로 nullable 처리
 * - tag: DTO 코드(@NotNull 부재)를 근거로 nullable 처리
 */
export const userProfileSchema = z.object({
  memberId: z.number(),
  email: z.string(),
  name: z.string(),
  nickName: z.string().nullable(),
  picture: z.string().nullable(),
  introduction: z.string().nullable(),
  socialType: socialTypeSchema,
  tag: z.string().nullable(),
});

/**
 * 마이페이지 수정 요청 스키마
 * 백엔드 MyPageUpdateReqDto 기준
 */
export const mypageUpdateRequestSchema = z.object({
  nickname: z.string().optional(),
  introduction: z.string().optional(),
});

/**
 * 개인 대시보드 페이지 리스트 스키마
 * 백엔드 PersonalDashboardPageListResDto 기준
 */
export const personalDashboardPageListSchema = z.object({
  personalDashboardInfoResDto: z.array(personalDashboardItemSchema),
  pageInfoResDto: nullablePageInfoResponseSchema,
});

/** 챌린지 리스트 스키마 */
export const challengeListSchema = z.object({
  challengeInfoResDto: z.array(challengeDetailSchema),
  pageInfoResDto: nullablePageInfoResponseSchema,
});

/** 팀 대시보드 리스트 스키마 */
export const teamDashboardListSchema = z.object({
  teamDashboardInfoResDto: z.array(teamDashboardItemSchema),
  pageInfoResDto: nullablePageInfoResponseSchema,
});

/**
 * 마이페이지 대시보드 및 챌린지 응답 스키마
 * 백엔드 TeamDashboardsAndChallengesResDto 기준 (내 마이페이지용)
 */
export const mypageDashboardChallengesResponseSchema = z.object({
  personalDashboardList: personalDashboardPageListSchema,
  teamDashboardList: teamDashboardListSchema,
  challengeList: challengeListSchema,
});

/**
 * 친구 대시보드 및 챌린지 응답 스키마
 * 백엔드 PersonalDashboardsAndChallengesResDto 기준 (친구 마이페이지용)
 * 친구 조회 시 팀 대시보드는 제외됨
 */
export const friendDashboardChallengesResponseSchema = z.object({
  personalDashboardList: personalDashboardPageListSchema,
  challengeList: challengeListSchema,
});

/** 사용자 프로필 타입 */
export type UserProfile = z.infer<typeof userProfileSchema>;
/** 마이페이지 수정 요청 타입 */
export type MypageUpdateRequest = z.infer<typeof mypageUpdateRequestSchema>;
/** 개인 대시보드 페이지 리스트 타입 */
export type PersonalDashboardPageList = z.infer<typeof personalDashboardPageListSchema>;
/** 챌린지 리스트 타입 */
export type ChallengeList = z.infer<typeof challengeListSchema>;
/** 팀 대시보드 리스트 타입 */
export type TeamDashboardList = z.infer<typeof teamDashboardListSchema>;
/** 마이페이지 대시보드 및 챌린지 응답 타입 */
export type MypageDashboardChallengesResponse = z.infer<typeof mypageDashboardChallengesResponseSchema>;
/** 친구 대시보드 및 챌린지 응답 타입 */
export type FriendDashboardChallengesResponse = z.infer<typeof friendDashboardChallengesResponseSchema>;

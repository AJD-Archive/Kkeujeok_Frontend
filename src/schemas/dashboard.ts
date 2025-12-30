import { z } from 'zod';

import { nullablePageInfoResponseSchema } from '@/schemas/commons';
import { socialTypeSchema } from '@/schemas/enums';

/**
 * 개인 대시보드 아이템 스키마
 * 백엔드 PersonalDashboardInfoResDto 기준
 */
export const personalDashboardItemSchema = z.object({
  dashboardId: z.number(),
  myId: z.number(),
  creatorId: z.number(),
  title: z.string(),
  description: z.string(),
  isPublic: z.boolean(),
  category: z.string().nullable(),
  blockProgress: z.number(),
});

/** 개인 대시보드 목록 응답 스키마 */
export const personalDashboardListResponseSchema = z.object({
  personalDashboardListResDto: z.array(personalDashboardItemSchema),
});

/**
 * 개인 대시보드 카테고리 응답 스키마
 * 백엔드 PersonalDashboardCategoriesResDto 기준 (Set -> Array)
 */
export const personalDashboardCategoriesResponseSchema = z.object({
  categories: z.array(z.string()),
});

/**
 * 팀 멤버 스키마 (JoinMemberInfoResDto 기준)
 * 백엔드 기준 nullable 필드 수정됨
 */
export const teamMemberSchema = z.object({
  id: z.number(),
  picture: z.string().nullable(),
  email: z.string().email(),
  name: z.string(),
  nickName: z.string(),
  socialType: socialTypeSchema,
  introduction: z.string().nullable(),
});

/**
 * 팀 대시보드 아이템 스키마
 * 백엔드 TeamDashboardInfoResDto 기준
 * 주의: myId, creatorId는 필수 필드
 */
export const teamDashboardItemSchema = z.object({
  dashboardId: z.number(),
  myId: z.number(),
  creatorId: z.number(),
  title: z.string(),
  description: z.string(),
  blockProgress: z.number(),
  joinMembers: z.array(teamMemberSchema).nullable(),
});

/** 팀 대시보드 목록 응답 스키마 */
export const teamDashboardListResponseSchema = z.object({
  teamDashboardInfoResDto: z.array(teamDashboardItemSchema),
  pageInfoResDto: nullablePageInfoResponseSchema,
});

/** 개인 대시보드 아이템 타입 */
export type PersonalDashboardItem = z.infer<typeof personalDashboardItemSchema>;
/** 개인 대시보드 목록 응답 타입 */
export type PersonalDashboardListResponse = z.infer<typeof personalDashboardListResponseSchema>;
/** 개인 대시보드 카테고리 응답 타입 */
export type PersonalDashboardCategoriesResponse = z.infer<typeof personalDashboardCategoriesResponseSchema>;
/** 팀 멤버 타입 */
export type TeamMember = z.infer<typeof teamMemberSchema>;
/** 팀 대시보드 아이템 타입 */
export type TeamDashboardItem = z.infer<typeof teamDashboardItemSchema>;
/** 팀 대시보드 목록 응답 타입 */
export type TeamDashboardListResponse = z.infer<typeof teamDashboardListResponseSchema>;

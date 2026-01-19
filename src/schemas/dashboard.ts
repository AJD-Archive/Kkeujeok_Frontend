import { z } from 'zod';

import { nullablePageInfoResponseSchema } from '@/schemas/commons';
import { socialTypeSchema } from '@/schemas/enums';

/**
 * 개인 대시보드 생성 요청 스키마
 * - 백엔드 PersonalDashboardSaveReqDto 기준
 */
export const personalDashboardCreateRequestSchema = z.object({
  title: z.string(),
  description: z.string(),
  isPublic: z.boolean(),
  category: z.string().optional(),
});

/**
 * 개인 대시보드 수정 요청 스키마
 * - 백엔드 PersonalDashboardUpdateReqDto 기준
 */
export const personalDashboardUpdateRequestSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  isPublic: z.boolean().optional(),
  category: z.string().optional(),
});

/**
 * 개인 대시보드 아이템 스키마
 * 백엔드 PersonalDashboardInfoResDto 기준
 */
export const personalDashboardItemSchema = z.object({
  dashboardId: z.number().nullable(),
  myId: z.number().nullable(),
  creatorId: z.number().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  isPublic: z.boolean().nullable(),
  category: z.string().nullable(),
  blockProgress: z.number().nullable(),
});

/** 개인 대시보드 목록 응답 스키마 */
export const personalDashboardListResponseSchema = z.object({
  personalDashboardListResDto: z.array(personalDashboardItemSchema),
});

/**
 * 개인 대시보드 카테고리 응답 스키마
 * - 백엔드 PersonalDashboardCategoriesResDto 기준 (Set -> Array 확인 필요)
 */
export const personalDashboardCategoriesResponseSchema = z.object({
  categories: z.array(z.string()),
});

/**
 * 팀 대시보드 생성 요청 스키마
 * - 백엔드 TeamDashboardSaveReqDto 기준
 */
export const teamDashboardCreateRequestSchema = z.object({
  title: z.string(),
  description: z.string(),
  invitedEmails: z.array(z.string()).optional(),
  invitedNicknamesAndTags: z.array(z.string()).optional(),
});

/**
 * 팀 대시보드 수정 요청 스키마
 * - 백엔드 TeamDashboardUpdateReqDto 기준
 */
export const teamDashboardUpdateRequestSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  invitedEmails: z.array(z.string()).optional(),
  invitedNicknamesAndTags: z.array(z.string()).optional(),
});

/**
 * 팀 멤버 스키마 (JoinMemberInfoResDto 기준)
 * - 백엔드 Member Entity 기준
 */
export const teamMemberSchema = z.object({
  id: z.number().nullable(),
  picture: z.string().nullable(),
  email: z.email().nullable(),
  name: z.string().nullable(),
  nickName: z.string().nullable(),
  socialType: socialTypeSchema.nullable(),
  introduction: z.string().nullable(),
});

/**
 * 팀 대시보드 아이템 스키마
 * - 백엔드 TeamDashboardInfoResDto 기준
 */
export const teamDashboardItemSchema = z.object({
  dashboardId: z.number().nullable(),
  myId: z.number().nullable(),
  creatorId: z.number().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  blockProgress: z.number().nullable(),
  joinMembers: z.array(teamMemberSchema).nullable(),
});

/**
 * 팀 대시보드 목록 응답 스키마
 * - 백엔드 TeamDashboardListResDto 기준
 */
export const teamDashboardListResponseSchema = z.object({
  teamDashboardInfoResDto: z.array(teamDashboardItemSchema),
  pageInfoResDto: nullablePageInfoResponseSchema,
});

/** 개인 대시보드 생성 요청 타입 */
export type PersonalDashboardCreateRequest = z.infer<typeof personalDashboardCreateRequestSchema>;
/** 개인 대시보드 수정 요청 타입 */
export type PersonalDashboardUpdateRequest = z.infer<typeof personalDashboardUpdateRequestSchema>;
/** 개인 대시보드 아이템 타입 */
export type PersonalDashboardItem = z.infer<typeof personalDashboardItemSchema>;
/** 개인 대시보드 목록 응답 타입 */
export type PersonalDashboardListResponse = z.infer<typeof personalDashboardListResponseSchema>;
/** 개인 대시보드 카테고리 응답 타입 */
export type PersonalDashboardCategoriesResponse = z.infer<typeof personalDashboardCategoriesResponseSchema>;
/** 팀 대시보드 생성 요청 타입 */
export type TeamDashboardCreateRequest = z.infer<typeof teamDashboardCreateRequestSchema>;
/** 팀 대시보드 수정 요청 타입 */
export type TeamDashboardUpdateRequest = z.infer<typeof teamDashboardUpdateRequestSchema>;
/** 팀 멤버 타입 */
export type TeamMember = z.infer<typeof teamMemberSchema>;
/** 팀 대시보드 아이템 타입 */
export type TeamDashboardItem = z.infer<typeof teamDashboardItemSchema>;
/** 팀 대시보드 목록 응답 타입 */
export type TeamDashboardListResponse = z.infer<typeof teamDashboardListResponseSchema>;

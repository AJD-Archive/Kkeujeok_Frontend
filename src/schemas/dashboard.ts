import { z } from 'zod';

import { nullablePageInfoResponseSchema } from '@/schemas/commons';
import { socialTypeSchema } from '@/schemas/enums';

/** 개인 대시보드 아이템 스키마 */
export const personalDashboardItemSchema = z.object({
  dashboardId: z.number(),
  myId: z.number(),
  creatorId: z.number(),
  title: z.string(),
  description: z.string(),
  isPublic: z.boolean(),
  category: z.string(),
  blockProgress: z.number(),
});

/** 개인 대시보드 목록 응답 스키마 */
export const personalDashboardListResponseSchema = z.object({
  personalDashboardListResDto: z.array(personalDashboardItemSchema),
});

/** 팀 멤버 스키마 */
export const teamMemberSchema = z.object({
  id: z.number(),
  picture: z.string().url(),
  email: z.string().email(),
  name: z.string(),
  nickName: z.string(),
  socialType: socialTypeSchema,
  introduction: z.string(),
});

/** 팀 대시보드 아이템 스키마 */
export const teamDashboardItemSchema = z.object({
  dashboardId: z.number(),
  myId: z.number().optional(),
  creatorId: z.number().optional(),
  title: z.string(),
  description: z.string(),
  blockProgress: z.number(),
  joinMembers: z.array(teamMemberSchema).nullable(),
  invitedEmails: z.array(z.string().email()).optional(),
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
/** 팀 멤버 타입 */
export type TeamMember = z.infer<typeof teamMemberSchema>;
/** 팀 대시보드 아이템 타입 */
export type TeamDashboardItem = z.infer<typeof teamDashboardItemSchema>;
/** 팀 대시보드 목록 응답 타입 */
export type TeamDashboardListResponse = z.infer<typeof teamDashboardListResponseSchema>;

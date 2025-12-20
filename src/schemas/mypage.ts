import { z } from 'zod';

import { challengeSummarySchema } from '@/schemas/challenge';
import { nullablePageInfoResponseSchema } from '@/schemas/commons';
import { personalDashboardItemSchema, teamDashboardItemSchema } from '@/schemas/dashboard';

/** 마이페이지 대시보드 및 챌린지 응답 스키마 */
export const mypageDashboardChallengesResponseSchema = z.object({
  personalDashboardList: z.object({
    personalDashboardListResDto: z.array(personalDashboardItemSchema),
    pageInfoResDto: nullablePageInfoResponseSchema,
  }),
  teamDashboardList: z.object({
    teamDashboardInfoResDto: z.array(teamDashboardItemSchema),
    pageInfoResDto: nullablePageInfoResponseSchema,
  }),
  challengeList: z.object({
    challengeInfoResDto: z.array(challengeSummarySchema),
    pageInfoResDto: nullablePageInfoResponseSchema,
  }),
});

/** 친구 대시보드 및 챌린지 응답 스키마 */
export const friendDashboardChallengesResponseSchema = z.object({
  personalDashboardList: z.object({
    personalDashboardListResDto: z.array(personalDashboardItemSchema),
    pageInfoResDto: nullablePageInfoResponseSchema,
  }),
  challengeList: z.object({
    challengeInfoResDto: z.array(challengeSummarySchema),
    pageInfoResDto: nullablePageInfoResponseSchema,
  }),
});

/** 마이페이지 대시보드 및 챌린지 응답 타입 */
export type MypageDashboardChallengesResponse = z.infer<typeof mypageDashboardChallengesResponseSchema>;
/** 친구 대시보드 및 챌린지 응답 타입 */
export type FriendDashboardChallengesResponse = z.infer<typeof friendDashboardChallengesResponseSchema>;

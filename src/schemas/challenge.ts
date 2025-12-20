import { z } from 'zod';

import { pageInfoResponseSchema } from '@/schemas/commons';
import { challengeCategorySchema, challengeCycleSchema, weekDaySchema } from '@/schemas/enums';

/** 챌린지 주기 상세 정보 스키마 */
export const cycleDetailsSchema = z.union([z.array(weekDaySchema), z.array(z.number())]);

/** 챌린지 요약 정보 스키마 */
export const challengeSummarySchema = z.object({
  challengeId: z.number(),
  title: z.string(),
  cycle: challengeCycleSchema,
  cycleDetails: cycleDetailsSchema,
  representImage: z.string().url().nullable(),
  createdAt: z.string(),
});

/** 챌린지 검색 응답 스키마 */
export const challengeSearchResponseSchema = z.object({
  challengeSummaries: z.array(challengeSummarySchema),
  pageInfoResDto: pageInfoResponseSchema,
});

/** 챌린지 완료 멤버 스키마 */
export const completedMemberSchema = z.object({
  memberId: z.number().optional(),
  profileImage: z.string().url().optional(),
  nickname: z.string().optional(),
  completedToday: z.boolean().optional(),
});

/** 챌린지 상세 정보 스키마 */
export const challengeDetailSchema = z.object({
  challengeId: z.number(),
  authorId: z.number(),
  title: z.string(),
  contents: z.string(),
  category: challengeCategorySchema,
  cycle: challengeCycleSchema,
  cycleDetails: cycleDetailsSchema,
  startDate: z.string(),
  endDate: z.string(),
  representImage: z.string().url().nullable(),
  authorName: z.string(),
  authorProfileImage: z.string().url(),
  blockName: z.string(),
  participantCount: z.number(),
  isParticipant: z.boolean(),
  isAuthor: z.boolean(),
  completedMembers: z.array(completedMemberSchema),
  createdAt: z.string(),
});

/** 챌린지 주기 상세 정보 타입 */
export type CycleDetails = z.infer<typeof cycleDetailsSchema>;
/** 챌린지 요약 정보 타입 */
export type ChallengeSummary = z.infer<typeof challengeSummarySchema>;
/** 챌린지 검색 응답 타입 */
export type ChallengeSearchResponse = z.infer<typeof challengeSearchResponseSchema>;
/** 챌린지 완료 멤버 타입 */
export type CompletedMember = z.infer<typeof completedMemberSchema>;
/** 챌린지 상세 정보 타입 */
export type ChallengeDetail = z.infer<typeof challengeDetailSchema>;

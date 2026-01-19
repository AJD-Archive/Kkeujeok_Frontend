import { z } from 'zod';

import { pageInfoResponseSchema } from '@/schemas/commons';
import { challengeCategorySchema, challengeCycleSchema, cycleDetailSchema } from '@/schemas/enums';

/**
 * 챌린지 생성 요청 스키마
 * - 백엔드 ChallengeSaveReqDto 기준
 */
export const challengeCreateRequestSchema = z.object({
  title: z.string(),
  contents: z.string(),
  category: challengeCategorySchema,
  cycle: challengeCycleSchema,
  cycleDetails: z.array(cycleDetailSchema),
  endDate: z.string(),
  blockName: z.string(),
});

/**
 * 챌린지 주기 상세 정보 스키마
 * - 백엔드에서 CycleDetail[] 형태로 반환
 */
export const cycleDetailsSchema = z.array(cycleDetailSchema);

/**
 * 챌린지 요약 정보 스키마
 * 백엔드 ChallengeSummary 기준
 */
export const challengeSummarySchema = z.object({
  challengeId: z.number().nullable(),
  title: z.string().nullable(),
  cycle: challengeCycleSchema.nullable(),
  cycleDetails: cycleDetailsSchema.nullable(),
  representImage: z.string().nullable(),
  createdAt: z.string(),
});

/** 챌린지 검색 응답 스키마 */
export const challengeSearchResponseSchema = z.object({
  challengeSummaries: z.array(challengeSummarySchema),
  pageInfoResDto: pageInfoResponseSchema,
});

/**
 * 챌린지 완료 멤버 스키마
 * 백엔드 ChallengeCompletedMemberInfoResDto 기준
 */
export const completedMemberSchema = z.object({
  memberId: z.number().nullable(),
  email: z.email().nullable(),
  picture: z.string().nullable(),
  nickname: z.string().nullable(),
});

/**
 * 챌린지 상세 정보 스키마
 * - 백엔드 ChallengeInfoResDto 기준
 * - authorId: 백엔드 Long 타입이지만 실제 API 테스트에서 null 반환 확인됨(재확인 필요)
 */
export const challengeDetailSchema = z.object({
  challengeId: z.number().nullable(),
  authorId: z.number().nullable(),
  title: z.string().nullable(),
  contents: z.string().nullable(),
  category: challengeCategorySchema.nullable(),
  cycle: challengeCycleSchema.nullable(),
  cycleDetails: cycleDetailsSchema.nullable(),
  startDate: z.string().nullable(),
  endDate: z.string().nullable(),
  representImage: z.string().nullable(),
  authorName: z.string().nullable(),
  authorProfileImage: z.string().nullable(),
  blockName: z.string().nullable(),
  participantCount: z.number().nullable(),
  isParticipant: z.boolean().nullable(),
  isAuthor: z.boolean().nullable(),
  completedMembers: z.array(completedMemberSchema).nullable(),
  createdAt: z.string(),
});

/** 챌린지 생성 요청 타입 */
export type ChallengeCreateRequest = z.infer<typeof challengeCreateRequestSchema>;
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

import { z } from 'zod';

/** 블록 진행 상태 스키마 */
export const blockProgressSchema = z.enum(['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED']);

/** 블록 타입 스키마 */
export const blockTypeSchema = z.enum(['BASIC', 'CHALLENGE']);

/** 대시보드 타입 스키마 */
export const dashboardTypeSchema = z.enum(['PersonalDashboard', 'TeamDashboard']);

/** 챌린지 주기 스키마 */
export const challengeCycleSchema = z.enum(['DAILY', 'WEEKLY', 'MONTHLY']);

/** 챌린지 카테고리 스키마 */
export const challengeCategorySchema = z.enum([
  'HEALTH_AND_FITNESS',
  'MENTAL_WELLNESS',
  'PRODUCTIVITY_AND_TIME_MANAGEMENT',
  'FINANCE_AND_ASSET_MANAGEMENT',
  'SELF_DEVELOPMENT',
  'LIFE_ORGANIZATION_AND_MANAGEMENT',
  'SOCIAL_CONNECTIONS',
  'CREATIVITY_AND_ARTS',
  'OTHERS',
]);

/** 요일 스키마 */
export const weekDaySchema = z.enum(['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']);

/**
 * 챌린지 주기 상세 스키마
 * - DAILY: 매일
 */
export const cycleDetailSchema = z.enum([
  'DAILY',
  'MON',
  'TUE',
  'WED',
  'THU',
  'FRI',
  'SAT',
  'SUN',
  'FIRST',
  'SECOND',
  'THIRD',
  'FOURTH',
  'FIFTH',
  'SIXTH',
  'SEVENTH',
  'EIGHTH',
  'NINTH',
  'TENTH',
  'ELEVENTH',
  'TWELFTH',
  'THIRTEENTH',
  'FOURTEENTH',
  'FIFTEENTH',
  'SIXTEENTH',
  'SEVENTEENTH',
  'EIGHTEENTH',
  'NINETEENTH',
  'TWENTIETH',
  'TWENTY_FIRST',
  'TWENTY_SECOND',
  'TWENTY_THIRD',
  'TWENTY_FOURTH',
  'TWENTY_FIFTH',
  'TWENTY_SIXTH',
  'TWENTY_SEVENTH',
  'TWENTY_EIGHTH',
  'TWENTY_NINTH',
  'THIRTIETH',
  'THIRTY_FIRST',
]);

/** 소셜 로그인 타입 스키마 */
export const socialTypeSchema = z.enum(['GOOGLE', 'KAKAO']);

/** OAuth2 Provider 스키마 */
export const oauthProviderSchema = z.enum(['google', 'kakao']);

/** 전역 상태 스키마 */
export const statusSchema = z.enum(['ACTIVE', 'UN_ACTIVE', 'DELETED']);

/** 블록 진행 상태 타입 */
export type BlockProgress = z.infer<typeof blockProgressSchema>;
/** 블록 타입 */
export type BlockType = z.infer<typeof blockTypeSchema>;
/** 대시보드 타입 */
export type DashboardType = z.infer<typeof dashboardTypeSchema>;
/** 챌린지 주기 타입 */
export type ChallengeCycle = z.infer<typeof challengeCycleSchema>;
/** 챌린지 카테고리 타입 */
export type ChallengeCategory = z.infer<typeof challengeCategorySchema>;
/** 요일 타입 */
export type WeekDay = z.infer<typeof weekDaySchema>;
/** 챌린지 주기 상세 타입 */
export type CycleDetail = z.infer<typeof cycleDetailSchema>;
/** 소셜 로그인 타입 */
export type SocialType = z.infer<typeof socialTypeSchema>;
/** OAuth2 Provider 타입 */
export type OAuthProvider = z.infer<typeof oauthProviderSchema>;
/** 전역 상태 타입 */
export type Status = z.infer<typeof statusSchema>;

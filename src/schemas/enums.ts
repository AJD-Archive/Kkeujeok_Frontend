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
  'PRODUCTIVITY',
  'FINANCE',
  'SELF_DEVELOPMENT',
  'LIFE_ORGANIZATION',
  'SOCIAL',
  'CREATIVITY',
  'OTHERS',
]);

/**
 * 요일 스키마
 */
export const weekDaySchema = z.enum(['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']);

/**
 * 소셜 로그인 타입 스키마
 */
export const socialTypeSchema = z.enum(['KAKAO', 'GOOGLE']);

/**
 * 알림 타입 스키마
 */
export const notificationTypeSchema = z.enum([
  'FRIEND_REQUEST',
  'TEAM_INVITATION',
  'CHALLENGE_UPDATE',
  'BLOCK_REMINDER',
]);

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
/** 소셜 로그인 타입 */
export type SocialType = z.infer<typeof socialTypeSchema>;
/** 알림 타입 */
export type NotificationType = z.infer<typeof notificationTypeSchema>;

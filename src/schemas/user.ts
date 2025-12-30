import { z } from 'zod';

import { socialTypeSchema } from '@/schemas/enums';

/**
 * 사용자 프로필 스키마
 * 백엔드 MyPageInfoResDto 기준 - nullable 필드 수정됨
 * 주의: nickName (camelCase N)
 */
export const userProfileSchema = z.object({
  memberId: z.number(),
  email: z.string().email(),
  name: z.string(),
  nickName: z.string().nullable(),
  picture: z.string().nullable(),
  introduction: z.string().nullable(),
  socialType: socialTypeSchema,
  tag: z.string().nullable(),
});

/**
 * 팔로우 정보 스키마
 * 백엔드 FollowInfoResDto 기준
 */
export const followInfoSchema = z.object({
  memberId: z.number(),
  nickname: z.string().nullable(),
  name: z.string(),
  profileImage: z.string().nullable(),
  isFollow: z.boolean(),
});

/** 사용자 프로필 타입 */
export type UserProfile = z.infer<typeof userProfileSchema>;
/** 팔로우 정보 타입 */
export type FollowInfo = z.infer<typeof followInfoSchema>;

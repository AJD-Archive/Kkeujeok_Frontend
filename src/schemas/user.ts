import { z } from 'zod';

import { socialTypeSchema } from '@/schemas/enums';

/** 사용자 프로필 스키마 */
export const userProfileSchema = z.object({
  memberId: z.number(),
  email: z.string().email(),
  name: z.string(),
  nickName: z.string(),
  picture: z.string().url(),
  introduction: z.string(),
  socialType: socialTypeSchema,
  tag: z.string(),
});

/** 팔로우 정보 스키마 */
export const followInfoSchema = z.object({
  memberId: z.number(),
  nickname: z.string(),
  name: z.string(),
  profileImage: z.string().url(),
  isFollow: z.boolean(),
});

/** 사용자 프로필 타입 */
export type UserProfile = z.infer<typeof userProfileSchema>;
/** 팔로우 정보 타입 */
export type FollowInfo = z.infer<typeof followInfoSchema>;

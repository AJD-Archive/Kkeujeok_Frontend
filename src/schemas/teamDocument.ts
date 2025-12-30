import { z } from 'zod';

import { pageInfoResponseSchema } from '@/schemas/commons';

/**
 * 팀 문서 아이템 스키마 (목록 조회용 - content 없음)
 * 백엔드 TeamDocumentResDto 기준
 */
export const teamDocumentItemSchema = z.object({
  teamDocumentId: z.number(),
  title: z.string(),
  category: z.string().nullable(),
  author: z.string(),
  picture: z.string().nullable(),
});

/**
 * 팀 문서 목록 응답 스키마
 * 백엔드 FindTeamDocumentResDto 기준
 */
export const teamDocumentListResponseSchema = z.object({
  teamDocuments: z.array(teamDocumentItemSchema),
  pageInfoResDto: pageInfoResponseSchema,
});

/**
 * 팀 문서 상세 스키마 (상세 조회용 - content 포함)
 * 백엔드 TeamDocumentDetailResDto 기준
 */
export const teamDocumentDetailSchema = z.object({
  teamDocumentId: z.number(),
  title: z.string(),
  category: z.string().nullable(),
  content: z.string(),
  author: z.string(),
  picture: z.string().nullable(),
});

/**
 * 팀 문서 카테고리 응답 스키마
 * 백엔드 TeamDocumentCategoriesResDto 기준
 */
export const teamDocumentCategoriesResponseSchema = z.object({
  categories: z.array(z.string()),
});

/** 팀 문서 아이템 타입 */
export type TeamDocumentItem = z.infer<typeof teamDocumentItemSchema>;
/** 팀 문서 목록 응답 타입 */
export type TeamDocumentListResponse = z.infer<typeof teamDocumentListResponseSchema>;
/** 팀 문서 상세 타입 */
export type TeamDocumentDetail = z.infer<typeof teamDocumentDetailSchema>;
/** 팀 문서 카테고리 응답 타입 */
export type TeamDocumentCategoriesResponse = z.infer<typeof teamDocumentCategoriesResponseSchema>;

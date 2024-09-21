import { atom } from 'jotai';

// 동기적으로 닉네임,자기소개를 관리하는 atom
export const nicknameAtom = atom<string | null>(null);
export const descriptionAtom = atom<string | null>(null);

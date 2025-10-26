import { atom } from 'jotai';

// 데이터를 다시 불러오는 트리거 상태를 관리할 atom
export const fetchTriggerAtom = atom(0);
export const navbarUpdateTriggerAtom = atom(false);

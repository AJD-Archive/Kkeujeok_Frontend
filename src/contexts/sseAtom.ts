import { atom } from 'jotai';
import { EventSourcePolyfill } from 'event-source-polyfill';

// Jotai atom 정의
export const sseConnectedAtom = atom(false); // SSE 연결 상태
export const sseMessagesAtom = atom<string[]>([]); // 수신된 알림 메시지
export const unreadCount = atom<number>(0); // 읽지 않은 알림 수
export const notifications = atom<string[]>([]); // 알림 목록 배열

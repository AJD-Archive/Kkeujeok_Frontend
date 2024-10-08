import { useEffect, useCallback, useRef } from 'react';
import { atom, useAtom } from 'jotai';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { notifications, unreadCount } from '../contexts/sseAtom';
import { customErrToast } from '../utils/customErrorToast';
import { NotificationResponse } from '../types/MyPage';
import { apiBaseUrl } from '../utils/apiConfig';
import { getAlarmList } from '../api/MyPageApi';
import { useQuery } from '@tanstack/react-query';

const sseConnectedAtom = atom(false); // SSE 연결 상태
const sseMessagesAtom = atom<string[]>([]); // SSE 메시지 상태

export const useSSE = () => {
  const [, setConnected] = useAtom(sseConnectedAtom);
  const [, setMessages] = useAtom(sseMessagesAtom);
  const [, setUnReadCount] = useAtom(unreadCount);

  const eventSource = useRef<EventSourcePolyfill | null>(null);
  // 재연결 타임아웃 관리
  const reconnectTimeout = useRef<NodeJS.Timeout | null>(null);

  // SSE 연결 설정 함수
  const connectToSSE = useCallback(() => {
    if (reconnectTimeout.current) {
      clearTimeout(reconnectTimeout.current);
    }

    // SSE 연결 설정
    eventSource.current = new EventSourcePolyfill(
      `${process.env.REACT_APP_API_BASE_URL}/notifications/stream`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          Connection: '',
          Accept: 'text/event-stream',
        },
        heartbeatTimeout: 86400000,
        withCredentials: true,
      }
    );

    // 메시지 수신 처리
    eventSource.current.onmessage = event => {
      console.log(event.data);
      if (!event.data.includes('연결')) {
        const modifiedMessage = event.data.replace(/^[^:]+: /, '').replace(/\d+$/, '');
        customErrToast(modifiedMessage);
        setUnReadCount(prev => prev + 1);
      }
    };

    // SSE 연결 성공
    eventSource.current.onopen = () => {
      console.log('SSE 스트림 연결 성공');
      setConnected(true); // 연결 상태 true로 업데이트
    };

    // SSE 에러 처리 및 재연결
    eventSource.current.onerror = error => {
      console.error('SSE 에러 발생:', error);
      eventSource.current?.close(); // 연결 종료
      setConnected(false); // 연결 상태 false로 업데이트

      // 재연결 로직: 3초 후에 다시 연결 시도
      reconnectTimeout.current = setTimeout(() => {
        console.log('SSE 재연결 시도 중...');
        connectToSSE();
      }, 3000); // 3초 후 재연결
    };
  }, [setConnected, setMessages]);

  useEffect(() => {
    // 첫 연결 시도
    connectToSSE();

    // 컴포넌트 언마운트 시 SSE 연결 종료
    return () => {
      eventSource.current?.close();
      if (reconnectTimeout.current) {
        clearTimeout(reconnectTimeout.current);
      }
    };
  }, [connectToSSE]);
};

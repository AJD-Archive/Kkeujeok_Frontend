import { useEffect, useCallback, useRef } from 'react';
import { atom, useAtom } from 'jotai';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { unreadCount } from '../contexts/sseAtom';
import { customErrToast } from '../utils/customErrorToast';

const sseConnectedAtom = atom(false); // SSE 연결 상태
const sseMessagesAtom = atom<string[]>([]); // SSE 메시지 상태

export const useSSE = () => {
  const [, setConnected] = useAtom(sseConnectedAtom);
  const [, setUnReadCount] = useAtom(unreadCount);

  const eventSourceRef = useRef<EventSourcePolyfill | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const clearReconnectTimeout = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
  }, []);

  const connectToSSE = useCallback(() => {
    // 로컬 스토리지에서 연결 상태 확인
    const isConnected = localStorage.getItem('sseConnected') === 'true';
    if (isConnected || eventSourceRef.current) {
      console.log('이미 SSE에 연결되어 있습니다.');
      return; // 연결이 이미 되어 있다면 재연결하지 않음
    }

    clearReconnectTimeout();

    // SSE 연결 설정
    eventSourceRef.current = new EventSourcePolyfill(
      `${process.env.REACT_APP_API_BASE_URL}/notifications/stream`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          Accept: 'text/event-stream',
        },
        heartbeatTimeout: 86400000,
        withCredentials: true,
      }
    );

    eventSourceRef.current.onmessage = event => {
      if (!event.data.includes('연결') || window.location.href === 'http://localhost:3000/') {
        const modifiedMessage = event.data.split('.')[0];
        customErrToast(modifiedMessage);
        setUnReadCount(prev => prev + 1);
      }
    };

    eventSourceRef.current.onopen = () => {
      console.log('SSE 스트림 연결 성공');
      setConnected(true);
      localStorage.setItem('sseConnected', 'true'); // 연결 상태 저장
    };

    eventSourceRef.current.onerror = () => {
      console.error('SSE 에러 발생');
      eventSourceRef.current?.close();
      setConnected(false);
      localStorage.setItem('sseConnected', 'false'); // 연결 상태 저장
      reconnectTimeoutRef.current = setTimeout(connectToSSE, 1000); // 1초 후 재연결 시도
    };
  }, [setConnected, clearReconnectTimeout]);

  useEffect(() => {
    connectToSSE();

    return () => {
      eventSourceRef.current?.close();
      localStorage.setItem('sseConnected', 'false'); // 컴포넌트 언마운트 시 연결 해제 상태 저장
      clearReconnectTimeout();
    };
  }, [connectToSSE, clearReconnectTimeout]);
};

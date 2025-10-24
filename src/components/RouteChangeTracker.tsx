import { useEffect, useState } from 'react';
import ReactGA from 'react-ga4';
import { useLocation } from 'react-router-dom';

/**
 * 구글 애널리틱스 사용하기 위함.
 * uri 변경 추적 컴포넌트
 * uri가 변경될 때마다 pageview 이벤트 전송
 */
const RouteChangeTracker = () => {
  const location = useLocation();
  const [initialized, setInitialized] = useState(false);

  // localhost는 기록하지 않음
  useEffect(() => {
    if (!window.location.href.includes('localhost')) {
      const trackingId = import.meta.env.VITE_GOOGLE_ANALYTICS_TRAKING_ID;

      if (trackingId) {
        ReactGA.initialize(trackingId);
        // Todo: 해당 라인 수정해야함.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setInitialized(true);
      } else {
        console.error('Google Analytics tracking ID가 정의되어 있지 않습니다.');
      }
    }
  }, []);

  // location 변경 감지시 pageview 이벤트 전송
  useEffect(() => {
    if (initialized && !window.location.href.includes('localhost')) {
      ReactGA.set({ page: location.pathname });
      ReactGA.send('pageview');
    }
  }, [initialized, location]);
};

export default RouteChangeTracker;

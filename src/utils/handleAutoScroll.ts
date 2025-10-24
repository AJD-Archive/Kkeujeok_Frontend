// utils.ts
import type { DragUpdate } from 'react-beautiful-dnd';

export const handleAutoScroll = (update: DragUpdate): void => {
  const container = document.querySelector('.container');

  if (!container) return;

  const y = update.source.index * 50; // 인덱스를 이용하여 y 좌표를 대략적으로 계산 (예시)
  const buffer = 20; // 스크롤이 시작될 y값에서의 여유

  if (y < buffer) {
    container.scrollBy(0, -5); // 위로 스크롤
  } else if (y > container.clientHeight - buffer) {
    container.scrollBy(0, 5); // 아래로 스크롤
  }
};

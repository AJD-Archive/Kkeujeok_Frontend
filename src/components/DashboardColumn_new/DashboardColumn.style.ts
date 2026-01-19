import { css } from '@emotion/react';

export const COLUMN_CONFIG = {
  todo: {
    title: '시작 전',
    dotColor: '#00D1FF',
  },
  inProgress: {
    title: '진행 중',
    dotColor: '#4C8CFF',
  },
  done: {
    title: '완료',
    dotColor: '#9847FF',
  },
};

export const containerStyle = css({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.25rem',
  padding: '1.25rem',
  backgroundColor: '#FAFAFA',
  border: '1px solid #eee',
  borderRadius: '1rem',
});

export const headerStyle = css({
  display: 'flex',
  justifyContent: 'space-between',
});

export const columnTitleStyle = css({
  display: 'flex',
  gap: '0.375rem',
  alignItems: 'center',
});

export const baseDotStyle = css({
  width: '0.75rem',
  height: '0.75rem',
  borderRadius: '100%',
});

export const titleStyle = css({
  fontSize: '0.875rem',
  fontWeight: 'bold',
  color: '#858585',
});

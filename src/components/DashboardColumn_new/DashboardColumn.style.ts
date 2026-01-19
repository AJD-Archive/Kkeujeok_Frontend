import { css } from '@emotion/react';

export const COLUMN_CONFIG = {
  todo: {
    title: '시작 전',
    dotColor: 'var(--main3)',
  },
  inProgress: {
    title: '진행 중',
    dotColor: 'var(--main)',
  },
  done: {
    title: '완료',
    dotColor: 'var(--main2)',
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
  border: '1px solid var(--stroke2)',
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
  color: 'var(--gray)',
});

export const blocksStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
});

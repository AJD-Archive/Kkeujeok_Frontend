import { css } from '@emotion/react';

export const containerStyle = css({
  padding: '0 1rem',
  border: '1px solid var(--stroke2)',
  backgroundColor: 'var(--white)',
  borderRadius: '0.75rem',
  maxWidth: '20rem',
});

export const headerStyle = css({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0.625rem 0',
  borderBottom: '1px dashed var(--stroke2)',
});

export const contentStyle = css({
  padding: '0.75rem 0',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.375rem',
});

export const titleStyle = css({
  fontSize: '1rem',
  fontWeight: 'bold',
  color: 'var(--text)',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
});

export const descriptionStyle = css({
  fontSize: '0.875rem',
  color: 'var(--gray)',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  overflow: 'hidden',
  lineHeight: '1.125rem',
});

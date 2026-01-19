import { css } from '@emotion/react';

export const baseTagStyle = css({
  width: 'fit-content',
  borderRadius: '1.5rem',
});

export const sizeStyles = {
  md: css({ padding: '0.125rem 0.375rem', fontSize: '0.875rem' }),
  lg: css({ padding: '0.375rem 0.75rem', fontSize: '1rem' }),
};

export const variantStyles = {
  default: css({ backgroundColor: '#fff', color: '#858585', border: '1px solid #eee' }),
  todo: css({
    backgroundColor: '#E5FAFF',
    color: '#00D1FF',
    border: '1px solid #E5FAFF',
  }),
  inProgress: css({
    backgroundColor: '#EDF3FF',
    color: '#4C8CFF',
    border: '1px solid #EDF3FF',
  }),
  done: css({
    backgroundColor: '#F5EDFF',
    color: '#9847FF',
    border: '1px solid #F5EDFF',
  }),
  challenge: css({
    backgroundColor: '#fff',
    background: 'linear-gradient(90deg, #4C8CFF 0%, #9847FF 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    border: '1px solid #eee',
  }),
  dDay: css({
    backgroundColor: '#F3F3F3',
    color: '#858585',
    fontWeight: 'bold',
    border: '1px solid #F3F3F3',
  }),
  urgent: css({
    backgroundColor: '#FFEBEB',
    color: '#FF383C',
    fontWeight: 'bold',
    border: '1px solid #FFEBEB',
  }),
};

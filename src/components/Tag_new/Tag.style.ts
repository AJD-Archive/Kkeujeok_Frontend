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
  default: css({ backgroundColor: 'var(--white)', color: 'var(--gray)', border: '1px solid var(--stroke2)' }),
  todo: css({
    backgroundColor: '#E5FAFF',
    color: 'var(--main3)',
    border: '1px solid #E5FAFF',
  }),
  inProgress: css({
    backgroundColor: '#EDF3FF',
    color: 'var(--main)',
    border: '1px solid #EDF3FF',
  }),
  done: css({
    backgroundColor: '#F5EDFF',
    color: 'var(--main2)',
    border: '1px solid #F5EDFF',
  }),
  challenge: css({
    backgroundColor: 'var(--white)',
    background: 'linear-gradient(90deg, var(--main) 0%, var(--main2) 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    border: '1px solid var(--stroke2)',
  }),
  dDay: css({
    backgroundColor: '#F3F3F3',
    color: 'var(--gray)',
    fontWeight: 'bold',
    border: '1px solid #F3F3F3',
  }),
  urgent: css({
    backgroundColor: '#FFEBEB',
    color: 'var(--red)',
    fontWeight: 'bold',
    border: '1px solid #FFEBEB',
  }),
};

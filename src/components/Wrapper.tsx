import { useState } from 'react';
import * as S from '../styles/MainPageStyled';

const Wrapper = ({
  children,
  isWrapperTrue,
}: {
  children: React.ReactNode;
  isWrapperTrue: boolean;
}) => {
  return (
    <div
      style={{
        pointerEvents: isWrapperTrue ? 'none' : 'auto',
      }}
    >
      {isWrapperTrue && <S.IsReadOnly>보기 권한만 있습니다</S.IsReadOnly>}
      {children}
    </div>
  );
};
export default Wrapper;

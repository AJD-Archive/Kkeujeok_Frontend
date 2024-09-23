import { useState } from 'react';
import * as S from '../styles/DashboardStyled';
import Flex from './Flex';

type GraphProps = {
  blockProgress: number;
};

const Graph = ({ blockProgress }: GraphProps) => {
  return (
    <S.GraphContainer>
      <Flex>
        <S.GraphWrapper>
          <S.GraphProgress blockProgress={blockProgress}></S.GraphProgress>
        </S.GraphWrapper>
        <span>{blockProgress}%</span>
      </Flex>
    </S.GraphContainer>
  );
};
export default Graph;

import * as S from '../styles/DashboardStyled';
import type { TPages } from '../utils/columnsConfig';
import Flex from './Flex';

type GraphProps = {
  blockTotal: TPages;
};

const Graph = ({ blockTotal }: GraphProps) => {
  let progress = (blockTotal.completed / (blockTotal.todo + blockTotal.doing + blockTotal.completed)) * 100;

  if (Number.isNaN(progress)) progress = 0;
  return (
    <S.GraphContainer>
      <Flex>
        <S.GraphWrapper>
          <S.GraphProgress blockProgress={progress.toFixed(1)} />
        </S.GraphWrapper>
        <span>{progress.toFixed(1)}%</span>
      </Flex>
    </S.GraphContainer>
  );
};
export default Graph;

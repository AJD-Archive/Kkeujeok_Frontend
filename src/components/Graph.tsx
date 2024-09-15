import * as S from '../styles/DashboardStyled';

type GraphProps = {
  blockProgress: number;
};

const Graph = ({ blockProgress }: GraphProps) => {
  return (
    <S.GraphContainer>
      <S.GraphProgress blockProgress={blockProgress}>
        <p>{blockProgress}%</p>
      </S.GraphProgress>
    </S.GraphContainer>
  );
};
export default Graph;

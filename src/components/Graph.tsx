import axios from 'axios';
import { getPersonalDashboard } from '../api/BoardApi';
import * as S from '../styles/DashboardStyled';
import Flex from './Flex';
import { DashboardItem } from '../types/PersonalDashBoard';
import { axiosInstance } from '../utils/apiConfig';
import useItems from '../hooks/useItems';
import { TPages } from '../utils/columnsConfig';

type GraphProps = {
  blockTotal: TPages;
};

const Graph = ({ blockTotal }: GraphProps) => {
  let progress =
    (blockTotal.completed / (blockTotal.todo + blockTotal.doing + blockTotal.completed)) * 100;

  if (Number.isNaN(progress)) progress = 0;
  return (
    <S.GraphContainer>
      <Flex>
        <S.GraphWrapper>
          <S.GraphProgress blockProgress={progress.toFixed(1)}></S.GraphProgress>
        </S.GraphWrapper>
        <span>{progress.toFixed(1)}%</span>
      </Flex>
    </S.GraphContainer>
  );
};
export default Graph;

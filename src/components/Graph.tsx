import { styled } from 'styled-components';
import theme from '../styles/Theme/Theme';

const Graph = () => {
  return (
    <GraphContainer>
      <GraphProgress>
        <p>60%</p>
      </GraphProgress>
    </GraphContainer>
  );
};
export default Graph;

const GraphContainer = styled.div`
  width: 13.1875rem;
  height: 1.3125rem;

  background: none;
  border: 1px solid ${theme.color.lightGray};
  border-radius: 30px;

  p {
    margin-left: 1rem;
    font-size: ${theme.font.size.caption};
    color: ${theme.color.white};
  }
`;

const GraphProgress = styled.div`
  width: 60%; /*todo의 완료도에 따라 부모 width의 퍼센테이지로 맞춰 크기 조정*/
  height: 1.3125rem;

  background: ${theme.color.gradation};
  border: none;
  border-radius: 30px;

  display: flex;
  align-items: center;
`;

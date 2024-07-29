import { styled } from 'styled-components';
import theme from '../styles/Theme/Theme';

interface Props {
  text: string;
}
const Dashboard = ({ text }: Props) => {
  return (
    <DashboardContainer>
      <h6>{text} 대시보드</h6>
      {Array.from({ length: 7 }, (_, index) => (
        <DashboardItem key={index}>
          {text} 대시보드 {index + 1}
        </DashboardItem>
      ))}
    </DashboardContainer>
  );
};
export default Dashboard;

const DashboardContainer = styled.section`
  margin-bottom: 3.3125rem;
  h6 {
    font-size: 10px;
    font-weight: ${theme.font.weight.medium};
    color: ${theme.color.gray};
    margin-bottom: 1.25rem;
  }
`;
const DashboardItem = styled.article`
  font-size: ${theme.font.size.main};
  color: ${theme.color.gray};
  font-weight: ${theme.font.weight.medium};
  margin-bottom: 0.8125rem;
`;

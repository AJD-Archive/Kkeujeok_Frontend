import { styled } from 'styled-components';
import theme from './Theme/Theme';

export const Layout = styled.div`
  width: 100vw;
  min-width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.p`
  margin-top: 3rem;
  font-size: 2rem;
  font-weight: ${theme.font.weight.bold};
  color: ${theme.color.text};
  line-height: 1.3rem;
`;

export const Content = styled.p`
  margin-top: 2rem;
  color: ${theme.color.gray};
  line-height: 1.5rem;
  text-align: center;
`;

export const HomeLink = styled(Content)`
  cursor: pointer;
  color: ${theme.color.lightGray};
  transition: color 200ms ease-in-out;
  border-bottom: 1px solid ${theme.color.white};
  &:hover {
    color: ${theme.color.gray};
    border-bottom: 1px solid ${theme.color.lightGray};
  }
`;

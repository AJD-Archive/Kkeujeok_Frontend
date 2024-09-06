import { styled } from 'styled-components';
import theme from '../styles/Theme/Theme';

export const NavBarLayout = styled.nav`
  width: 12.5rem;
  min-width: 12.5rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${theme.color.navbar};
  padding: 2.5625rem 1.625rem;
  z-index: 1;
`;

export const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-bottom: 2.5rem;
`;

export const UserDetailContainer = styled.div`
  p {
    font-size: ${theme.font.size.main};
    font-weight: ${theme.font.weight.medium};
    margin-bottom: 4px;
  }

  a {
    display: flex;
    align-items: center;
    font-size: ${theme.font.size.caption};
    font-weight: ${theme.font.weight.light};
    color: ${theme.color.gray};
  }

  img {
    width: 12px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`;

export const DashboardsContainer = styled.div`
  overflow-y: auto;
`;

export const NavButton = styled.button<{ variant: 'primary' | 'secondary' }>`
  padding: 0.75rem 1.875rem;
  border: 0;
  border-radius: 0.625rem;
  font-weight: ${theme.font.weight.medium};
  font-size: ${theme.font.size.main};
  cursor: pointer;

  ${props =>
    props.variant === 'primary' &&
    `
    background: ${theme.color.white};
    color: ${theme.color.gray};
    margin-bottom: 0.8125rem;
  `}

  ${props =>
    props.variant === 'secondary' &&
    `
    background: ${theme.color.gradation};
    color: ${theme.color.white};
  `}
`;
export default NavButton;

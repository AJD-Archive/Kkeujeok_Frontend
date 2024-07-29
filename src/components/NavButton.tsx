import { styled } from 'styled-components';
import theme from '../styles/Theme/Theme';

const NavButton = styled.button<{ variant: 'primary' | 'secondary' }>`
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

import { Link } from 'react-router-dom';
import styled from 'styled-components';

// 링크 방문시 스타일 변화 방지 style
export const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
    color: inherit;
  }
`;

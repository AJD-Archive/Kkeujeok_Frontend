import { styled } from 'styled-components';

import type { Props } from '../components/Profile';

export const ProfileImgWrapper = styled.div<Props>`
  min-width: ${(props) => props.width};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

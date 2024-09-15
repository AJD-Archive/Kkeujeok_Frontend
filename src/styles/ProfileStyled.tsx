import { styled } from 'styled-components';
import { Props } from '../components/Profile';

export const ProfileImgWrapper = styled.div<Props>`
  width: ${props => props.width};
  height: ${props => props.height};
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

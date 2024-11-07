import { styled } from 'styled-components';
import theme from '../../styles/Theme/Theme';

export const ConnectionLayout = styled.div`
  width: calc(100% / 2 - 5rem);
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 10px;
  border: 1px solid ${theme.color.stroke2};

  display: flex;
  /* flex-direction: column; */
  justify-content: space-around;
  align-items: center;

  cursor: pointer;

  &:nth-child(odd) {
    margin-right: 1rem;
  }
`;

export const ProfileImageWrapper = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  border: 1px solid ${theme.color.stroke2};
  color: ${theme.color.text};
`;

export const ConnectionUserWrapper = styled.div`
  width: 60%;

  .name {
    font-weight: ${theme.font.weight.bold};
    margin-bottom: 0.5rem;
  }

  .nickName {
    color: ${theme.color.gray};
  }
`;

export const FriendRequestButtonWrapper = styled.div`
  padding: 0.4rem 1rem;
  border-radius: 0.5rem;
  font-size: ${theme.font.size.caption};
  border: 1px solid ${theme.color.stroke2};
  color: ${theme.color.gray};

  &:hover {
    background-color: ${theme.color.stroke2};
    color: ${theme.color.text};
  }
`;

import { styled } from 'styled-components';
import theme from '../styles/Theme/Theme';

export const MyPageLayout = styled.section`
  width: 43%;
  margin: 0 auto;
  margin-top: 4.125rem;
`;
export const ChanllengeBlockContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.0625rem;
`;
export const ProfileImageWrapper = styled.div`
  width: 12.5rem;
  height: 12.5rem;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const MainText = styled.span`
  font-size: ${theme.font.size.main};
  font-weight: ${theme.font.weight.medium};
`;

export const CaptionText = styled.span`
  font-size: ${theme.font.size.caption};
  font-weight: ${theme.font.weight.light};
  color: ${theme.color.gray};
`;

export const GoogleImageIcon = styled.img`
  width: 18px;
  height: 18px;
`;

export const ImageWrapper = styled.div`
  width: 25px;
  height: 25px;
  position: relative;
  img {
    width: 100%;
    height: 100%;
  }

  div {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: #ff6c6c;
    color: white;
    font-weight: 100;
    position: absolute;
    bottom: -3px;
    right: -3px;
    text-align: center;
  }
`;

export const PagenateBox = styled.div`
  ul {
    display: flex;
    justify-content: center;
    width: 100%;
    margin: 80px 0;
    gap: 0.3125rem;
  }

  li {
    min-width: 1.1875rem;
    min-height: 1.1875rem;
    border: 1px solid ${theme.color.border};
    padding: 0.1875rem 0.3125rem;
    border-radius: 0.3125rem;
    font-size: ${theme.font.size.main};
    color: ${theme.color.lightGray};
  }
`;

export const ChallengeLayout = styled.div`
  width: 100%;
  border: 1px solid ${theme.color.border};
  padding: 1.1875rem 1.625rem 2.625rem 1.625rem;
  border-radius: 0.625rem;
`;

export const ChallengeBoxTitle = styled.span`
  display: inline-block;
  font-size: ${theme.font.size.main};
  font-weight: ${theme.font.weight.bold};
  margin-bottom: 0.4375rem;
`;

export const CahllengeInfo = styled.div`
  span {
    display: inline-block;
    margin-bottom: 0.4375rem;
  }
  span,
  p {
    font-size: ${theme.font.size.caption};
    font-weight: 400;
  }

  hr {
    border: 0.3px solid ${theme.color.border};
  }
`;

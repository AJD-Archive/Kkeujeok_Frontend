import { styled } from 'styled-components';
import theme from '../styles/Theme/Theme';

export const HeaderContentContainer = styled.div`
  flex-shrink: 0;
`;
export const TitleWrapper = styled.h1`
  font-size: 24px;
  font-weight: ${theme.font.weight.bold};
  margin-right: 13px;
`;

export const SubtitleWrapper = styled.p`
  font-size: ${theme.font.size.main};
  font-weight: ${theme.font.weight.medium};
  color: ${theme.color.gray};
`;

export const SettingImgWrapper = styled.div`
  width: 17px;

  img {
    width: 100%;
  }
`;

export const TeamDocButton = styled.button`
  display: flex;
  height: 1.3125rem;
  align-items: center;
  margin-left: 1.0625rem;

  font-size: ${theme.font.size.caption};
  font-weight: ${theme.font.weight.light};
  color: ${theme.color.white};

  background: ${theme.color.gray};
  border-radius: 0.625rem;
  padding: 0.3125rem 1.875rem;
`;

export const AddbuttonWrapper = styled.div`
  width: 25px;
  height: 25px;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
  }
`;

export const LeftArrowWrapper = styled.div`
  width: 30px;
  height: 30px;
  margin-right: 0.6875rem;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
  }
`;

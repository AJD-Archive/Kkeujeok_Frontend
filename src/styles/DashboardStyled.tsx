import { styled } from 'styled-components';
import theme from '../styles/Theme/Theme';

type Props = {
  backGroundColor?: string;
  highlightColor?: string;
  state?: string;
  imgSrc?: string;
};

export const DashboardContainer = styled.section`
  margin-bottom: 3.3125rem;
  height: 100%;

  h6 {
    font-size: 10px;
    font-weight: ${theme.font.weight.medium};
    color: ${theme.color.gray};
    margin-bottom: 1.25rem;
  }
`;

export const DashboardItem = styled.article`
  font-size: ${theme.font.size.main};
  color: ${theme.color.gray};
  font-weight: ${theme.font.weight.medium};
  margin-bottom: 0.8125rem;
  cursor: pointer;
`;

export const CardContainer = styled.div<Props>`
  width: 19.875rem;
  height: 39.0625rem;
  padding: 1rem 1rem;
  flex-shrink: 0;
  border-radius: 10px;
  background: ${({ backGroundColor }) => backGroundColor};

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.9688rem;
  }
`;

export const StatusBarContainer = styled.div<Props>`
  justify-content: space-between;
  height: auto;
  display: flex;
  align-items: center;
  padding: 0.2344rem 0;
  border-radius: 2.3438rem;
  font-size: ${theme.font.size.caption};
  font-weight: ${theme.font.weight.medium};
  background: ${({ highlightColor }) => highlightColor};

  &::before {
    content: '';
    width: 12px;
    height: 12px;
    margin-left: 0.2813rem;
    border-radius: 50%;
    background: ${theme.color.white};
  }
  span {
    color: ${theme.color.white};
    margin-right: 0.5313rem;
    margin-left: 0.2344rem;
  }
`;

export const AddButtonWrapper = styled.div`
  width: 1.1875rem;
  height: 1.1875rem;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
  }
`;

export const GraphContainer = styled.div`
  width: 13.1875rem;
  height: 1.3125rem;

  background: none;
  border: 1px solid ${theme.color.lightGray};
  border-radius: 30px;

  p {
    margin-left: 1rem;
    font-size: ${theme.font.size.caption};
    color: ${theme.color.white};
  }
`;

export const GraphProgress = styled.div`
  width: 60%; /*todo의 완료도에 따라 부모 width의 퍼센테이지로 맞춰 크기 조정*/
  height: 1.3125rem;

  background: ${theme.color.gradation};
  border: none;
  border-radius: 30px;

  display: flex;
  align-items: center;
`;

/* 블록 스타일*/
export const BlockContainer = styled.div`
  background: ${theme.color.white};
  padding: 0.625rem 1.375rem 1.25rem 1.375em;
  border: 1px solid #f4f4f4;
  border-radius: 10px;
  margin-bottom: 1rem;
  cursor: pointer;

  h3 {
    font-size: ${theme.font.size.main};
    font-weight: ${theme.font.weight.medium};
    color: ${theme.color.black};
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.5em;
    max-height: 3em;
    margin-right: 23px;
    flex: 2;
  }

  p {
    font-size: ${theme.font.size.caption};
    font-weight: ${theme.font.weight.light};
    color: ${theme.color.gray};
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  span {
    font-size: ${theme.font.size.caption};
    color: ${theme.color.gray};
    font-weight: ${theme.font.weight.light};
  }

  &:hover {
    img {
      visibility: visible;
    }
  }
`;

/* 블록 이미지 아이콘 스타일*/
export const ImageIconWrapper = styled.div`
  width: 10px;
  height: 10px;

  img {
    visibility: hidden;
    width: inherit;
    height: auto;
  }
`;

export const ProfileImageWrapper = styled.div`
  width: 1.3125rem;
  height: 1.3125rem;
  margin-right: 0.3125rem;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;

export const BoxContainer = styled.section`
  height: calc(100% - 35px);
  overflow: auto;
`;

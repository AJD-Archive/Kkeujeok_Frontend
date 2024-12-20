import { styled, keyframes } from 'styled-components';
import theme from '../styles/Theme/Theme';
import rightArrowImg from '../img/rightarrow.png';

type Props = {
  backGroundColor?: string;
  highlightColor?: string;
  state?: string;
  imgSrc?: string;
};
interface DashboardContainerProps {
  text: string;
}

// 애니메이션 정의
const shake = keyframes`
  /* 0% { transform: translateX(0); }
  25% { transform: translate(-1.5px, -1.5px); }
  50% { transform: translateX(1.5px); }
  75% { transform: translate(-1.5px, -1.5px); }
  100% { transform: translateX(0); } */


  0% { transform: rotate(0deg); }
  25% { transform: rotate(10deg)};
  75%{transform: rotate(-10deg)};
  100%{transform: rotate()(0deg)};

`;
export const DashboardContainer = styled.section<DashboardContainerProps>`
  /* margin-bottom: 3.3125rem; */
  /* overflow: hidden; */

  h6 {
    font-size: 0.7rem;
    font-weight: ${theme.font.weight.medium};
    color: ${theme.color.gray};
    margin-bottom: 0.8rem;
    ${props =>
      props.text === '팀' &&
      `
      margin-top: 2rem; /* '팀'일 때 적용할 스타일 */
    `}
  }

  summary {
    list-style: none; /* 기본 아이콘 제거 */
    font-size: ${theme.font.size.main};
    color: ${theme.color.gray};
    font-weight: ${theme.font.weight.medium};
    cursor: pointer;
    margin: 0.5rem 0;
  }

  summary::-webkit-details-marker {
    display: none; /* 크롬/사파리 등의 브라우저에서 기본 아이콘 숨기기 */
  }

  summary::before {
    content: '';
    display: inline-block;
    width: 12px;
    height: 12px;
    margin-right: 0.5rem;
    background-image: url(${rightArrowImg});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    transition: transform 0.3s ease;
  }

  /* 열렸을 때 summary의 스타일 변경 */
  /* details[open] summary {
    font-weight: ${theme.font.weight.bold}; 
  } */

  /* 열렸을 때의 스타일 */
  details[open] summary::before {
    transform: rotate(90deg); /* 열리면 아이콘 회전 */
  }
`;

export const DashboardItemContainer = styled.div`
  width: 100%;
`;

export const PersonalDashboardItem = styled.article`
  font-size: ${theme.font.size.main};
  color: ${theme.color.gray};
  font-weight: ${theme.font.weight.medium};
  cursor: pointer;
  margin: 0.5rem 0;
  margin-left: 2rem;

  &:not(:last-child) {
    padding-bottom: 0.4rem;
    border-bottom: 1px solid #e9e9e9ca;
  }
`;

export const TeamDashboardItem = styled.article`
  font-size: ${theme.font.size.main};
  color: ${theme.color.gray};
  font-weight: ${theme.font.weight.medium};
  cursor: pointer;
  margin: 0.5rem 0;

  &:not(:last-child) {
    padding-bottom: 0.4rem;
    border-bottom: 1px solid #e9e9e9ca;
  }
`;

export const CardContainer = styled.div<Props>`
  width: 17.875vw;
  height: calc(100vh - 35vh);
  padding: 1rem 1rem;
  flex-shrink: 0;
  border-radius: 10px;
  background: ${({ backGroundColor }) => backGroundColor};
  min-width: 15.449rem;

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
  span {
    width: 4rem;
    color: black;
    font-weight: 600;
    margin-left: 0.3rem;
    color: ${theme.color.gray};
  }
`;
export const GraphWrapper = styled.div`
  width: 13.1875rem;
  height: 1.3125rem;

  background: none;
  overflow: hidden;
  border: 1px solid ${theme.color.lightGray};
  border-radius: 30px;
  display: flex;
  align-items: center;
`;
export const GraphProgress = styled.div<{ blockProgress: string | number }>`
  width: ${({ blockProgress }) =>
    blockProgress}%; /*todo의 완료도에 따라 부모 width의 퍼센테이지로 맞춰 크기 조정*/
  height: 1.3125rem;

  background: ${theme.color.gradation};
  border: none;
  border-radius: 30px;

  display: flex;
  align-items: center;
  z-index: -1;
  transition: width 1s ease;
`;

/* 블록 스타일*/
export const BlockContainer = styled.div<{
  marginValue: string;
  dayCount: number;
  isDone: boolean;
}>`
  background: ${theme.color.white};
  padding: 1.375rem 1.375rem 1.375rem 1.375em;
  border: 1px solid #f4f4f4;
  border-radius: 10px;
  cursor: pointer;
  flex: 1;
  grid-column: 1;
  margin-bottom: ${({ marginValue }) => `${marginValue}rem`};

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
    /* 날짜 색상 : 만료일 가까워지면 다른 스타일 */

    font-size: ${theme.font.size.caption};
    color: ${theme.color.gray};
    font-weight: ${theme.font.weight.light};

    // * d-day 7일 남았을 때부터 다른 스타일
    color: ${({ dayCount, isDone }) => (dayCount > -8 && !isDone ? 'red' : theme.color.gray)};
    /* font-weight: ${({ dayCount }) =>
      dayCount < 4 ? theme.font.weight.bold : theme.font.weight.light}; */

    animation-name: ${({ dayCount, isDone }) => (dayCount > -8 && !isDone ? shake : 'none')};

    animation-duration: 0.2s; /* 애니메이션 지속 시간 설정 */
    animation-iteration-count: 5;
  }

  &:hover {
    img {
      visibility: visible;
    }
  }
`;

export const ChallengeTypeWrapper = styled.p`
  p {
    background: linear-gradient(
      90deg,
      ${theme.color.main},
      ${theme.color.main2},
      ${theme.color.main3}
    );
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  /* p {
    color: ${theme.color.gray};
  } */
`;

export const UserName = styled.p`
  font-size: ${theme.font.size.caption};
  color: ${theme.color.gray};
  font-weight: ${theme.font.weight.light};
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

export const GridBlockStyle = styled.div`
  grid-column: 2;
`;

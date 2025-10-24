import { styled } from 'styled-components';

import rightArrowImg from '../../img/rightarrow.png';
import theme from '../../styles/Theme/Theme';

export const MainDashBoardLayout = styled.div`
  width: 100vw;
  min-width: 100vw;
  height: 100vh;
  display: flex;
`;

export const MainDashBoardContainer = styled.section`
  width: 100%;
  height: 100vh;
  padding: 4.3125rem 2.5rem;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;

  hr {
    border: 1px solid #f4f4f4;
  }
`;

export const NoticeModal = styled.div`
  width: 50vw;
  height: fit-content;
  max-height: 80vh;
  padding: 3.5rem 3rem;
  /* padding-top: 40vh; */
  border-radius: 1rem;
  border: 1px solid ${theme.color.stroke2};
  box-shadow: ${theme.boxShadow.default};

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  overflow: auto;
`;

export const Header = styled.div`
  width: 100%;
  padding-bottom: 13px;
  border-bottom: 1px solid #f4f4f4;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  img {
    width: 1.5rem;
    cursor: pointer;
  }
`;

export const Title = styled.p`
  font-size: 1.5rem;
  font-weight: ${theme.font.weight.bold};
  margin-right: 13px;
`;

export const NoticeContainer = styled.div`
  margin-top: 1rem;

  width: 100%;

  p {
    display: inline-block;
  }

  .version {
    font-weight: ${theme.font.weight.bold};
    width: 10%;
    margin-left: 0.3rem;
  }

  .title {
    width: calc(100% - 10% - 15% - 6%);
  }

  .date {
    width: 15%;
    text-align: right;
    color: ${theme.color.gray};
  }

  details {
    /* margin-top: 1rem 0; */
    margin: 1rem 0;
  }

  details:last-child {
    margin-bottom: 1rem;
  }

  summary {
    margin-bottom: 1rem;
    cursor: pointer;
    list-style: none; /* 기본 아이콘 제거 */
  }

  summary::-webkit-details-marker {
    display: none; /* 크롬/사파리 등의 브라우저에서 기본 아이콘 숨기기 */
  }

  summary::before {
    content: '';
    display: inline-block;
    width: 1rem;
    height: 1rem;
    margin-right: 0.5rem;
    background-image: url(${rightArrowImg});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    transition: transform 0.3s ease;
  }

  details[open] summary::before {
    transform: rotate(90deg); /* 열리면 아이콘 회전 */
  }
`;

export const StyledEditorWrapper = styled.div``;

export const ContactContainer = styled.div`
  width: 100%;
  border-top: 1px solid #f4f4f4;
  padding-top: 0.5rem;

  p {
    color: ${theme.color.gray};
    margin-top: 0.5rem;
    font-size: 0.8rem;
  }
`;

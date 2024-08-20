import { styled } from 'styled-components';

export const MainDashBoardLayout = styled.div`
  width: 100vw;
  min-width: 100vw;
  height: 100vh;
  display: flex;
`;

export const MainDashBoardContainer = styled.section`
  width: 100%;
  padding: 4.3125rem 2.5rem;
  overflow: hidden;

  hr {
    border: 1px solid #f4f4f4;
  }
`;

export const CardContainer = styled.section`
  display: flex;
  justify-content: space-between;
  padding: 4.5rem 3.8125rem;
  gap: 39px;

  @media screen and (min-width: 1700px) {
    justify-content: center;
  }
`;

export const DeleteIcon = styled.div`
  width: 3.375rem;
  height: 3.375rem;

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  right: 30px;
  bottom: 20px;

  background: #f4f4f4;
  border-radius: 50%;

  img {
    width: 27px;
    height: 31px;
  }
`;

import { styled } from 'styled-components';
import theme from './Theme/Theme';

export const MainDashBoardLayout = styled.div`
  width: 100vw;
  min-width: 100vw;
  height: 100vh;
  display: flex;
`;

export const MainDashBoardContainer = styled.section`
  width: 100%;
  padding: 4.3125vw 2.5vw;
  overflow: hidden;

  hr {
    border: 1px solid #f4f4f4;
  }
`;

export const CardContainer = styled.section`
  display: flex;
  justify-content: center;
  padding: 4.5vw 3.8125vw;
  gap: 1.563rem;

  @media screen and (min-width: 1700px) {
    justify-content: space-evenly;
  }
`;

export const DeleteContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
`;

export const DeleteDiv = styled.div`
  width: 22.4375rem;
  height: 34.8125rem;
  padding: 1.625rem 1.3125rem;
  color: ${theme.color.gray};
  font-size: 20px;
  background: white;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 10%);
  position: absolute;
  bottom: 20px;
  right: 20px;
  border-radius: 0.625rem;

  button {
    color: #858585;
    background-color: #f4f4f4;
    padding: 0.2rem 0.5rem;
    border-radius: 0.2rem;
  }

  button:not(:first-of-type) {
    margin-top: 0.5rem;
  }
`;

export const DeleteIconWrapper = styled.div`
  width: 3.375rem;
  height: 3.375rem;

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  right: 0px;
  bottom: 0px;

  background: #f4f4f4;
  border-radius: 50%;
  cursor: pointer;
  img {
    width: 27px;
    height: 31px;
  }
`;

export const BoxContainer = styled.section`
  height: calc(100% - 36px);
  overflow: auto;
`;

export const BlockEntireContainer = styled.div`
  display: grid;
  grid-template-columns: 85% 5%;
  grid-gap: 8px;
  margin-bottom: 1rem;
  align-items: center;
`;

export const IsReadOnly = styled.div`
  position: absolute;
  width: calc(100% - 12.5rem);
  right: 0px;
  top: 0px;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  padding: 1rem;
  border-radius: 0 0 0.5rem 0.5rem;
  text-align: center;
`;

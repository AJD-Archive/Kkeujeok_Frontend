import { styled } from 'styled-components';
import theme from './Theme/Theme';

export const FolderEntireContainer = styled.div`
  padding: 1.1875rem 2.125rem;
`;

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

export const FolderItmeContainer = styled.div`
  width: 94px;
  height: 94px;

  img {
    width: 100%;
    height: 100%;
    margin: 0.4375rem 0;
    cursor: pointer;
  }

  span {
    font-size: ${theme.font.size.caption};
    font-weight: ${theme.font.weight.light};
  }
`;

export const FileImgWrapper = styled.div`
  width: 5.875rem;
  height: 5.5rem;

  img {
    width: 100%;
    height: 100%;
    margin-bottom: 0.75rem;
    cursor: pointer;
  }

  span {
    font-size: ${theme.font.size.caption};
    font-weight: ${theme.font.weight.light};
  }
`;
export const FolderContainer = styled.div`
  padding: 1.1875rem 2.125rem;
`;

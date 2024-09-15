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
`;

export const Header = styled.div`
  padding-bottom: 13px;
  border-bottom: 1px solid #f4f4f4;
  display: flex;
  align-items: center;
  justify-content: space-between;

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

export const CategoriesContainer = styled.p`
  margin: 2rem 0;

  display: flex;
  overflow-y: scroll;
`;

export const Category = styled.p<{ isSelected: boolean }>`
  width: fit-content;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  margin-right: 0.7rem;
  white-space: nowrap;

  cursor: pointer;

  /* 카테고리 선택에 맞게 다른 스타일 적용 */
  background: ${props =>
    props.isSelected ? `${theme.color.gradation}` : `${theme.color.stroke2}`};
  color: ${props => (props.isSelected ? `${theme.color.white}` : `${theme.color.gray}`)};

  &:hover {
    background-color: ${theme.color.lightGray};
  }
`;

export const DocumentContainer = styled.div`
  width: 100%;
  height: fit-content;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  overflow: hidden;

  &:after {
    content: '';
    flex-basis: calc(100% / 2 - 2rem); /* 빈 공간을 채워서 왼쪽 정렬처럼 보이게 함 */
  }
`;

export const DocumentComponent = styled.div`
  width: calc(100% / 2 - 2rem);
`;

export const DocumentCard = styled.div`
  /* width: calc(100% / 2 - 2rem); */ /* Link 연결하니 width가 깨져서 따로 DocumentComponent로 빼서 설정 */
  height: 7rem;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 10px;
  border: 1px solid ${theme.color.stroke2};

  display: flex;
  flex-direction: column;
  justify-content: space-around;

  cursor: pointer;

  &:nth-child(odd) {
    margin-right: 1rem;
  }
`;

export const DocumentCategory = styled.p`
  font-size: ${theme.font.size.caption};
  color: ${theme.color.gray};
`;

export const DocumentTitle = styled.p`
  font-size: ${theme.font.size.main};
  font-weight: ${theme.font.weight.semiBold};
  color: ${theme.color.black};
`;

export const DocumentWriterImg = styled.div`
  img {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    margin-right: 0.5rem;
    background-color: ${theme.color.stroke2};
  }
`;

export const DocumnetWriter = styled.p`
  font-size: ${theme.font.size.caption};
  color: ${theme.color.gray};
`;

export const PaginationWrapper = styled.div`
  width: 100%;
  margin-top: 1rem;
  display: flex;
  justify-content: center;
`;

// -------------------------------------------
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

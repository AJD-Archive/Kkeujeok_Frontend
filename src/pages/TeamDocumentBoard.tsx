import Navbar from '../components/Navbar';
import Folder from '../components/Folder';
import Flex from '../components/Flex';
import * as S from '../styles/TeamDocumentStyled';
import { useLocation, useNavigate } from 'react-router-dom';
import folderimg from '../img/folderimg.png';
import { useState } from 'react';
import addbutton from '../img/addbutton.png';
import leftarrow from '../img/leftarrow.png';
import Pagination from '../components/CustomPagination';
import DocumentCard from '../components/DocumentCard';
import { Outlet } from 'react-router-dom';

const TeamDocumentBoard = () => {
  const location = useLocation();
  const dashboardId = location.pathname.split('/')[1];
  const [folder, setFolder] = useState('');
  const [folderArray, setFolderArray] = useState<string[]>(['프론트엔드', '백엔드', '기획']);
  const [visible, setVisible] = useState<boolean>(false);
  const navigate = useNavigate();
  const [count, setCount] = useState<number>(1); // 총 페이지 수
  const [page, setPage] = useState<number>(1); // 현재 페이지

  const handleNavigate = () => {
    navigate('1'); // 상대 경로로 이동 `1`은 추후에 서버에서 받아오는 id값으로 대체할 예정임
  };

  const onChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setFolder(e.currentTarget.value);
  };
  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFolderArray([...folderArray, folder]);
  };

  // 페이지네이션 페이지 변경 감지 함수
  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value); // 페이지 변경 시 현재 페이지 상태 업데이트
  };

  return (
    <S.MainDashBoardLayout>
      <Navbar />
      <S.MainDashBoardContainer>
        <S.Header>
          <Flex>
            <img src={leftarrow} />
            <S.Title>팀 문서</S.Title>
          </Flex>
          <img src={addbutton} />
        </S.Header>

        <S.CategoriesContainer>
          <S.Category>카테고리 1</S.Category>
          <S.Category>카테고리 2</S.Category>
          <S.Category>카테고리 3</S.Category>
          <S.Category>카테고리 1</S.Category>
          <S.Category>카테고리 2</S.Category>
          <S.Category>카테고리 3</S.Category>
          <S.Category>카테고리 1</S.Category>
          <S.Category>카테고리 2</S.Category>
          <S.Category>카테고리 3</S.Category>
          <S.Category>카테고리 1</S.Category>
          <S.Category>카테고리 2</S.Category>
          <S.Category>카테고리 3</S.Category>
          <S.Category>카테고리 1</S.Category>
          <S.Category>카테고리 2</S.Category>
          <S.Category>카테고리 3</S.Category>
        </S.CategoriesContainer>

        <S.DocumentContainer>
          <DocumentCard documentId="1" />
          <DocumentCard documentId="1" />
          <DocumentCard documentId="1" />
          <DocumentCard documentId="1" />
          <DocumentCard documentId="1" />
          <DocumentCard documentId="1" />
        </S.DocumentContainer>

        <S.PaginationWrapper>
          <Pagination count={count} page={page} onChange={handleChangePage} />
        </S.PaginationWrapper>
      </S.MainDashBoardContainer>
      <Outlet /> {/* 중첩 라우팅 */}
    </S.MainDashBoardLayout>
  );
};
export default TeamDocumentBoard;

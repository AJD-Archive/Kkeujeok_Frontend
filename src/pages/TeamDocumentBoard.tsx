import Navbar from '../components/Navbar';
import Flex from '../components/Flex';
import * as S from '../styles/TeamDocumentStyled';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import addbutton from '../img/addbutton.png';
import leftarrow from '../img/leftarrow.png';
import Pagination from '../components/CustomPagination';
import DocumentCard from '../components/DocumentCard';
import { Outlet } from 'react-router-dom';
import {
  createTeamDocument,
  getTeamDocument,
  getTeamDocumentCategories,
} from '../api/TeamDocumentApi';
import { Helmet } from 'react-helmet-async';

const TeamDocumentBoard = () => {
  const location = useLocation();
  const dashboardId = location.pathname.split('/')[1];
  const [folder, setFolder] = useState('');
  const [folderArray, setFolderArray] = useState<string[]>(['프론트엔드', '백엔드', '기획']);
  const [visible, setVisible] = useState<boolean>(false);
  const navigate = useNavigate();

  const [page, setPage] = useState<number>(1); // 현재 페이지 (프론트에서 띄울 페이지. 1부터 시작)
  const [size, setSize] = useState<number>(1); // 한 페이지에 요청할 요소 개수

  const [categories, setCategories] = useState<string[]>([]);
  const [teamDocuments, setTeamDocuments] = useState<TeamDocument[]>([]);
  const [pageInfo, setPageInfo] = useState<PageInfoResDto>({
    currentPage: 0,
    totalPages: 1,
    totalItems: 0,
  }); // 백엔드에서 전달받은 페이지 dto. 0부터 시작. 따라서 page state를 따로 만들어 관리.

  const [selectedCategory, setSelectedCategory] = useState<string>(''); // 선택된 카테고리로 재검색. 초기는 '' == 전체.

  // * 페이지네이션 페이지 변경 감지 함수
  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value); // 페이지 변경 시 현재 페이지 상태 업데이트
    setPageInfo(prevPageInfo => ({
      ...prevPageInfo, // 기존 pageInfo 값을 유지
      currentPage: value - 1,
    }));
  };

  // * 팀 문서 카테고리 리스트 get
  const fetchCategoriesData = async () => {
    const response = await getTeamDocumentCategories(dashboardId);

    if (response) setCategories(response);
  };

  // * 팀 문서 카테고리별 검색 get
  const fetchDocumentData = async () => {
    const response = await getTeamDocument(dashboardId, selectedCategory, pageInfo?.currentPage, 8);

    if (response) {
      setTeamDocuments(response.teamDocuments);
      setPageInfo(response.pageInfoResDto);
    }
  };

  useEffect(() => {
    fetchDocumentData();
    fetchCategoriesData();
  }, [pageInfo.currentPage, location.pathname, selectedCategory]); // 페이지가 변경될 때와, 데이터가 변경되었을 때 (즉 라우터가 변경되었을 때) 리렌더링

  // * 팀 문서 생성 post
  const handleCreateTeamDocument = async () => {
    const newDocument: TeamDocument = {
      title: '',
      content: '',
      category: '카테고리 없음',
      teamDashboardId: dashboardId,
    };

    const documentId = await createTeamDocument(newDocument);
    navigate(`${documentId}`); // 팀 문서 사이드 페이지로 이동
  };

  // * 팀 문서 카테고리로 선택하여 검색
  const handleCategoryClick = async (category: string) => {
    setSelectedCategory(category);
    setPage(1);
    setPageInfo(prevPageInfo => ({
      ...prevPageInfo, // 기존 pageInfo 값을 유지
      currentPage: 0,
    }));
  };

  return (
    <>
      <Helmet>
        <title>끄적끄적 | 팀 문서</title>
      </Helmet>
      <S.MainDashBoardLayout>
        <Navbar />
        <S.MainDashBoardContainer>
          <S.Header>
            <Flex>
              <img src={leftarrow} onClick={() => navigate(-1)} /> {/* 뒤로가기 버튼 */}
              <S.Title>팀 문서</S.Title>
            </Flex>
            <img src={addbutton} onClick={handleCreateTeamDocument} />
          </S.Header>

          <S.CategoriesContainer>
            <S.Category
              onClick={() => handleCategoryClick('')}
              isSelected={selectedCategory === ''}
            >
              전체
            </S.Category>
            {categories.map((category, index) => (
              <S.Category
                key={index}
                onClick={() => handleCategoryClick(category)}
                isSelected={selectedCategory === category}
              >
                {category}
              </S.Category>
            ))}
          </S.CategoriesContainer>

          {teamDocuments.length === 0 ? (
            <Flex justifyContent="center" alignItems="center" height={300}>
              <S.NotExistingDocument>생성된 팀 문서가 없어요</S.NotExistingDocument>
            </Flex>
          ) : (
            <>
              {/* 팀 문서 컴포넌트 */}
              <S.DocumentContainer>
                {teamDocuments.map((document, index) => (
                  <DocumentCard key={index} document={document} />
                ))}
              </S.DocumentContainer>

              {/* 페이지네이션 */}
              <S.PaginationWrapper>
                <Pagination count={pageInfo?.totalPages} page={page} onChange={handleChangePage} />
              </S.PaginationWrapper>
            </>
          )}
        </S.MainDashBoardContainer>
        <Outlet /> {/* 사이드 페이지를 위한 중첩 라우팅 */}
      </S.MainDashBoardLayout>
    </>
  );
};
export default TeamDocumentBoard;

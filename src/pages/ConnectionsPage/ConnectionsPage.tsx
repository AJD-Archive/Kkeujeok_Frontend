import { Helmet } from 'react-helmet-async';
import Flex from '../../components/Flex';
import Navbar from '../../components/Navbar';
import * as S from './ConnectionsPageStyled';
import leftarrow from '../../img/leftarrow.png';
import Connection from '../../components/Connection/Connection';
import Pagination from '../../components/CustomPagination';
import { useNavigate } from 'react-router-dom';

const ConnectionsPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>끄적끄적 | 친구</title>
      </Helmet>
      <S.MainDashBoardLayout>
        <Navbar />
        <S.MainDashBoardContainer>
          <S.HeaderLayout>
            <Flex>
              <img src={leftarrow} onClick={() => navigate(`/mypage`)} />
              <S.TitleWrapper>
                <p>친구 목록</p>
              </S.TitleWrapper>
              <S.SecondaryTitleWrapper onClick={() => navigate(`/connectionsSearch`)}>
                <p>친구 찾기</p>
              </S.SecondaryTitleWrapper>
            </Flex>
          </S.HeaderLayout>

          <S.ConnectionsWrapper>
            <Connection />
            <Connection />
            <Connection />
            <Connection />
          </S.ConnectionsWrapper>
        </S.MainDashBoardContainer>

        {/* 페이지네이션 */}
        {/* <S.PaginationWrapper>
          <Pagination count={pageInfo?.totalPages} page={page} onChange={handleChangePage} />
        </S.PaginationWrapper> */}
      </S.MainDashBoardLayout>
    </>
  );
};

export default ConnectionsPage;

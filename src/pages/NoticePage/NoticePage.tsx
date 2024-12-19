import { Helmet } from 'react-helmet-async';
import Flex from '../../components/Flex';
import Navbar from '../../components/Navbar';
import * as S from './NoticePageStyled';
import leftarrow from '../../img/leftarrow.png';
import Friend from '../../components/Friend/Friend';
import Pagination from '../../components/CustomPagination';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSearchFriendsList } from '../../hooks/useFollowersList';
import { useDebounce } from '../../hooks/useDebounce';

const NoticePage = () => {
  return (
    <>
      <Helmet>
        <title>끄적끄적 | 공지사항</title>
      </Helmet>
      <S.MainDashBoardLayout>
        <Navbar />
        <S.MainDashBoardContainer></S.MainDashBoardContainer>
      </S.MainDashBoardLayout>
    </>
  );
};

export default NoticePage;

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
import { useQuery } from '@tanstack/react-query';
import { getNotice } from '../../api/NoticeApi';
import { BlockNoteView } from '@blocknote/mantine';
import { useCreateBlockNote } from '@blocknote/react';

const RenderEditor = ({ content }: { content: string }) => {
  const editor = useCreateBlockNote();

  editor.tryParseMarkdownToBlocks(content ?? '').then(blocks => {
    editor.replaceBlocks(editor.document, blocks);
  });

  if (!content) return <p>내용이 없습니다.</p>;

  return <BlockNoteView editor={editor} editable={false} theme="light" />;
};

const NoticePage = () => {
  const navigate = useNavigate();
  const editor = useCreateBlockNote();

  const { data } = useQuery({
    queryKey: ['notices'],
    queryFn: getNotice,
  });

  return (
    <>
      <Helmet>
        <title>끄적끄적 | 공지사항</title>
      </Helmet>
      <S.MainDashBoardLayout>
        <Navbar />
        <S.MainDashBoardContainer>
          <S.NoticeModal>
            <S.Header>
              {/* <img src={leftarrow} onClick={() => navigate(-1)} /> */}
              <S.Title>공지사항</S.Title>
            </S.Header>

            <S.NoticeContainer>
              {data?.map((item, index) => (
                <details key={item.id || index}>
                  <summary>
                    <p className="version">{item.version}</p>
                    <p className="title">{item.title}</p>
                    <p className="date">{item.createdAt?.slice(0, 10)}</p>
                  </summary>
                  <RenderEditor content={item.content ?? ''} />
                </details>
              ))}
            </S.NoticeContainer>

            <S.ContactContainer>
              <p>Copyright © KKEUJEOK. All rights reserved.</p>
              <p>kkeujeok1219@gmail.com</p>
            </S.ContactContainer>
          </S.NoticeModal>
        </S.MainDashBoardContainer>
      </S.MainDashBoardLayout>
    </>
  );
};

export default NoticePage;

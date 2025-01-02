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

const NoticePage = () => {
  const navigate = useNavigate();
  const editor = useCreateBlockNote();

  const { data } = useQuery({
    queryKey: ['notices'],
    queryFn: getNotice,
  });

  console.log(data);

  const renderEditor = async (content: string) => {
    const blocks = await editor.tryParseMarkdownToBlocks(content);
    editor.replaceBlocks(editor.document, blocks);

    return (
      // <S.StyledEditorWrapper>
      <BlockNoteView editor={editor} editable={false} theme="light" />
      // </S.StyledEditorWrapper>
    );
  };

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
              {/* <img src={leftarrow} onClick={() => navigate(-1)} />  */}
              <S.Title>공지사항</S.Title>
            </S.Header>

            <S.NoticeContainer>
              {data?.map((item, index) => (
                <details key={item.id || index}>
                  <summary>
                    <p className="version">{item.version}</p>
                    <p className="title">{item.title}</p>
                    <p className="date">{item.createdAt}</p>
                  </summary>
                  {item.content}
                </details>
              ))}
              <details>
                <summary>
                  <p className="version">[v1.3.2]</p>
                  <p className="title">제목</p>
                  <p className="date">2024.12.12</p>
                </summary>
              </details>

              <details>
                <summary>
                  <p className="version">[v1.3.2]</p>
                  <p className="title">제목</p>
                  <p className="date">2024.12.12</p>
                </summary>
                여기에 자세한 내용을 작성합니다.
              </details>

              <details>
                <summary>
                  <p className="version">[v1.3.2]</p>
                  <p className="title">제목</p>
                  <p className="date">2024.12.12</p>
                </summary>
                여기에 자세한 내용을 작성합니다.
              </details>

              <details>
                <summary>
                  <p className="version">[v1.3.2]</p>
                  <p className="title">제목</p>
                  <p className="date">2024.12.12</p>
                </summary>
                여기에 자세한 내용을 작성합니다.
              </details>

              <details>
                <summary>
                  <p className="version">[v1.3.2]</p>
                  <p className="title">제목</p>
                  <p className="date">2024.12.12</p>
                </summary>
                여기에 자세한 내용을 작성합니다. 여기에 자세한 내용을 작성합니다. 여기에 자세한
                내용을 작성합니다. 여기에 자세한 내용을 작성합니다. 여기에 자세한 내용을 작성합니다.
                여기에 자세한 내용을 작성합니다. 여기에 자세한 내용을 작성합니다. 여기에 자세한
                내용을 작성합니다. 여기에 자세한 내용을 작성합니다. 여기에 자세한 내용을 작성합니다.
                여기에 자세한 내용을 작성합니다. 여기에 자세한 내용을 작성합니다. 여기에 자세한
                내용을 작성합니다. 여기에 자세한 내용을 작성합니다. 여기에 자세한 내용을 작성합니다.
                여기에 자세한 내용을 작성합니다. 여기에 자세한 내용을 작성합니다. 여기에 자세한
                내용을 작성합니다. 여기에 자세한 내용을 작성합니다. 여기에 자세한 내용을 작성합니다.
                여기에 자세한 내용을 작성합니다. 여기에 자세한 내용을 작성합니다. 여기에 자세한
                내용을 작성합니다. 여기에 자세한 내용을 작성합니다. 여기에 자세한 내용을 작성합니다.
                여기에 자세한 내용을 작성합니다. 여기에 자세한 내용을 작성합니다. 여기에 자세한
                내용을 작성합니다. 여기에 자세한 내용을 작성합니다. 여기에 자세한 내용을 작성합니다.
              </details>

              <details>
                <summary>
                  <p className="version">[v1.3.2]</p>
                  <p className="title">제목</p>
                  <p className="date">2024.12.12</p>
                </summary>
                여기에 자세한 내용을 작성합니다.
              </details>

              <details>
                <summary>
                  <p className="version">[v1.3.2]</p>
                  <p className="title">제목</p>
                  <p className="date">2024.12.12</p>
                </summary>
                여기에 자세한 내용을 작성합니다.
              </details>

              <details>
                <summary>
                  <p className="version">[v1.3.2]</p>
                  <p className="title">제목</p>
                  <p className="date">2024.12.12</p>
                </summary>
                여기에 자세한 내용을 작성합니다.
              </details>

              <details>
                <summary>
                  <p className="version">[v1.3.2]</p>
                  <p className="title">제목</p>
                  <p className="date">2024.12.12</p>
                </summary>
                여기에 자세한 내용을 작성합니다.
              </details>
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

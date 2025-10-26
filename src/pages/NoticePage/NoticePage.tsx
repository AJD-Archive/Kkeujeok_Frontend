import { BlockNoteView } from '@blocknote/mantine';
import { useCreateBlockNote } from '@blocknote/react';
import { useQuery } from '@tanstack/react-query';

import { getNotice } from '../../api/NoticeApi';
import Navbar from '../../components/Navbar';
import * as S from './NoticePageStyled';

const RenderEditor = ({ content }: { content: string }) => {
  const editor = useCreateBlockNote();

  const blocks = editor.tryParseMarkdownToBlocks(content ?? '');
  editor.replaceBlocks(editor.document, blocks);

  if (!content) return <p>내용이 없습니다.</p>;

  return <BlockNoteView editable={false} editor={editor} theme='light' />;
};

const NoticePage = () => {
  const editor = useCreateBlockNote();
  console.log(editor);

  const { data } = useQuery({
    queryKey: ['notices'],
    queryFn: getNotice,
  });

  return (
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
                  <p className='version'>{item.version}</p>
                  <p className='title'>{item.title}</p>
                  <p className='date'>{item.createdAt?.slice(0, 10)}</p>
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
  );
};

export default NoticePage;

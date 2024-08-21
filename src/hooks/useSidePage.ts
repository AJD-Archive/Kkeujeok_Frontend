import { useState, useEffect } from 'react';
import { useCreateBlockNote } from '@blocknote/react';
import { BlockNoteEditor } from '@blocknote/core';

// 훅의 반환값 타입 정의
export interface SidePageState {
  title: string;
  startDate: Date | null;
  endDate: Date | null;
  markdown: string;
  handleTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDateChange: (date: Date | null, type: 'start' | 'end') => void;
  onChange: () => void;
  editor: BlockNoteEditor | null;
}

export const useSidePage = (): SidePageState => {
  const [title, setTitle] = useState<string>(''); // 제목
  const [startDate, setStartDate] = useState<Date | null>(() => {
    const now = new Date();
    return new Date(now.setHours(0, 0, 0, 0));
  }); // 시작 날짜 (default: 생성날짜 00시 00분)
  const [endDate, setEndDate] = useState<Date | null>(() => {
    const now = new Date();
    return new Date(now.setHours(23, 59, 59, 999));
  }); // 종료 날짜 (default: 생성날짜 23시 59분)
  const [markdown, setMarkdown] = useState<string>(''); // 본문 (마크다운 지원)

  const editor = useCreateBlockNote({}); // block-note 라이브러리 사용

  // 본문 작성 함수
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  // 날짜 변경 함수
  const onDateChange = (date: Date | null, type: 'start' | 'end') => {
    if (type === 'start') {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
  };

  // 본문 작성 함수
  const onChange = async () => {
    if (editor) {
      const markdownContent = await editor.blocksToMarkdownLossy(editor.document);
      setMarkdown(markdownContent);
    }
  };

  useEffect(() => {
    const updateContent = async () => {
      if (editor) {
        const markdownContent = await editor.blocksToMarkdownLossy(editor.document);
        setMarkdown(markdownContent);
      }
    };

    updateContent();
  }, [editor]);

  if (!editor) {
    return {
      title,
      startDate,
      endDate,
      markdown,
      handleTitleChange,
      onDateChange,
      onChange,
      editor: null,
    };
  }

  return { title, startDate, endDate, markdown, handleTitleChange, onDateChange, onChange, editor };
};

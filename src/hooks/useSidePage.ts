import { useState, useEffect } from 'react';
import { useCreateBlockNote } from '@blocknote/react';
import { BlockNoteEditor } from '@blocknote/core';
import { patchPersonalBlock } from '../api/PersonalBlockApi';
import { useDebounce } from './useDebounce';

// 훅의 반환값 타입 정의
export interface SidePageState {
  data: {
    title: string;
    startDate: Date | null;
    endDate: Date | null;
    markdown: string;
    progress: string;
  };
  handleTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDateChange: (date: Date | null, type: 'start' | 'end') => void;
  onChange: () => void;
  editor: BlockNoteEditor | null;
  SubmitData: () => void;
}

export const useSidePage = (progress: string): SidePageState => {
  // progress 매핑 함수
  const progressMapping: { [key: string]: string } = {
    '시작 전': 'NOT_STARTED',
    '진행 중': 'IN_PROGRESS',
    완료: 'COMPLETED',
  };

  const [data, setData] = useState({
    title: '',
    startDate: new Date(new Date().setHours(0, 0, 0, 0)), // 시작 날짜 (default: 생성날짜 00시 00분)
    endDate: new Date(new Date().setHours(23, 59, 59, 999)), // 종료 날짜 (default: 생성날짜 23시 59분)
    markdown: '',
    progress: progressMapping[progress] || 'NOT_STARTED',
  });

  const editor = useCreateBlockNote({}); // block-note 라이브러리 사용

  // 제목 변경 함수
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData(prevData => ({
      ...prevData,
      title: event.target.value,
    }));
  };

  // 날짜 포맷 함수
  const formatDate = (date: Date | null): string => {
    if (!date) return '';

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}.${month}.${day} ${hours}:${minutes}`;
  };

  // 날짜 변경 함수
  const onDateChange = (date: Date | null, type: 'start' | 'end') => {
    setData(prevData => ({
      ...prevData,
      [type === 'start' ? 'startDate' : 'endDate']: date,
    }));
  };

  // 본문 작성 함수
  const onChange = async () => {
    if (editor) {
      const markdownContent = await editor.blocksToMarkdownLossy(editor.document);
      setData(prevData => ({
        ...prevData,
        markdown: markdownContent,
      }));
    }
  };

  // debounce : 300ms 입력이 감지되지 않으면 자동 저장
  const debouncedData = useDebounce(data, 300);

  useEffect(() => {
    // console.log('debouce!');
    SubmitData();
  }, [debouncedData]);

  // patch api 요청
  const SubmitData = () => {
    const startDateStr = formatDate(data.startDate);
    const endDateStr = formatDate(data.endDate);
    // console.log(`${data.title} / ${startDateStr} / ${endDateStr} / ${data.markdown}`);

    const patchData = {
      dashboardId: 1,
      title: data.title,
      contents: data.markdown,
      progress: data.progress,
      startDate: startDateStr,
      deadLine: endDateStr,
    };

    patchPersonalBlock(patchData);
    // console.log(patchData);
  };

  return {
    data,
    handleTitleChange,
    onDateChange,
    onChange,
    editor,
    SubmitData,
  };
};

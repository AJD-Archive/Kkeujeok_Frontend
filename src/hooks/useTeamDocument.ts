import { useState, useEffect } from 'react';
import { useCreateBlockNote } from '@blocknote/react';
import { BlockNoteEditor } from '@blocknote/core';
import { getPersonalBlock, patchPersonalBlock } from '../api/PersonalBlockApi';
import { useDebounce } from './useDebounce';
import { BlockListResDto } from '../types/PersonalBlock';

// 훅의 반환값 타입 정의
export interface SidePageState {
  data: BlockListResDto;
  handleTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDateChange: (date: Date | null, type: 'start' | 'end') => void;
  onChange: () => void;
  editor: BlockNoteEditor | null;
  SubmitData: () => void;
  parseDate: (dateString?: string | null) => Date | null;
}

export const useTeamDocument = (blockId: string | undefined, progress: string): SidePageState => {
  const [data, setData] = useState<BlockListResDto>({});

  // 블록 에디터 초기화
  const editor = useCreateBlockNote();

  useEffect(() => {
    const fetchDataAndInitializeEditor = async () => {
      if (blockId) {
        try {
          // 데이터 가져오기
          const fetchedData = await getPersonalBlock(blockId);
          if (fetchedData) {
            setData(fetchedData);
          }

          // 에디터 초기화
          if (editor && fetchedData?.contents) {
            const blocks = await editor.tryParseMarkdownToBlocks(fetchedData.contents);
            editor.replaceBlocks(editor.document, blocks);
          }
        } catch (error) {
          console.error('Error fetching data or initializing editor:', error);
        }
      }
    };

    fetchDataAndInitializeEditor();
  }, [blockId, editor]); // blockId와 editor가 변경될 때만 실행

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

  // 날짜 변환 함수
  // string을 Date로 변환하는 함수
  const parseDate = (dateString?: string | null): Date | null => {
    return dateString ? new Date(dateString) : null;
  };

  // DatePicker의 날짜 선택 핸들러
  const handleDateChange = (date: Date | null, type: 'start' | 'end') => {
    setData(prevData => ({
      ...prevData,
      [type === 'start' ? 'startDate' : 'deadLine']: date ? date.toISOString() : null,
    }));
  };

  // startDate가 deadLine보다 이후로 설정되면 deadLine을 startDate로 변경
  useEffect(() => {
    if (data.startDate && data.deadLine) {
      const start = new Date(data.startDate);
      const end = new Date(data.deadLine);
      if (start > end) {
        setData(prevData => ({
          ...prevData,
          deadLine: start.toISOString(),
        }));
      }
    }
  }, [data.startDate]);

  // 본문 작성 함수
  const onChange = async () => {
    if (editor) {
      const markdownContent = await editor.blocksToMarkdownLossy(editor.document);
      setData(prevData => ({
        ...prevData,
        contents: markdownContent,
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
    // 날짜를 string | null | undefined에서 Date | null로 변환
    const startDate = parseDate(data.startDate);
    const endDate = parseDate(data.deadLine);

    // 날짜를 포맷하여 문자열로 변환
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);

    // 포맷된 날짜를 포함하여 요청할 데이터 객체 생성
    const patchData = {
      ...data,
      startDate: formattedStartDate,
      deadLine: formattedEndDate,
    };

    // patch 요청 수행
    // patchPersonalBlock(blockId, patchData);
  };

  return {
    data,
    handleTitleChange,
    onChange,
    editor,
    SubmitData,
    handleDateChange,
    parseDate,
  };
};

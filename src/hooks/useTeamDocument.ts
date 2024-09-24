import { useState, useEffect } from 'react';
import { useCreateBlockNote } from '@blocknote/react';
import { BlockNoteEditor } from '@blocknote/core';
import { useDebounce } from './useDebounce';
import { BlockListResDto } from '../types/PersonalBlock';
import {
  getTeamDocumentCategories,
  getTeamDocumentDetail,
  patchTeamDocument,
} from '../api/TeamDocumentApi';

export interface SidePageState {
  data: TeamDocument;
  categories: string[];
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChange: () => void;
  editor: BlockNoteEditor | null;
  SubmitData: () => void;
}

export const useTeamDocument = (
  teamDashboardId: string,
  teamDocumentId: string,
  progress: string
): SidePageState => {
  const [data, setData] = useState<TeamDocument>({});
  const [categories, setCategories] = useState<string[]>([]);

  // 블록 에디터 초기화
  const editor = useCreateBlockNote();

  useEffect(() => {
    const fetchDataAndInitializeEditor = async () => {
      if (teamDocumentId) {
        try {
          // 데이터 가져오기
          const fetchedData = await getTeamDocumentDetail(teamDocumentId);
          console.log(fetchedData);
          if (fetchedData) {
            setData(fetchedData);
          }

          // 카테고리 가져오기
          const fetchedCategories = await getTeamDocumentCategories(teamDashboardId);
          console.log(fetchedCategories);
          if (fetchedCategories) {
            setCategories(fetchedCategories);
          }

          // 에디터 초기화
          if (editor && fetchedData?.content) {
            const blocks = await editor.tryParseMarkdownToBlocks(fetchedData.content);
            editor.replaceBlocks(editor.document, blocks);
          }
        } catch (error) {
          console.error('Error fetching data or initializing editor:', error);
        }
      }
    };

    fetchDataAndInitializeEditor();
  }, [teamDocumentId, editor]); // blockId와 editor가 변경될 때만 실행

  // 제목, 카테고리 변경 함수
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 본문 작성 함수
  const onChange = async () => {
    if (editor) {
      const markdownContent = await editor.blocksToMarkdownLossy(editor.document);
      setData(prevData => ({
        ...prevData,
        content: markdownContent,
      }));
    }
  };

  // debounce : 300ms 입력이 감지되지 않으면 자동 저장
  const debouncedData = useDebounce(data, 300);

  useEffect(() => {
    console.log('debouce!');
    SubmitData();
  }, [debouncedData]);

  // patch api 요청
  const SubmitData = () => {
    // patch 요청 수행
    patchTeamDocument(data);
  };

  return {
    data,
    categories,
    handleInputChange,
    onChange,
    editor,
    SubmitData,
  };
};

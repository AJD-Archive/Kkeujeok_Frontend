import { TItems, TPages } from '../utils/columnsConfig';
import { useState, useEffect } from 'react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getPersonalBlock } from '../api/BoardApi';
import { getDeleteBlock } from '../api/PersonalBlockApi';
import { useAtom } from 'jotai';
import { fetchTriggerAtom } from '../contexts/atoms';

type PageState = {
  todo: number; // 할 일 페이지 번호
  doing: number; // 진행 중인 일 페이지 번호
  completed: number; // 완료된 일 페이지 번호
};

export default function useItems(dashboardId: string, pageParam: PageState, pathname: string) {
  const [fetchTrigger] = useAtom(fetchTriggerAtom);

  const {
    data: NotStarted,
    fetchNextPage: fetchNextNotStarted,
    hasNextPage: hasMoreNotStarted,
  } = useInfiniteQuery({
    queryKey: ['NOT_STARTED', dashboardId, fetchTrigger, pathname],
    queryFn: ({ pageParam }) => {
      const todo = pageParam; // 객체에서 todo 페이지 번호를 가져옴
      return getPersonalBlock(dashboardId, todo, 10, 'NOT_STARTED');
    },
    initialPageParam: 0,
    getNextPageParam: lastPage => {
      const currentPage = lastPage?.pageInfoResDto?.currentPage ?? 0;
      const totalPages = lastPage?.pageInfoResDto?.totalPages ?? 1;

      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
  });
  const {
    data: InProgress,
    fetchNextPage: fetchNextInProgress,
    hasNextPage: hasMoreInProgress,
  } = useInfiniteQuery({
    queryKey: ['IN_PROGRESS', dashboardId, fetchTrigger, pathname],
    queryFn: ({ pageParam }) => {
      const doing = pageParam; // 객체에서 todo 페이지 번호를 가져옴
      return getPersonalBlock(dashboardId, doing, 10, 'IN_PROGRESS');
    },
    initialPageParam: 0,
    getNextPageParam: lastPage => {
      const currentPage = lastPage?.pageInfoResDto?.currentPage ?? 0;
      const totalPages = lastPage?.pageInfoResDto?.totalPages ?? 1;

      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
  });

  const {
    data: Completed,
    fetchNextPage: fetchNextCompleted,
    hasNextPage: hasMoreCompleted,
  } = useInfiniteQuery({
    queryKey: ['COMPLETED', dashboardId, fetchTrigger, pathname],
    queryFn: ({ pageParam }) => {
      const completed = pageParam; // 객체에서 todo 페이지 번호를 가져옴
      return getPersonalBlock(dashboardId, completed, 10, 'COMPLETED');
    },
    initialPageParam: 0,
    getNextPageParam: lastPage => {
      const currentPage = lastPage?.pageInfoResDto?.currentPage ?? 0;
      const totalPages = lastPage?.pageInfoResDto?.totalPages ?? 1;

      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
  });

  const { data: DeletedBlock } = useQuery({
    queryKey: ['DeletedBlock', dashboardId, fetchTrigger, pathname],
    queryFn: () => getDeleteBlock(dashboardId),
  });
  // const [items, setItems] = useState();
  const [items, setItems] = useState<TItems>({
    todo: NotStarted?.pages[0]?.blockListResDto || [],
    doing: InProgress?.pages[0]?.blockListResDto || [],
    completed: Completed?.pages[0]?.blockListResDto || [],
    delete: DeletedBlock?.blockListResDto || [],
    icon: DeletedBlock?.blockListResDto || [],
  });

  const [blockTotal, setBlockTotal] = useState<TPages>({
    todo: NotStarted?.pages[0]?.pageInfoResDto.totalItems || 0,
    doing: InProgress?.pages[0]?.pageInfoResDto.totalItems || 0,
    completed: Completed?.pages[0]?.pageInfoResDto.totalItems || 0,
    delete: DeletedBlock?.pageInfoResDto.totalItems || 0,
  });

  useEffect(() => {
    if (NotStarted) {
      const allNotStartedItems = NotStarted.pages.flatMap(page => page?.blockListResDto || []);
      setItems(prevItems => ({
        ...prevItems,
        todo: allNotStartedItems,
      }));
    }
  }, [NotStarted]);

  useEffect(() => {
    if (InProgress) {
      const allInProgressItems = InProgress.pages.flatMap(page => page?.blockListResDto || []);
      setItems(prevItems => ({
        ...prevItems,
        doing: allInProgressItems,
      }));
    }
  }, [InProgress]);

  useEffect(() => {
    if (Completed) {
      const allCompletedItems = Completed.pages.flatMap(page => page?.blockListResDto || []);
      setItems(prevItems => ({
        ...prevItems,
        completed: allCompletedItems,
      }));
    }
  }, [Completed]);

  useEffect(() => {
    setItems(prevItems => ({
      ...prevItems,
      delete: DeletedBlock?.blockListResDto || [],
    }));
  }, [DeletedBlock]);

  //블록 갯수 새로고침시 자꾸 기본값 0으로 불러와져서 비동기 데이터 제대로 불러오기 위한 useEffect 코드
  useEffect(() => {
    if (NotStarted) {
      setBlockTotal(prevTotal => ({
        ...prevTotal,
        todo: NotStarted.pages[0]?.pageInfoResDto.totalItems || 0,
      }));
    }
  }, [NotStarted]);

  useEffect(() => {
    if (InProgress) {
      setBlockTotal(prevTotal => ({
        ...prevTotal,
        doing: InProgress.pages[0]?.pageInfoResDto.totalItems || 0,
      }));
    }
  }, [InProgress]);

  useEffect(() => {
    if (Completed) {
      setBlockTotal(prevTotal => ({
        ...prevTotal,
        completed: Completed.pages[0]?.pageInfoResDto.totalItems || 0,
      }));
    }
  }, [Completed]);

  useEffect(() => {
    if (DeletedBlock) {
      setBlockTotal(prevTotal => ({
        ...prevTotal,
        delete: DeletedBlock?.pageInfoResDto.totalItems || 0,
      }));
    }
  }, [DeletedBlock]);

  return {
    items,
    setItems,
    fetchNextNotStarted,
    hasMoreNotStarted,
    fetchNextInProgress,
    hasMoreInProgress,
    fetchNextCompleted,
    hasMoreCompleted,
    blockTotal,
    setBlockTotal,
  };
}

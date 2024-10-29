import { TItems } from '../utils/columnsConfig';
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
  // console.log(NotStarted);

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

  return {
    items,
    setItems,
    fetchNextNotStarted,
    hasMoreNotStarted,
    fetchNextInProgress,
    hasMoreInProgress,
    fetchNextCompleted,
    hasMoreCompleted,
  };
}

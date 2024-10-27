import { TItems } from '../utils/columnsConfig';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getPersonalBlock } from '../api/BoardApi';
import { getDeleteBlock } from '../api/PersonalBlockApi';

export default function useItems(dashboardId: string) {
  const { data: NotStarted } = useQuery({
    queryKey: ['NOT_STARTED', dashboardId],
    queryFn: () => getPersonalBlock(dashboardId, 0, 10, 'NOT_STARTED'),
  });
  const { data: InProgress } = useQuery({
    queryKey: ['IN_PROGRESS', dashboardId],
    queryFn: () => getPersonalBlock(dashboardId, 0, 10, 'IN_PROGRESS'),
  });
  const { data: COMPLETED } = useQuery({
    queryKey: ['COMPLETED', dashboardId],
    queryFn: () => getPersonalBlock(dashboardId, 0, 10, 'COMPLETED'),
  });
  const { data: DeletedBlock } = useQuery({
    queryKey: ['DeletedBlock', dashboardId],
    queryFn: () => getDeleteBlock(dashboardId),
  });
  const [items, setItems] = useState<TItems>({
    todo: NotStarted?.blockListResDto || [],
    doing: InProgress?.blockListResDto || [],
    completed: COMPLETED?.blockListResDto || [],
    delete: DeletedBlock?.blockListResDto || [],
  });
  useEffect(() => {
    setItems({
      todo: NotStarted?.blockListResDto || [],
      doing: InProgress?.blockListResDto || [],
      completed: COMPLETED?.blockListResDto || [],
      delete: DeletedBlock?.blockListResDto || [],
    });
  }, [NotStarted, InProgress, COMPLETED, DeletedBlock]);

  return { items, setItems };
}

import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { getPersonalBlock } from '../api/BoardApi';
import { getDeleteBlock } from '../api/PersonalBlockApi';
import type { TItems } from '../utils/columnsConfig';

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
  // Set items with fetched data
  const [items, setItems] = useState<TItems>({
    todo: NotStarted?.blockListResDto || [],
    doing: InProgress?.blockListResDto || [],
    completed: COMPLETED?.blockListResDto || [],
    delete: DeletedBlock?.blockListResDto || [],
    icon: DeletedBlock?.blockListResDto || [],
  });

  // Update items whenever the fetched data changes
  useEffect(() => {
    // Todo: 해당 라인 수정해야함.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setItems({
      todo: NotStarted?.blockListResDto || [],
      doing: InProgress?.blockListResDto || [],
      completed: COMPLETED?.blockListResDto || [],
      delete: DeletedBlock?.blockListResDto || [],
      icon: DeletedBlock?.blockListResDto || [],
    });
  }, [NotStarted, InProgress, COMPLETED, DeletedBlock]);

  return { items, setItems };
}

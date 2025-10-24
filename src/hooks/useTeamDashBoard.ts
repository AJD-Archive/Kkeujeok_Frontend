/*
 * 팀 대시보드 조회 커스텀 훅
 */

import { useEffect, useState } from 'react';

import { searchTeamDashBoard } from '../api/BoardApi';
import type { TeamDashboardResponse } from '../types/TeamDashBoard';

const useTeamDashBoard = () => {
  const [teamDashboard, setTeamDashboard] = useState<TeamDashboardResponse>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await searchTeamDashBoard(); // 서버에서 데이터를 받아옵니다.
        setTeamDashboard(data); // 받아온 데이터를 상태에 저장합니다.
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return { teamDashboard };
};

export default useTeamDashBoard;

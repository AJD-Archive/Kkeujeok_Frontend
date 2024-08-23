/*
 * 사용자 정보 훅
 */

import { useEffect, useState } from 'react';
import { UserInfo } from '../types/UserInfo';
import { userInfoApi } from '../api/UserApi';

const useInfo = () => {
  const [info, setInfo] = useState<UserInfo>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await userInfoApi(); // 서버에서 데이터를 받아옵니다.
        setInfo(data); // 받아온 데이터를 상태에 저장합니다.
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return { info };
};

export default useInfo;

import type { ReactNode } from 'react';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { axiosInstance } from '../utils/apiConfig';

// 유저 정보 타입 정의
interface UserInfo {
  id: string;
  name: string;
  email: string;
}

// AuthContext 타입 정의
interface AuthContextType {
  userInfo: UserInfo | null;
  login: ({ accessToken, refreshToken }: { accessToken: string; refreshToken: string }) => void;
  logout: () => void;
}

// 초기 값 정의
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const fetchMemberInfo = async () => {
    try {
      const response = await axiosInstance.get(`${import.meta.env.VITE_API_BASE_URL}/members/mypage`);
      // console.log(response);
      setUserInfo(response.data.data);
    } catch (error) {
      console.error('유저 정보를 가져오는데 실패했습니다.', error);
      setUserInfo(null);
    }
  };

  const fetchLogout = async () => {
    try {
      await axiosInstance.post(`/logout`);
    } catch (error) {
      console.error('로그아웃 실패', error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      // Todo: 해당 라인 수정해야함.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchMemberInfo();
    } else {
      setUserInfo(null);
    }
  }, []);

  const login = ({ accessToken, refreshToken }: { accessToken: string; refreshToken: string }) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    fetchMemberInfo();
  };

  const logout = async () => {
    const isConfirmed = window.confirm('정말 로그아웃 하시겠습니까?');
    if (isConfirmed) {
      await fetchLogout();
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setUserInfo(null);
      alert('로그아웃 성공!');
    } else {
      alert('로그아웃 취소');
    }
  };

  const value: AuthContextType = {
    userInfo,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

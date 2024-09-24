import { Navigate } from 'react-router-dom';

// * 로그인되지 않았는데 url 조작으로 접근을 방지 (로컬 스토리지에 저장된 토큰 확인)
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  if (!localStorage.getItem('accessToken')) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;

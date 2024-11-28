import Navbar from './Navbar';
import * as S from '../styles/MainPageStyled';

interface DashBoardLayoutProps {
  children: React.ReactNode; // children의 타입을 명시합니다.
}
const DashBoardLayout = ({ children }: DashBoardLayoutProps) => {
  return (
    <>
      <S.MainDashBoardLayout>
        <Navbar />
        <S.MainDashBoardContainer>{children}</S.MainDashBoardContainer>
      </S.MainDashBoardLayout>
    </>
  );
};
export default DashBoardLayout;

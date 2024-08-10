import { Link } from 'react-router-dom';
import rightarrow from '../img/rightarrow.png';
import * as S from '../styles/NavBarStyled';
import Dashboard from './Dashboard';
import Profile from './Profile';

const Navbar = () => {
  return (
    <S.NavBarLayout>
      <div>
        <S.UserInfoContainer>
          <Profile width="45px" height="45px" />
          <S.UserDetailContainer>
            <p>홍길동님</p>

            <Link to="/mypage">
              마이페이지 <img src={rightarrow} alt="마이페이지 이동 화살표" />
            </Link>
          </S.UserDetailContainer>
        </S.UserInfoContainer>
        <S.ButtonContainer>
          <S.NavButton variant="primary">대시보드 생성</S.NavButton>
          <S.NavButton variant="secondary">도전! 챌린지</S.NavButton>
        </S.ButtonContainer>
      </div>
      <S.DashboardsContainer>
        <Dashboard text="개인" />
        <Dashboard text="팀" />
      </S.DashboardsContainer>
    </S.NavBarLayout>
  );
};
export default Navbar;

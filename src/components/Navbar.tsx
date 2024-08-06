import rightarrow from '../assets/images/rightarrow.png';
import * as S from '../styles/NavBarStyled';
import Dashboard from './Dashboard';

const Navbar = () => {
  return (
    <S.NavBarLayout>
      <div>
        <S.UserInfoContainer>
          <S.ProfileImageWrapper>
            <img />
          </S.ProfileImageWrapper>
          <S.UserDetailContainer>
            <p>홍길동님</p>
            <a>
              마이페이지 <img src={rightarrow} alt="마이페이지 이동 화살표" />
            </a>
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

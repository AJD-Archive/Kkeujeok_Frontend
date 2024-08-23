import { Link } from 'react-router-dom';
import rightarrow from '../img/rightarrow.png';
import * as S from '../styles/NavBarStyled';
import Dashboard from './Dashboard';
import Profile from './Profile';
import { usePersonalDashBoardSearch } from '../hooks/usePersonalDashBoard';
import useTeamDashBoard from '../hooks/useTeamDashBoard';
import useInfo from '../hooks/useInfo';

const Navbar = () => {
  const { dashboard } = usePersonalDashBoardSearch();
  const { teamDashboard } = useTeamDashBoard();
  const { info } = useInfo();
  return (
    <S.NavBarLayout>
      <div>
        <S.UserInfoContainer>
          <Profile width="45px" height="45px" profile={info?.data.picture} />
          <S.UserDetailContainer>
            <p>{info?.data.nickName}</p>

            <Link to="/mypage">
              마이페이지 <img src={rightarrow} alt="마이페이지 이동 화살표" />
            </Link>
          </S.UserDetailContainer>
        </S.UserInfoContainer>
        <S.ButtonContainer>
          <Link to="/createBoard">
            <S.NavButton variant="primary">대시보드 생성</S.NavButton>
          </Link>
          <S.NavButton variant="secondary">도전! 챌린지</S.NavButton>
        </S.ButtonContainer>
      </div>
      <S.DashboardsContainer>
        <Dashboard text="개인" dashboard={dashboard?.data.personalDashboardListResDto} />
        <Dashboard text="팀" dashboard={teamDashboard?.data.teamDashboardInfoResDto} />
      </S.DashboardsContainer>
    </S.NavBarLayout>
  );
};
export default Navbar;

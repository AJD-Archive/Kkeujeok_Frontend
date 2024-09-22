import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import rightarrow from '../img/rightarrow.png';
import * as S from '../styles/NavBarStyled';
import Dashboard from './Dashboard';
import Profile from './Profile';
import { usePersonalDashBoardSearch } from '../hooks/usePersonalDashBoard';
import useTeamDashBoard from '../hooks/useTeamDashBoard';
import { useQuery } from '@tanstack/react-query';
import { userInfoApi } from '../api/UserApi';
import { useAtom } from 'jotai';
import { nicknameAtom } from '../contexts/NickName';

const Navbar = () => {
  const { dashboard } = usePersonalDashBoardSearch();
  const { teamDashboard } = useTeamDashBoard();
  const { data: UserInfo, refetch } = useQuery({ queryKey: ['userinfo'], queryFn: userInfoApi });
  const [nickname, setNickname] = useAtom(nicknameAtom);

  // 닉네임을 API에서 받아와서 atom에 저장
  useEffect(() => {
    if (UserInfo?.data.nickName && nickname === null) {
      setNickname(UserInfo.data.nickName);
    }
  }, [UserInfo, nickname, setNickname]);

  return (
    <S.NavBarLayout>
      <div>
        <S.UserInfoContainer>
          <Profile width="45px" height="45px" profile={UserInfo?.data.picture} />
          <S.UserDetailContainer>
            <p>{nickname}</p> {/* 닉네임을 atom에서 가져와 출력 */}
            <Link to="/mypage">
              마이페이지 <img src={rightarrow} alt="마이페이지 이동 화살표" />
            </Link>
          </S.UserDetailContainer>
        </S.UserInfoContainer>
        <S.ButtonContainer>
          <Link to="/createBoard">
            <S.NavButton variant="primary">대시보드 생성</S.NavButton>
          </Link>
          <Link to="/challenge">
            <S.NavButton variant="secondary">도전! 챌린지</S.NavButton>
          </Link>
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

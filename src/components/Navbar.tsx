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
import { searchPersonalDashBoard, searchTeamDashBoard } from '../api/BoardApi';
import { navbarUpdateTriggerAtom } from '../contexts/atoms';
import { unreadCount } from '../contexts/sseAtom';

const Navbar = () => {
  const { data: dashboard } = useQuery({
    queryKey: ['personalDashboard'],
    queryFn: searchPersonalDashBoard,
  });
  const { data: teamDashboard, refetch } = useQuery({
    queryKey: ['teamDashBoard'],
    queryFn: searchTeamDashBoard,
  });
  const { data: UserInfo, refetch: refetchTeamDashboard } = useQuery({
    queryKey: ['userinfo'],
    queryFn: userInfoApi,
  });

  const [nickname, setNickname] = useAtom(nicknameAtom);
  const [update] = useAtom(navbarUpdateTriggerAtom);

  // 닉네임을 API에서 받아와서 atom에 저장
  useEffect(() => {
    if (UserInfo?.data.nickName && nickname === null) {
      setNickname(UserInfo.data.nickName);
    }
  }, [UserInfo, nickname, setNickname]);

  //네브바 렌더링 트리거
  useEffect(() => {
    refetch();
  }, [update]);
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

      <S.NoticeContainer>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 8C18.7956 8 19.5587 8.31607 20.1213 8.87868C20.6839 9.44129 21 10.2044 21 11C21 11.7956 20.6839 12.5587 20.1213 13.1213C19.5587 13.6839 18.7956 14 18 14M10 8V19C10 19.2652 9.89464 19.5196 9.70711 19.7071C9.51957 19.8946 9.26522 20 9 20H8C7.73478 20 7.48043 19.8946 7.29289 19.7071C7.10536 19.5196 7 19.2652 7 19V14"
            stroke="#D1D1D1"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 7.99995L16.524 4.22995C16.6555 4.12046 16.8154 4.0507 16.9851 4.02885C17.1548 4.00701 17.3271 4.03398 17.482 4.1066C17.6369 4.17922 17.7679 4.29449 17.8597 4.4389C17.9514 4.5833 18.0001 4.75087 18 4.92195V17.0779C18.0001 17.249 17.9514 17.4166 17.8597 17.561C17.7679 17.7054 17.6369 17.8207 17.482 17.8933C17.3271 17.9659 17.1548 17.9929 16.9851 17.971C16.8154 17.9492 16.6555 17.8794 16.524 17.7699L12 13.9999H4C3.73478 13.9999 3.48043 13.8946 3.29289 13.7071C3.10536 13.5195 3 13.2652 3 12.9999V8.99995C3 8.73473 3.10536 8.48038 3.29289 8.29284C3.48043 8.1053 3.73478 7.99995 4 7.99995H12Z"
            stroke="#D1D1D1"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <p>공지사항</p>
      </S.NoticeContainer>
    </S.NavBarLayout>
  );
};

export default Navbar;

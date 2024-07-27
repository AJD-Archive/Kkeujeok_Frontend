import styled from 'styled-components';
import theme from '../styles/Theme/Theme';
import rightarrow from '../assets/images/rightarrow.png';
import NavButton from './NavButton';
import Dashboard from './Dashboard';

const Navbar = () => {
  return (
    <NavBarLayout>
      <UserInfoContainer>
        <ProfileImageWrapper>
          <img />
        </ProfileImageWrapper>
        <UserDetailContainer>
          <p>홍길동님</p>
          <a>
            마이페이지 <img src={rightarrow} alt="마이페이지 이동 화살표" />
          </a>
        </UserDetailContainer>
      </UserInfoContainer>
      <ButtonContainer>
        <NavButton variant="primary">대시보드 생성</NavButton>
        <NavButton variant="secondary">도전! 챌린지</NavButton>
      </ButtonContainer>
      <DashboardsContainer>
        <Dashboard text="개인" />
        <Dashboard text="팀" />
      </DashboardsContainer>
    </NavBarLayout>
  );
};
export default Navbar;

const NavBarLayout = styled.nav`
  width: 12.5rem;
  min-width: 12.5rem;
  background: ${theme.color.navbar};
  padding: 2.5625rem 1.625rem;
`;

const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-bottom: 2.5rem;
`;

const ProfileImageWrapper = styled.div`
  width: 45px;
  height: 45px;
  background-color: ${theme.color.black};
  border-radius: 50%;
`;

const UserDetailContainer = styled.div`
  p {
    font-size: ${theme.font.size.main};
    font-weight: ${theme.font.weight.medium};
    margin-bottom: 4px;
  }

  a {
    display: flex;
    align-items: center;
    font-size: ${theme.font.size.caption};
    font-weight: ${theme.font.weight.light};
    color: ${theme.color.gray};
  }

  img {
    width: 12px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.875rem;
`;

const DashboardsContainer = styled.div``;

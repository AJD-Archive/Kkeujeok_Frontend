import Graph from '../components/Graph';
import Flex from './Flex';
import setting from '../img/setting.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import addbutton from '../img/addbutton.png';
import leftarrow from '../img/leftarrow.png';
import * as S from '../styles/HeaderStyled';
import { dashboardType } from '../contexts/DashboardAtom';

type Props = {
  mainTitle: string;
  subTitle: string;
  blockProgress: number;
};

const Header = ({ mainTitle, subTitle, blockProgress }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBackClick = () => {
    navigate(-1);
  };

  // URL에 "teamdocument"가 포함되어 있는지 확인하는 함수
  // => 전역 변수로 개인 대시보드인지 팀 대시보드인지 확인할 예정이라 주석 처리
  // const teamLocationUrl = location.pathname.includes('teamdocument') ?? true;
  return (
    <>
      <Flex justifyContent="space-between" gap={100} margin="0 0 0.875rem 0">
        <S.HeaderContentContainer>
          <Flex alignItems="flex-start">
            {!dashboardType && (
              <S.LeftArrowWrapper>
                <img src={leftarrow} onClick={handleBackClick} />
              </S.LeftArrowWrapper>
            )}
            <div>
              <Flex margin="0px 0px 6px 0px">
                <S.TitleWrapper>{mainTitle}</S.TitleWrapper>
                <S.SettingImgWrapper>
                  <img src={setting} alt="설정 이미지" />
                </S.SettingImgWrapper>
              </Flex>
              <S.SubtitleWrapper>{subTitle}</S.SubtitleWrapper>
            </div>
          </Flex>
        </S.HeaderContentContainer>
        <Flex>
          <Graph blockProgress={blockProgress} />
          {!dashboardType && (
            <Link to="/teamdocument">
              <S.TeamDocButton>팀문서</S.TeamDocButton>
            </Link>
          )}
          {!dashboardType && (
            <S.AddbuttonWrapper>
              <img src={addbutton}></img>
            </S.AddbuttonWrapper>
          )}
        </Flex>
      </Flex>
      <hr></hr>
    </>
  );
};
export default Header;

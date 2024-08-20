import Graph from '../components/Graph';
import Flex from './Flex';
import setting from '../img/setting.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import addbutton from '../img/addbutton.png';
import leftarrow from '../img/leftarrow.png';
import * as S from '../styles/HeaderStyled';

type Props = {
  mainTitle: string;
  subTitle: string;
};

const Header = ({ mainTitle, subTitle }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBackClick = () => {
    navigate(-1);
  };

  // URL에 "teamdocument"가 포함되어 있는지 확인하는 함수
  const teamLocationUrl = location.pathname.includes('teamdocument') ?? true;
  return (
    <>
      <Flex justifyContent="space-between" gap={100} margin="0 0 0.875rem 0">
        <S.HeaderContentContainer>
          <Flex alignItems="flex-start">
            {teamLocationUrl && (
              <S.LeftArrowWrapper>
                <img src={leftarrow} onClick={handleBackClick} />
              </S.LeftArrowWrapper>
            )}
            <div>
              <Flex margin="0px 0px 6px 0px">
                <S.TitleWrapper>{mainTitle}</S.TitleWrapper>
                {!teamLocationUrl && (
                  <S.SettingImgWrapper>
                    <img src={setting} alt="설정 이미지" />
                  </S.SettingImgWrapper>
                )}
              </Flex>
              <S.SubtitleWrapper>{subTitle}</S.SubtitleWrapper>
            </div>
          </Flex>
        </S.HeaderContentContainer>
        <Flex>
          {!teamLocationUrl && (
            <>
              <Graph />
              <Link to="/teamdocument">
                <S.TeamDocButton>팀문서</S.TeamDocButton>
              </Link>
            </>
          )}
          {teamLocationUrl && (
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

import { Link, useLocation } from 'react-router-dom';

import Graph from '../components/Graph';
import setting from '../img/setting.png';
import * as S from '../styles/HeaderStyled';
import type { TPages } from '../utils/columnsConfig';
import Flex from './Flex';

type Props = {
  mainTitle?: string;
  subTitle?: string;
  dashboardType?: boolean;
  blockTotal?: TPages;
};

const Header = ({ mainTitle, subTitle, dashboardType, blockTotal }: Props) => {
  const location = useLocation();
  const dashboardId = location.pathname.split('/')[2];

  // URL에 "teamdocument"가 포함되어 있는지 확인하는 함수
  // => 전역 변수로 개인 대시보드인지 팀 대시보드인지 확인할 예정이라 주석 처리
  // const teamLocationUrl = location.pathname.includes('teamdocument') ?? true;
  return (
    <>
      <Flex gap={100} justifyContent='space-between' margin='0 0 0.875rem 0'>
        <S.HeaderContentContainer>
          <Flex alignItems='flex-start'>
            {/* {!dashboardType && (
              <S.LeftArrowWrapper>
                <img src={leftarrow} onClick={handleBackClick} />
              </S.LeftArrowWrapper>
            )} */}
            <div>
              <Flex margin='0px 0px 6px 0px'>
                <S.TitleWrapper>{mainTitle}</S.TitleWrapper>
                <S.SettingImgWrapper>
                  {dashboardType ? (
                    <Link to={`/createPersonalBoard/${dashboardId}`}>
                      <img alt='설정 이미지' src={setting} />
                    </Link>
                  ) : (
                    <Link to={`/createTeamBoard/${dashboardId}`}>
                      <img alt='설정 이미지' src={setting} />
                    </Link>
                  )}
                </S.SettingImgWrapper>
              </Flex>
              <S.SubtitleWrapper>{subTitle}</S.SubtitleWrapper>
            </div>
          </Flex>
        </S.HeaderContentContainer>
        <Flex>
          {blockTotal && <Graph blockTotal={blockTotal} />}
          {!dashboardType && (
            <Link to={`/${dashboardId}/teamdocument`}>
              <S.TeamDocButton>팀문서</S.TeamDocButton>
            </Link>
          )}
        </Flex>
      </Flex>
      <hr />
    </>
  );
};
export default Header;

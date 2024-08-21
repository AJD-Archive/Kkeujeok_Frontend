import { useNavigate, Outlet } from 'react-router-dom';
import Block from './Block';
import * as S from '../styles/DashboardStyled';
import { useAtom } from 'jotai';
import { visibleAtom } from '../contexts/sideScreenAtom';
import SidePage from '../pages/SidePage';

type Props = {
  backGroundColor?: string;
  highlightColor?: string;
  progress?: string;
  imgSrc?: string;
};

const DashboardCard = ({ backGroundColor, highlightColor, progress, imgSrc }: Props) => {
  const navigate = useNavigate();
  const [visibleValue, _] = useAtom(visibleAtom);

  const handleAddBtn = () => {
    console.log(progress);
    navigate(`/side/1`, { state: { highlightColor, progress } });
  };

  return (
    <S.CardContainer backGroundColor={backGroundColor}>
      <header>
        <S.StatusBarContainer highlightColor={highlightColor}>
          <span>{progress}</span>
        </S.StatusBarContainer>
        <S.AddButtonWrapper onClick={handleAddBtn}>
          <img src={imgSrc} alt="블록 더하는 버튼" />
        </S.AddButtonWrapper>
      </header>
      <section>
        <Block />
      </section>
      <Outlet />
    </S.CardContainer>
  );
};
export default DashboardCard;

/*
* 블록 생성시 필요한 정보
{
  "dashboardId" : 1,
  "title" : "Title",
  "contents" : "Contents",
  "progress" : "NOT_STARTED",
  "deadLine" : "2024.08.03 13:23"
}

! 플러스 버튼을 눌렀을때 빈 title, contents, deadLine이 들어간 post 요청을 보내고,
! 사이드 페이지에서 1분 마다 자동 저장 + 다른 페이지로 넘어가면 자동 저장은 patch 요청
*/

import { useNavigate, Outlet } from 'react-router-dom';
import Block from './Block';
import * as S from '../styles/DashboardStyled';
import { createPersonalBlock } from '../api/PersonalBlockApi';

type Props = {
  backGroundColor?: string;
  highlightColor?: string;
  progress?: string;
  imgSrc?: string;
};

const InProgressDashboard = ({ backGroundColor, highlightColor, progress, imgSrc }: Props) => {
  const navigate = useNavigate();

  // + 버튼 누르면 사이드 페이지로 이동
  const handleAddBtn = async () => {
    // 초기 post 요청은 빈 내용으로 요청. 추후 patch로 자동 저장.
    const now = new Date();
    const deadLine = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')} 23:59`;

    const data = {
      dashboardId: 1,
      title: '',
      contents: '',
      progress: 'IN_PROGRESS',
      deadLine: deadLine,
    };

    const blockId = await createPersonalBlock(data);
    // console.log(blockId);

    navigate(`/personalBlock/${blockId}`, { state: { highlightColor, progress } });
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
export default InProgressDashboard;

import { useNavigate, Outlet } from 'react-router-dom';
import Block from './Block';
import * as S from '../styles/DashboardStyled';
import { createPersonalBlock } from '../api/PersonalBlockApi';
import { useAtom } from 'jotai';
import { visibleAtom } from '../contexts/sideScreenAtom';
import SidePage from '../pages/SidePage';
import { Droppable } from 'react-beautiful-dnd';
import theme from '../styles/Theme/Theme';
import main3 from '../img/main3.png';

type Props = {
  list: string[];
  id: string;
};

const NotStartedDashboard = ({ list, id }: Props) => {
  const navigate = useNavigate();

  const settings = {
    backGroundColor: '#E8FBFF',
    highlightColor: theme.color.main3,
    progress: '시작 전',
    imgSrc: main3,
  };

  // + 버튼 누르면 사이드 페이지로 이동
  const handleAddBtn = async () => {
    // 초기 post 요청은 빈 내용으로 요청. 추후 patch로 자동 저장.
    const now = new Date();
    const deadLine = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')} 23:59`;

    const data = {
      dashboardId: 1,
      title: '',
      contents: '',
      progress: 'NOT_STARTED',
      deadLine: deadLine,
    };

    const blockId = await createPersonalBlock(data);
    // console.log(blockId);

    const { highlightColor, progress } = settings;
    navigate(`/personalBlock/${blockId}`, { state: { highlightColor, progress } });
  };

  return (
    <S.CardContainer backGroundColor={settings.backGroundColor}>
      <header>
        <S.StatusBarContainer highlightColor={settings.highlightColor}>
          <span>{settings.progress}</span>
        </S.StatusBarContainer>
        <S.AddButtonWrapper onClick={handleAddBtn}>
          <img src={settings.imgSrc} alt="블록 더하는 버튼" />
        </S.AddButtonWrapper>
      </header>
      <Droppable droppableId={id}>
        {provided => (
          <S.BoxContainer
            ref={provided.innerRef}
            className="container"
            {...provided.droppableProps}
          >
            {list.map((text, index) => (
              <Block key={text} index={index} text={text} />
            ))}
            {provided.placeholder}
          </S.BoxContainer>
        )}
      </Droppable>
      <Outlet />
    </S.CardContainer>
  );
};
export default NotStartedDashboard;

import { useNavigate, Outlet } from 'react-router-dom';
import Block from './Block';
import * as S from '../styles/DashboardStyled';
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
  const [visibleValue, _] = useAtom(visibleAtom);

  const settings = {
    backGroundColor: '#E8FBFF',
    highlightColor: theme.color.main3,
    progress: '시작 전',
    imgSrc: main3,
  };

  const handleAddBtn = () => {
    const { highlightColor, progress } = settings;
    console.log(settings.progress);
    navigate(`/side/1`, { state: { highlightColor, progress } });
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

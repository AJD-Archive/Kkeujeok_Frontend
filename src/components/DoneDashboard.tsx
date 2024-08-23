import { useNavigate, Outlet } from 'react-router-dom';
import Block from './Block';
import * as S from '../styles/DashboardStyled';
import { useAtom } from 'jotai';
import { visibleAtom } from '../contexts/sideScreenAtom';
import SidePage from '../pages/SidePage';
import { Droppable } from 'react-beautiful-dnd';

type Props = {
  backGroundColor?: string;
  highlightColor?: string;
  progress?: string;
  imgSrc?: string;
  list: string[];
  id: string;
};

const DoneDashboard = ({ backGroundColor, highlightColor, progress, imgSrc, id, list }: Props) => {
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
      <Droppable droppableId={id}>
        {provided => (
          <S.BoxContainer ref={provided.innerRef} className={id} {...provided.droppableProps}>
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
export default DoneDashboard;

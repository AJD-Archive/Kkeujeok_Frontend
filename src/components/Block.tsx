import Flex from './Flex';
import edit from '../img/edit.png';
import deleteicon from '../img/delete.png';
import profile from '../img/kakaoprofileimage.png';
import * as S from '../styles/DashboardStyled';
import { Draggable } from 'react-beautiful-dnd';

type Props = {
  text: string;
  index: number;
};
const Block = ({ text, index }: Props) => {
  return (
    <Draggable draggableId={text} key={text} index={index}>
      {provided => (
        <S.BlockContainer
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Flex gap="6px" justifyContent="flex-end">
            <S.ImageIconWrapper>
              <img src={edit} alt="편집 버튼" />
            </S.ImageIconWrapper>
            <S.ImageIconWrapper>
              <img src={deleteicon} alt="편집 버튼" />
            </S.ImageIconWrapper>
          </Flex>
          <Flex justifyContent="space-between" margin="0 0 8px 0">
            <h3>{text}</h3>
            <span>D-10</span>
          </Flex>
          {/* <p>집에서 빨래 바구니의 옷을 가지고 세탁실에...</p> */}
          <Flex>
            <S.ProfileImageWrapper>
              <img src={profile} />
            </S.ProfileImageWrapper>
            <span>명디우</span>
          </Flex>
        </S.BlockContainer>
      )}
    </Draggable>
  );
};
export default Block;

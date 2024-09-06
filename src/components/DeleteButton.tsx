import { useState } from 'react';
import deleteicon from '../img/delete2.png';
import * as S from '../styles/MainPageStyled';
import { Droppable } from 'react-beautiful-dnd';
import Block from './Block';
import { BlockListResDto } from '../types/PersonalBlock';

interface Props {
  id: string;
  list: BlockListResDto[];
}
const DeleteButton = ({ id, list }: Props) => {
  const [value, setValue] = useState(false);
  const onValueFunction = () => {
    setValue(value => !value);
  };

  return (
    <S.DeleteContainer>
      {value && (
        <Droppable droppableId={id}>
          {provided => (
            <S.DeleteDiv ref={provided.innerRef} className="container" {...provided.droppableProps}>
              <h1>휴지통</h1>
              {list.map(({ title, blockId, contents, dDay, dashboardId }, index) => (
                // <Block key={text} index={index}  />
                <Block
                  key={index}
                  title={title}
                  blockId={blockId}
                  contents={contents}
                  dDay={dDay}
                  dashboardId={dashboardId}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </S.DeleteDiv>
          )}
        </Droppable>
      )}
      <S.DeleteIconWrapper onClick={onValueFunction}>
        <img src={deleteicon} alt="휴지통아이콘" />
      </S.DeleteIconWrapper>
    </S.DeleteContainer>
  );
};
export default DeleteButton;

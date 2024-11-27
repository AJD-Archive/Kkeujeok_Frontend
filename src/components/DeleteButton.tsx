import { useEffect, useState } from 'react';
import deleteicon from '../img/delete2.png';
import * as S from '../styles/MainPageStyled';
import { Droppable } from 'react-beautiful-dnd';
import Block from './Block';
import { BlockListResDto, DeletedBlockList } from '../types/PersonalBlock';

interface Props {
  id: string;
  list: BlockListResDto[];
  removeValue: boolean;
}
const DeleteButton = ({ id, list, removeValue }: Props) => {
  const [value, setValue] = useState(false);
  const [blockId, setBlockId] = useState<string>('');

  const onValueFunction = () => {
    setValue(value => !value);
  };

  const onBlockIdHandler = (num: string | null | undefined) => {
    if (num) setBlockId(num);
  };

  return (
    <S.DeleteContainer>
      {value && (
        <Droppable droppableId={id}>
          {provided => (
            <S.DeleteDiv ref={provided.innerRef} className="container" {...provided.droppableProps}>
              <h1>휴지통</h1>
              <S.BoxContainer>
                {list.map(
                  (
                    { title, blockId, contents, dDay, dashboardId, dType, nickname, picture, type },
                    index
                  ) => (
                    <S.BlockEntireContainer key={index}>
                      <Block
                        key={index}
                        title={title}
                        blockId={blockId}
                        contents={contents}
                        dDay={dDay}
                        dashboardId={dashboardId}
                        index={index}
                        remove={true}
                        onBlockIdHandler={onBlockIdHandler}
                        removeValue={removeValue}
                        dType={dType}
                        name={nickname}
                        picture={picture}
                        type={type ?? ''}
                      />
                    </S.BlockEntireContainer>
                  )
                )}
              </S.BoxContainer>
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

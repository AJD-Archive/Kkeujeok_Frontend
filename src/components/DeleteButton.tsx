import { useEffect, useState } from 'react';
import deleteicon from '../img/delete2.png';
import * as S from '../styles/MainPageStyled';
import { Droppable } from 'react-beautiful-dnd';
import Block from './Block';
import { BlockListResDto } from '../types/PersonalBlock';
import CustomModal from './CustomModal';

interface Props {
  id: string;
  list: BlockListResDto[];
}
const DeleteButton = ({ id, list }: Props) => {
  const [value, setValue] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [blockId, setBlockId] = useState<string>('');

  const onValueFunction = () => {
    setValue(value => !value);
  };
  const onModalHandler = () => {
    setIsModalOpen(prev => !prev);
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
                {list.map(({ title, blockId, contents, dDay, dashboardId }, index) => (
                  <Block
                    key={index}
                    title={title}
                    blockId={blockId}
                    contents={contents}
                    dDay={dDay}
                    dashboardId={dashboardId}
                    index={index}
                    remove={true}
                    onModal={onModalHandler}
                    onBlockIdHandler={onBlockIdHandler}
                  />
                ))}
              </S.BoxContainer>
              {provided.placeholder}
            </S.DeleteDiv>
          )}
        </Droppable>
      )}
      <S.DeleteIconWrapper onClick={onValueFunction}>
        <img src={deleteicon} alt="휴지통아이콘" />
      </S.DeleteIconWrapper>
      {isModalOpen && (
        <CustomModal
          title="블록 이름을 삭제 하시겠습니까?"
          subTitle="삭제 이후 되돌릴 수 없습니다."
          onClose={onModalHandler}
          blockId={blockId}
          removeapi={true}
        />
      )}
    </S.DeleteContainer>
  );
};
export default DeleteButton;

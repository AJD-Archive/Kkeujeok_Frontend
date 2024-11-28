import { useEffect, useState } from 'react';
import deleteicon from '../img/delete2.png';
import * as S from '../styles/MainPageStyled';
import { Droppable } from 'react-beautiful-dnd';
import Block from './Block';
import { BlockListResDto } from '../types/PersonalBlock';
import Flex from './Flex';
import useModal from '../hooks/useModal';
import CustomModal from './CustomModal';
import { useLocation } from 'react-router-dom';
import { entireDeleteBlock } from '../api/PersonalBlockApi';
import { useAtom } from 'jotai';
import { fetchTriggerAtom } from '../contexts/atoms';

interface Props {
  id: string;
  list: BlockListResDto[];
  removeValue: boolean;
}
const DeleteButton = ({ id, list, removeValue }: Props) => {
  const [isHovering, setIsHovering] = useState(false);
  const { isModalOpen, openModal, handleYesClick, handleNoClick } = useModal();
  const [value, setValue] = useState(false);
  const [, setBlockId] = useState<string>('');
  const [, setFetchTrigger] = useAtom(fetchTriggerAtom);
  const location = useLocation();
  const dashboardId = location.pathname.split('/')[2];

  const onValueFunction = () => {
    setValue(value => !value);
  };

  const onBlockIdHandler = (num: string | null | undefined) => {
    if (num) setBlockId(num);
  };

  const onEntireDeleteBlock = async () => {
    if (dashboardId) await entireDeleteBlock(dashboardId);
    setFetchTrigger(prev => prev + 1); // 상태를 변경하여 MainPage에서 데이터를 다시 불러오도록 트리거
  };
  const onDeleteHandler = () => {
    openModal('yes', onEntireDeleteBlock);
  };
  const onDragEnter = () => {
    setIsHovering(true);
    console.log('아니 되는거 맞음?');
  };

  const onDragLeave = () => {
    setIsHovering(false);
  };
  useEffect(() => {
    handleNoClick();
  }, [location]);

  return (
    <S.DeleteContainer>
      {value && (
        <Droppable droppableId={id}>
          {provided => (
            <S.DeleteDiv ref={provided.innerRef} className="container" {...provided.droppableProps}>
              <Flex alignItems="center" margin="0 0 1rem 0" justifyContent="space-between">
                <h1>휴지통</h1>
                <button onClick={onDeleteHandler}>전체 삭제</button>
              </Flex>
              <S.BoxContainer>
                {list.map(
                  (
                    { title, blockId, contents, dDay, dashboardId, dType, nickname, picture },
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
      <Droppable droppableId="icon">
        {(provided, snapshot) => (
          <div>
            <S.DeleteIconWrapper
              onClick={onValueFunction}
              onDragEnter={onDragEnter}
              onDragLeave={onDragLeave}
              style={{
                backgroundColor: snapshot.isDraggingOver ? '#6a6a6a' : '#f4f4f4',
                width: snapshot.isDraggingOver ? '5rem' : '3.375rem',
                height: snapshot.isDraggingOver ? '5rem' : '3.375rem',
                transition: 'background-color 0.3s ease, width 0.3s ease, height 0.3s ease',
              }}
            >
              <img ref={provided.innerRef} src={deleteicon} alt="휴지통아이콘" />
            </S.DeleteIconWrapper>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      {isModalOpen && (
        <CustomModal
          title="전체삭제를 하시겠습니까?"
          subTitle="전체삭제를 하면 블록은 되돌릴 수 없습니다."
          onYesClick={handleYesClick}
          onNoClick={handleNoClick}
        />
      )}
    </S.DeleteContainer>
  );
};
export default DeleteButton;

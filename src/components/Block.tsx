import Flex from './Flex';
import edit from '../img/edit.png';
import deleteicon from '../img/delete.png';
import * as S from '../styles/DashboardStyled';
import { Draggable } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';
import CustomModal from './CustomModal';
import { dashboardType } from '../contexts/DashboardAtom';
import { Link } from 'react-router-dom';
import Profile from './Profile';

type Props = {
  blockId: string | null | undefined;
  title: string | undefined;
  index: number;
  contents: string | undefined;
  dDay: number | undefined;
  dashboardId: string | undefined;
  remove?: boolean;
  onModal?: () => void;
  onBlockIdHandler?: (num: string) => void;
  onRestoreTextHandler?: () => void;
  onDeleteTextHandler?: () => void;
  removeValue?: boolean;
  dType: string;
  name: string;
};

const Block = ({
  title,
  index,
  blockId,
  contents,
  dDay,
  remove,
  onModal,
  onBlockIdHandler,
  removeValue,
  dType,
  name,
}: Props) => {
  const updatedBlockId = blockId ? (parseInt(blockId, 10) + 1).toString() : '1';
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate(`personalBlock/${blockId}`);
  };
  //완전 삭제 로직
  const onremoveHandler = () => {
    if (blockId && onBlockIdHandler && onModal) {
      onBlockIdHandler(blockId);
      // if (onRestoreTextHandler) onRestoreTextHandler();
      // onModal();
    }
  };
  //복구 로직
  const onRestoreFunc = () => {
    if (blockId && onBlockIdHandler && onModal) {
      onBlockIdHandler(blockId);
      // if (onDeleteTextHandler) onDeleteTextHandler();
      // onModal();
    }
  };
  return (
    <Draggable draggableId={updatedBlockId} key={updatedBlockId} index={index}>
      {provided => (
        <S.BlockEntireContainer>
          <S.BlockContainer
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick={() => {
              if (!removeValue) {
                clickHandler();
              }
            }}
          >
            <Flex gap="6px" justifyContent="flex-end">
              <S.ImageIconWrapper>
                <img src={edit} alt="편집 버튼" />
              </S.ImageIconWrapper>
              <S.ImageIconWrapper>
                <img src={deleteicon} alt="편집 버튼" />
              </S.ImageIconWrapper>
            </Flex>
            <Flex justifyContent="space-between">
              <h3>{title}</h3>
              <span>D-{dDay}</span>
            </Flex>
            {dType === 'PersonalDashboard' ? (
              <p>{contents}</p>
            ) : (
              <Flex>
                <S.ProfileImageWrapper>
                  <Profile width="" height="" profile="" />
                </S.ProfileImageWrapper>
                <span>{name}</span>
              </Flex>
            )}
          </S.BlockContainer>
          {removeValue && (
            <Flex flexDirection="column" justifyContent="space-around">
              <button onClick={onRestoreFunc}>복구</button>
              <button onClick={onremoveHandler}>삭제</button>
            </Flex>
          )}
        </S.BlockEntireContainer>
      )}
    </Draggable>
  );
};
export default Block;

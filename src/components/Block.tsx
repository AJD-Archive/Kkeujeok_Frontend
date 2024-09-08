import Flex from './Flex';
import edit from '../img/edit.png';
import deleteicon from '../img/delete.png';
import * as S from '../styles/DashboardStyled';
import { Draggable } from 'react-beautiful-dnd';
import { Link, useBlocker, useNavigate } from 'react-router-dom';
import CustomModal from './CustomModal';
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
}: Props) => {
  const updatedBlockId = blockId ? (parseInt(blockId, 10) + 1).toString() : '1';
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate(`personalBlock/${blockId}`);
  };
  const onremoveHandler = () => {
    if (blockId && onBlockIdHandler && onModal) {
      onBlockIdHandler(blockId);
      onModal();
    }
  };
  return (
    <Draggable draggableId={updatedBlockId} key={updatedBlockId} index={index}>
      {provided => (
        <S.BlockContainer
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={remove ? onremoveHandler : clickHandler}
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
            <h3>{title}</h3>
            <span>D-{dDay}</span>
          </Flex>
          <p>{contents}</p>
          <Flex>
            {/* <S.ProfileImageWrapper>
              <img src={profile} />
            </S.ProfileImageWrapper>
            <span>{blockId}</span> */}
          </Flex>
        </S.BlockContainer>
      )}
    </Draggable>
  );
};
export default Block;

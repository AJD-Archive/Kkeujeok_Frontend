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
import useModal from '../hooks/useModal';
import { realDeleteBlock, restoreBlockFunc } from '../api/PersonalBlockApi';
import { useState } from 'react';

type Props = {
  blockId: string | null | undefined;
  title: string | undefined;
  index: number;
  contents: string | undefined;
  dDay: number | undefined;
  dashboardId: string | undefined;
  remove?: boolean;
  onBlockIdHandler?: (num: string) => void;
  onRestoreTextHandler?: () => void;
  onDeleteTextHandler?: () => void;
  removeValue?: boolean;
  dType: string | undefined;
  name: string | undefined;
};

const Block = ({
  title,
  index,
  blockId,
  contents,
  dDay,
  remove,
  onBlockIdHandler,
  removeValue,
  dType,
  name,
}: Props) => {
  const [isRemove, setIsRemove] = useState(true);
  const { isModalOpen, openModal, handleYesClick, handleNoClick } = useModal();
  const updatedBlockId = blockId ? (parseInt(blockId, 10) + 1).toString() : '1';
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate(`personalBlock/${blockId}`);
  };

  //모달 삭제에 전달할 함수
  const removeFunc = () => {
    if (blockId) realDeleteBlock(blockId);
  };

  //모달 복구에 전달할 함수
  const restoreFunc = () => {
    if (blockId) restoreBlockFunc(blockId);
  };

  //완전 삭제 로직
  const onremoveHandler = () => {
    setIsRemove(true);
    openModal('yes', removeFunc);
  };

  //복구 로직
  const onRestoreFunc = () => {
    setIsRemove(false);
    openModal('yes', restoreFunc);
  };

  return (
    <>
      <Draggable draggableId={updatedBlockId} key={updatedBlockId} index={index}>
        {provided => (
          <>
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
              <S.GridBlockStyle>
                <div>
                  <button onClick={onRestoreFunc}>복구</button>
                  <button onClick={onremoveHandler}>삭제</button>
                </div>
              </S.GridBlockStyle>
            )}
          </>
        )}
      </Draggable>
      {isModalOpen && isRemove && (
        <CustomModal
          title="블록을 삭제하시겠습니까?"
          subTitle="한 번 삭제된 블록은 되돌릴 수 없습니다"
          onYesClick={handleYesClick}
          onNoClick={handleNoClick}
        />
      )}
      {isModalOpen && !isRemove && (
        <CustomModal
          title="블록을 복구하시겠습니까?"
          subTitle="블록을 복구하시면 전의 상태로 되돌아갑니다"
          onYesClick={handleYesClick}
          onNoClick={handleNoClick}
        />
      )}
    </>
  );
};
export default Block;

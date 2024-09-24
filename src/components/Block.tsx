import Flex from './Flex';
import * as S from '../styles/DashboardStyled';
import { Draggable } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';
import CustomModal from './CustomModal';
import Profile from './Profile';
import useModal from '../hooks/useModal';
import { getPersonalBlock, realDeleteBlock, restoreBlockFunc } from '../api/PersonalBlockApi';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { fetchTriggerAtom } from '../contexts/atoms';

type Props = {
  blockId: string | null | undefined;
  title: string | undefined;
  index: number;
  contents: string | undefined;
  dDay: number | undefined;
  dashboardId: string | undefined;
  remove?: boolean;
  onBlockIdHandler?: (num: string) => void;
  removeValue?: boolean;
  dType: string | undefined;
  name: string | undefined;
  picture?: string;
};

const Block = ({
  title,
  index,
  blockId,
  contents,
  dDay,
  remove = false,
  onBlockIdHandler,
  removeValue,
  dType,
  name,
  picture,
}: Props) => {
  const [isRemove, setIsRemove] = useState(true);
  const { isModalOpen, openModal, handleYesClick, handleNoClick } = useModal();
  const updatedBlockId = blockId ? (parseInt(blockId, 10) + 1).toString() : '1';
  const [, setFetchTrigger] = useAtom(fetchTriggerAtom); // 트리거 업데이트 함수 가져오기
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate(`personalBlock/${blockId}`);
  };
  const removeFunc = async () => {
    if (blockId) {
      await realDeleteBlock(blockId); // 블록을 삭제하는 API 호출
      setFetchTrigger(prev => prev + 1); // 상태를 변경하여 MainPage에서 데이터를 다시 불러오도록 트리거
    }
  };

  //모달 복구에 전달할 함수
  const restoreFunc = async () => {
    if (blockId) await restoreBlockFunc(blockId);
    setFetchTrigger(prev => prev + 1); // 상태를 변경하여 MainPage에서 데이터를 다시 불러오도록 트리거
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
              marginValue={remove ? '0' : '1'}
              dayCount={dDay ?? 999}
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
                <span>D-{dDay === -1 ? 0 : dDay}</span>
              </Flex>
              {dType === 'PersonalDashboard' ? (
                <p>{contents}</p>
              ) : (
                <Flex>
                  <S.ProfileImageWrapper>
                    <Profile width="" height="" profile={picture} />
                  </S.ProfileImageWrapper>
                  <S.UserName>{name}</S.UserName>
                </Flex>
              )}
            </S.BlockContainer>
            {removeValue && (
              <S.GridBlockStyle>
                <button onClick={onRestoreFunc}>복구</button>
                <button onClick={onremoveHandler}>삭제</button>
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

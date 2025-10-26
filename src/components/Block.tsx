import { useAtom } from 'jotai';
import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';

import { realDeleteBlock, restoreBlockFunc } from '../api/PersonalBlockApi';
import { fetchTriggerAtom } from '../contexts/atoms';
import useModal from '../hooks/useModal';
import * as S from '../styles/DashboardStyled';
import CustomModal from './CustomModal';
import Flex from './Flex';
import Profile from './Profile';

type Props = {
  blockId: string | null | undefined;
  title: string | undefined;
  index: number;
  contents: string | undefined;
  dDay: string | undefined;
  dashboardId: string | undefined;
  remove?: boolean;
  onBlockIdHandler?: (num: string) => void;
  removeValue?: boolean;
  dType: string | undefined;
  name: string | undefined;
  picture?: string;
  progress?: string;
  highlightColor?: string;
  type?: string;
};

const Block = ({
  title,
  index,
  blockId,
  contents,
  dDay,
  remove = false,
  removeValue,
  dType,
  name,
  picture,
  progress,
  highlightColor,
  type,
}: Props) => {
  const [isRemove, setIsRemove] = useState(true);
  const { isModalOpen, openModal, handleYesClick, handleNoClick } = useModal();
  const updatedBlockId = blockId ? (parseInt(blockId, 10) + 1).toString() : '1';
  const [, setFetchTrigger] = useAtom(fetchTriggerAtom); // 트리거 업데이트 함수 가져오기
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate(`${blockId}`, {
      state: { highlightColor, progress },
    });
  };
  const removeFunc = async () => {
    if (blockId) {
      await realDeleteBlock(blockId); // 블록을 삭제하는 API 호출
      setFetchTrigger((prev) => prev + 1); // 상태를 변경하여 MainPage에서 데이터를 다시 불러오도록 트리거
    }
  };

  //모달 복구에 전달할 함수
  const restoreFunc = async () => {
    if (blockId) await restoreBlockFunc(blockId);
    setFetchTrigger((prev) => prev + 1); // 상태를 변경하여 MainPage에서 데이터를 다시 불러오도록 트리거
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
      <Draggable key={updatedBlockId} draggableId={updatedBlockId} index={index}>
        {(provided) => (
          <>
            <S.BlockContainer
              ref={provided.innerRef}
              dayCount={
                dDay
                  ? dDay === 'D-Day'
                    ? 0
                    : !isNaN(parseInt(dDay.replace('D-', '-').replace('D+', '')))
                      ? parseInt(dDay.replace('D-', '-').replace('D+', ''))
                      : 999
                  : 999
              }
              isDone={progress === '완료'}
              marginValue={remove ? '0' : '1'}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              onClick={() => {
                if (!removeValue) {
                  clickHandler();
                }
              }}
            >
              {type === 'CHALLENGE' && (
                <S.ChallengeTypeWrapper>
                  <p>도전! 챌린지</p>
                </S.ChallengeTypeWrapper>
              )}

              <Flex justifyContent='space-between'>
                <h3>{title}</h3>
                <span>{dDay}</span>
              </Flex>
              {dType === 'PersonalDashboard' ? (
                <p>{contents}</p>
              ) : (
                <Flex>
                  <S.ProfileImageWrapper>
                    <Profile height='' profile={picture} width='' />
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
          subTitle='한 번 삭제된 블록은 되돌릴 수 없습니다'
          title='블록을 삭제하시겠습니까?'
          onNoClick={handleNoClick}
          onYesClick={handleYesClick}
        />
      )}
      {isModalOpen && !isRemove && (
        <CustomModal
          subTitle='블록을 복구하시면 전의 상태로 되돌아갑니다'
          title='블록을 복구하시겠습니까?'
          onNoClick={handleNoClick}
          onYesClick={handleYesClick}
        />
      )}
    </>
  );
};
export default Block;

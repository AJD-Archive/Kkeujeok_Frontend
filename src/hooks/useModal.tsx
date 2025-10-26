/*
* 모달창 사용법
1) 비즈니스 로직
openModal()에 원하는 버튼과 원하는 함수를 최대 2쌍 (즉 총 인수 4개) 넣을 수 있음
예를 들어, yes 버튼이 눌렸을때만 작동할 함수는 openModal('yes', 함수이름)
그리고 각각 다른 함수를 하고 싶다면 openModal('yes', 함수이름1, 'no', 함수이름2)
만약 특별한 함수 없이 단순 정보를 보여주기 위한 모달이라면 openModal(normal)로 어떤 버튼을 누르든 모달창이 꺼지도록 호출 가능

2) 모달창 컴포넌트 (모달창 조건과 title, subTitle만 변경. 나머지 고정)
      {isModalOpen && isEmptyModalOpen && (
        <CustomModal
          title="모든 칸을 작성해주세요."
          subTitle="잠깐! 작성되지 않은 칸이 있습니다."
          onYesClick={handleYesClick}
          onNoClick={handleNoClick}
        />
      )}

3) 모달창 조건 관리 : 비즈니스 로직에서
 setIsEmptyModalOpen(true);
const handleModalClose = () => setIsEmptyModalOpen(false);
openModal('normal', handleModalClose); 
2번과 같은 모달창을 여러 조건에 따라 띄워야 한다면 조건을 on/off할 수 있도록 상태 함수를 콜백으로 전달 받는다.
그리고 openModal()함수가 종료됨에 따라 해당 조건을 다시 off로 바꿔, 모달창 여러 개가 취소되더라도 섞이지 않도록 한다.
*/
import { useState } from 'react';

type ModalAction = 'yes' | 'no' | 'normal';

export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [actionHandlers, setActionHandlers] = useState<{
    [key in ModalAction]: (() => void) | null;
  }>({
    yes: null,
    no: null,
    normal: null,
  });

  // 콜백 함수 추가
  const [onCloseCallback, setOnCloseCallback] = useState<(() => void) | null>(null);

  const openModal = (action: ModalAction, handler?: () => void, noHandler?: () => void, closeCallback?: () => void) => {
    if (action === 'yes') {
      setActionHandlers({ yes: handler || null, no: noHandler || null, normal: noHandler || null });
    } else if (action === 'no') {
      setActionHandlers({ yes: noHandler || null, no: handler || null, normal: noHandler || null });
    } else if (action === 'normal') {
      setActionHandlers({
        yes: noHandler || null,
        no: noHandler || null,
        normal: noHandler || null,
      });
    }
    setOnCloseCallback(closeCallback || null); // 콜백 함수 설정
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    if (onCloseCallback) {
      onCloseCallback(); // 모달이 닫힐 때 콜백 호출 (여러 모달창이 있을 때 조건 관리를 위한 콜백 함수)
    }
  };

  const handleYesClick = async () => {
    if (actionHandlers.yes) {
      await actionHandlers.yes(); // 사용자 정의 yes 클릭 핸들러 실행
    }
    closeModal(); // 모달을 닫음
  };

  const handleNoClick = () => {
    if (actionHandlers.no) actionHandlers.no(); // 사용자 정의 no 클릭 핸들러 실행
    closeModal(); // 모달을 닫음
  };

  return { isModalOpen, openModal, handleYesClick, handleNoClick };
};

export default useModal;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createDashBoard } from '../api/BoardApi';
import { PersonalDashBoard } from '../types/PersonalDashBoard';
import useModal from './useModal';

/*
 * 개인 대시보드 생성 커스텀 훅
 */
const usePersonalDashBoard = () => {
  const [formData, setFormData] = useState<PersonalDashBoard>({
    title: '',
    description: '',
    isPublic: false,
    category: '',
  });
  const [customCategory, setCustomCategory] = useState<string>(''); // 카테고리 옵션 중 '직접 입력' 선택시 입력 받을 커스텀 카테고리
  const { isModalOpen, openModal, closeModal } = useModal(); // 모달창 관련 훅 호출
  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  // input 데이터 설정 함수 (제목, 설명, 카테고리 - 직접 입력)
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    // 예외처리 : 카테고리 직접 입력 후, 다른 카테고리 옵션 선택 후 다시 직접 입력하려 했을 때 빈 창으로 만들기 위해
    if (name === 'category' && value !== 'userInput') {
      setCustomCategory('');
    }

    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  // 공개범위 설정 함수 (전체 공개 / 나만 보기)
  const handleScopeToggle = () => {
    setFormData(prevState => ({
      ...prevState,
      isPublic: !prevState.isPublic,
    }));
  };

  // 카테고리 설정 함수
  const handleCustomCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomCategory(event.target.value);
  };

  // 오잉?
  const validateFormData = (formData: PersonalDashBoard): boolean => {
    return Object.values(formData).some(value => value === '');
  };

  // 대시보드 생성(제출) 함수
  const submitDashboard = async () => {
    // 최종 제출시, 직접 입력으로 사용자가 카테고리를 입력했다면 해당 내용으로 제출 데이터 수정
    // formData.category에 직접 설정할 수 없는 이유 : formData.category에 customCategory를 연결하면, 현재 input창이 'userInput'의 옵션이 선택될 때만 등장하도록 설정해뒀기 떄문에.
    let finalCategory = formData.category;
    if (formData.category === 'userInput' && !customCategory) {
      finalCategory = '';
    } else if (formData.category === 'userInput') {
      finalCategory = customCategory;
    }

    const finalFormData = { ...formData, category: finalCategory };

    // 빈 작성란이 있으면 모달창 띄우기. 모두 작성되었으면 최종 제출
    if (validateFormData(finalFormData)) {
      openModal();
    } else {
      try {
        await createDashBoard(finalFormData);
        navigate('/');
      } catch (error) {
        console.error('개인 대시보드 생성시 오류 발생!', error);
      }
    }
  };

  return {
    formData,
    customCategory,
    isModalOpen,
    handleChange,
    handleScopeToggle,
    handleCustomCategoryChange,
    submitDashboard,
    closeModal,
  };
};

export default usePersonalDashBoard;

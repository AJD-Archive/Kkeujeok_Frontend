import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createDashBoard } from '../api/BoardApi';
import { PersonalDashBoard, PersonalSearchDashBoard } from '../types/PersonalDashBoard';
import { searchPersonalDashBoard, getCategories } from '../api/BoardApi';
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
  const { isModalOpen, openModal, closeModal } = useModal(); // 모달창 관련 훅 호출
  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  // * 사용자 대시보드 해시태그 불러오기
  const getCategory = () => {
    getCategories();
  };

  useEffect(() => {
    getCategory();
  }, []);

  // input 데이터 설정 함수 (제목, 설명, 카테고리 - 직접 입력)
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  // 공개범위 설정 함수 (전체 공개 / 나만 보기)
  const handleScopeToggle = () => {
    setFormData(prevState => ({
      ...prevState,
      isPublic: !prevState.isPublic,
    }));
  };

  // 제출시 빈 칸이 있나 확인하는 함수 (있다면 true)
  const validateFormData = (formData: PersonalDashBoard): boolean => {
    return Object.values(formData).some(value => value === '');
  };

  // 대시보드 생성(제출) 함수
  const submitDashboard = async () => {
    // 빈 작성란이 있으면 모달창 띄우기. 모두 작성되었으면 최종 제출
    if (validateFormData(formData)) {
      openModal();
    } else {
      try {
        await createDashBoard(formData);
        navigate('/');
      } catch (error) {
        console.error('개인 대시보드 생성시 오류 발생!', error);
      }
    }
  };

  return {
    formData,
    isModalOpen,
    handleChange,
    handleScopeToggle,
    submitDashboard,
    closeModal,
  };
};

export default usePersonalDashBoard;

/*
 * 개인 대시보드 조회 커스텀 훅
 */

const usePersonalDashBoardSearch = () => {
  const [dashboard, setDashboard] = useState<PersonalSearchDashBoard>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await searchPersonalDashBoard(); // 서버에서 데이터를 받아옵니다.
        setDashboard(data); // 받아온 데이터를 상태에 저장합니다.
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return { dashboard };
};

export { usePersonalDashBoardSearch };

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  createDashBoard,
  deletePersonalDashboard,
  getPersonalDashboard,
  patchDashBoard,
} from '../api/BoardApi';
import {
  DashboardItem,
  // PersonalDashBoard,
  PersonalSearchDashBoard,
} from '../types/PersonalDashBoard';
import { searchPersonalDashBoard, getCategories } from '../api/BoardApi';
import useModal from './useModal';

/*
 * 개인 대시보드 생성 커스텀 훅
 */
const usePersonalDashBoard = (dashboardId: string | null) => {
  const [formData, setFormData] = useState<DashboardItem>({
    title: '',
    description: '',
    isPublic: false,
    category: '',
  });
  const { isModalOpen, openModal, handleYesClick, handleNoClick } = useModal(); // 모달창 관련 훅 호출
  const [isDelModalOpen, setIsDelModalOpen] = useState<boolean>(false);
  const [isEmptyModalOpen, setIsEmptyModalOpen] = useState<boolean>(false);
  const [categoryList, setCategoryList] = useState<string[]>([]);
  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  // * 사용자 대시보드 해시태그 불러오기 & 대시보드 수정이라면 대시보드 상세 데이터 불러오기
  const fetchData = async () => {
    const list = await getCategories();
    setCategoryList(list ?? []); // getCategories에서 null이 반한되었을 때는 빈 배열로 설정

    if (dashboardId) {
      const data = await getPersonalDashboard(dashboardId);
      setFormData({
        title: data?.title ?? '', // 제목
        description: data?.description ?? '', // 설명
        isPublic: data?.isPublic ?? false, // 공개 여부
        category: data?.category ?? '', // 카테고리
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [dashboardId]);

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
  const validateFormData = (formData: DashboardItem): boolean => {
    return Object.values(formData).some(value => value === '');
  };

  // 대시보드 생성(제출) 함수
  const submitDashboard = async () => {
    // 빈 작성란이 있으면 모달창 띄우기. 모두 작성되었으면 최종 제출
    if (validateFormData(formData)) {
      setIsEmptyModalOpen(true);
      const handleModalClose = () => setIsEmptyModalOpen(false);
      openModal('normal', handleModalClose); // yes, no 모두 모달창 끄도록 호출
    } else {
      try {
        const responseDashboardId = dashboardId
          ? await patchDashBoard(dashboardId, formData) // 기존 대시보드 수정
          : await createDashBoard(formData); // 새 대시보드 생성
        navigate(`/${responseDashboardId}`); // 해당 대시보드 페이지로 이동
      } catch (error) {
        console.error('개인 대시보드 생성 및 수정시 오류 발생!', error);
      }
    }
  };

  // * 개인 대시보드 삭제 api
  const deleteDashboard = async () => {
    if (dashboardId) {
      await deletePersonalDashboard(dashboardId);
      navigate('/');
    }
  };

  // * 개인 대시보드 삭제 모달창
  const submitDelDashboard = () => {
    setIsDelModalOpen(true);
    const handleModalClose = () => setIsDelModalOpen(false);
    openModal('yes', deleteDashboard, handleModalClose); // yes 버튼이 눌릴 때만 대시보드 삭제 api 요청
  };

  return {
    formData,
    categoryList,
    isModalOpen,
    handleChange,
    handleScopeToggle,
    submitDashboard,
    handleYesClick,
    handleNoClick,
    submitDelDashboard,
    isDelModalOpen,
    isEmptyModalOpen,
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

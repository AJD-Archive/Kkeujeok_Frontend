import { FaLock } from 'react-icons/fa';
import { FaEarthAsia } from 'react-icons/fa6';
import { useLocation } from 'react-router-dom';

import CustomModal from '../components/CustomModal';
import Flex from '../components/Flex';
import Navbar from '../components/Navbar';
import usePersonalDashBoard from '../hooks/usePersonalDashBoard';
import {
  CreateDashBoardContainer,
  CreateDashBoardLayout,
  CreateDashBoardModal,
  CreateForm,
  DelBtn,
  Input,
  Label,
  RowWrapper,
  Scope,
  SubmitBtn,
  SubTitle,
  Textarea,
  Title,
} from '../styles/CreateBoardPageStyled';

const CreatePersonalBoard = () => {
  const location = useLocation();
  let dashboardId = location.pathname.split('/').pop() || null;
  if (dashboardId === 'createPersonalBoard') dashboardId = null; // dashboard 첫 생성시 dashboard id 값을 null로 만들어 줌
  const {
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
  } = usePersonalDashBoard(dashboardId); // 개인 대시보드 생성 커스텀 훅 사용

  return (
    <CreateDashBoardLayout>
      <Navbar />
      <CreateDashBoardContainer>
        <CreateDashBoardModal>
          <Title>개인 대시보드 {dashboardId ? '수정' : '생성'}</Title>
          <SubTitle>제목과 설명, 카테고리를 설정하고 공개 여부를 선택하세요.</SubTitle>

          <CreateForm>
            <RowWrapper>
              <Label>제목</Label>
              <Input
                name='title'
                placeholder='대시보드 제목을 설정해주세요.'
                type='text'
                value={formData.title}
                width='27.1rem'
                onChange={handleChange}
              />
            </RowWrapper>

            <RowWrapper>
              <Label>설명</Label>
              <Textarea
                maxLength={300}
                name='description'
                placeholder='대시보드 설명을 설정해주세요.'
                value={formData.description}
                width='27.1rem'
                onChange={handleChange}
              />
            </RowWrapper>

            {/* TODO: 사용자 카테고리 받아오기 */}
            <Flex>
              <RowWrapper>
                <Label>카테고리</Label>
                <Input
                  autoComplete='off'
                  list='categoryList'
                  name='category'
                  placeholder='대시보드 카테고리를 설정해주세요.'
                  type='text'
                  value={formData.category}
                  width='20rem'
                  onChange={handleChange}
                />
                <datalist id='categoryList'>
                  {categoryList.map((category, index) => (
                    <option key={index} value={category} />
                  ))}
                </datalist>
              </RowWrapper>

              <RowWrapper onClick={handleScopeToggle}>
                {formData.isPublic ? (
                  <Scope>
                    <p>전체 공개</p>
                    <FaEarthAsia />
                  </Scope>
                ) : (
                  <Scope>
                    <p>나만 보기</p>
                    <FaLock />
                  </Scope>
                )}
              </RowWrapper>
            </Flex>
          </CreateForm>

          <SubmitBtn onClick={submitDashboard}>대시보드 {dashboardId ? '수정' : '생성'}</SubmitBtn>

          {dashboardId && <DelBtn onClick={submitDelDashboard}>대시보드 삭제</DelBtn>}
        </CreateDashBoardModal>
      </CreateDashBoardContainer>

      {/* 작성되지 않은 부분이 있으면 모달창으로 알림 */}
      {isModalOpen && isEmptyModalOpen && (
        <CustomModal
          subTitle='잠깐! 작성되지 않은 칸이 있습니다.'
          title='모든 칸을 작성해주세요.'
          onNoClick={handleNoClick}
          onYesClick={handleYesClick}
        />
      )}

      {/* 삭제 동의 모달창 */}
      {isModalOpen && isDelModalOpen && (
        <CustomModal
          subTitle='한 번 삭제된 대시보드는 되돌릴 수 없습니다.'
          title='대시보드를 삭제하시겠습니까?'
          onNoClick={handleNoClick}
          onYesClick={handleYesClick}
        />
      )}
    </CreateDashBoardLayout>
  );
};

export default CreatePersonalBoard;

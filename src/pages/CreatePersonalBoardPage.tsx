import React from 'react';
import Navbar from '../components/Navbar';
import Flex from '../components/Flex';
import { FaLock } from 'react-icons/fa';
import { FaEarthAsia } from 'react-icons/fa6';

import CustomModal from '../components/CustomModal';
import usePersonalDashBoard from '../hooks/usePersonalDashBoard';

import {
  CreateDashBoardLayout,
  CreateDashBoardContainer,
  Title,
  SubTitle,
  CreateDashBoardModal,
  SubmitBtn,
  CreateForm,
  Label,
  Input,
  Select,
  RowWrapper,
  Scope,
  Textarea,
} from '../styles/CreateBoardPageStyled';

const CreatePersonalBoard: React.FC = () => {
  const {
    formData,
    customCategory,
    isModalOpen,
    handleChange,
    handleScopeToggle,
    handleCustomCategoryChange,
    submitDashboard,
    closeModal,
  } = usePersonalDashBoard(); // 개인 대시보드 생성 커스텀 훅 사용

  return (
    <CreateDashBoardLayout>
      <Navbar />
      <CreateDashBoardContainer>
        <CreateDashBoardModal>
          <Title>개인 대시보드 생성</Title>
          <SubTitle>제목과 설명, 카테고리를 설정하고 공개 여부를 선택하세요.</SubTitle>

          <CreateForm>
            <Flex>
              <RowWrapper>
                <Label>제목</Label>
                <Input
                  type="text"
                  name="title"
                  placeholder="대시보드 제목을 설정해주세요."
                  width="20rem"
                  value={formData.title}
                  onChange={handleChange}
                />
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

            <RowWrapper>
              <Label>설명</Label>
              <Textarea
                name="description"
                placeholder="대시보드 설명을 설정해주세요."
                width="27.1rem"
                maxLength={300}
                value={formData.description}
                onChange={handleChange}
              />
            </RowWrapper>

            <RowWrapper>
              <Label>카테고리</Label>
              <Select name="category" value={formData.category} onChange={handleChange}>
                <option hidden selected>
                  (선택) 카테고리를 설정해주세요.
                </option>
                <option value="nothing">카테고리 없음</option>
                <option value="userInput">직접 입력</option>
              </Select>
              {/* 직접 입력시 input창 등장 */}
              {formData.category === 'userInput' && (
                <Input
                  type="text"
                  name="category"
                  placeholder="카테고리 이름을 설정해주세요."
                  width="12.7rem"
                  value={customCategory}
                  onChange={handleCustomCategoryChange}
                />
              )}
            </RowWrapper>
          </CreateForm>

          <SubmitBtn onClick={submitDashboard}>대시보드 생성</SubmitBtn>
        </CreateDashBoardModal>
      </CreateDashBoardContainer>

      {/* 작성되지 않은 부분이 있으면 모달창으로 알림 */}
      {isModalOpen && (
        <CustomModal
          title="모든 칸을 작성해주세요."
          subTitle="잠깐! 아직 작성되지 않은 칸이 있습니다."
          onClose={closeModal}
        />
      )}
    </CreateDashBoardLayout>
  );
};

export default CreatePersonalBoard;

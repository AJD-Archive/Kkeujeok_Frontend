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
  DelBtn,
} from '../styles/CreateBoardPageStyled';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

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
    <>
      <Helmet>
        <title>끄적끄적 | 대시보드 생성</title>
      </Helmet>
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
                  type="text"
                  name="title"
                  placeholder="대시보드 제목을 설정해주세요."
                  width="27.1rem"
                  value={formData.title}
                  onChange={handleChange}
                />
              </RowWrapper>

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

              {/* TODO: 사용자 카테고리 받아오기 */}
              <Flex>
                <RowWrapper>
                  <Label>카테고리</Label>
                  <Input
                    type="text"
                    name="category"
                    placeholder="대시보드 카테고리를 설정해주세요."
                    width="20rem"
                    list="categoryList"
                    value={formData.category}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                  <datalist id="categoryList">
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

            <SubmitBtn onClick={submitDashboard}>
              대시보드 {dashboardId ? '수정' : '생성'}
            </SubmitBtn>

            {dashboardId && <DelBtn onClick={submitDelDashboard}>대시보드 삭제</DelBtn>}
          </CreateDashBoardModal>
        </CreateDashBoardContainer>

        {/* 작성되지 않은 부분이 있으면 모달창으로 알림 */}
        {isModalOpen && isEmptyModalOpen && (
          <CustomModal
            title="모든 칸을 작성해주세요."
            subTitle="잠깐! 작성되지 않은 칸이 있습니다."
            onYesClick={handleYesClick}
            onNoClick={handleNoClick}
          />
        )}

        {/* 삭제 동의 모달창 */}
        {isModalOpen && isDelModalOpen && (
          <CustomModal
            title="대시보드를 삭제하시겠습니까?"
            subTitle="한 번 삭제된 대시보드는 되돌릴 수 없습니다."
            onYesClick={handleYesClick}
            onNoClick={handleNoClick}
          />
        )}
      </CreateDashBoardLayout>
    </>
  );
};

export default CreatePersonalBoard;

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Flex from '../components/Flex';

import { FaLock } from 'react-icons/fa';
import { FaEarthAsia } from 'react-icons/fa6';

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
  const [selectedCategory, setSelectedCategory] = useState<string>(''); // 카테고리 설정
  const [selectedScope, setSelectedScope] = useState<boolean>(false); // 공개범위 설정 (true=나만보기, false=전체공개)
  const [inputIntroduction, setInputIntroduction] = useState<string | undefined>('');

  // 카테고리 변경 함수
  const handleChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setSelectedCategory(event.target.value);
  };

  // 공개 범위 설정 함수
  const handleScope = () => {
    setSelectedScope(!selectedScope);
  };

  // 소개글 변경 함수
  const handleIntroduction = (event: {
    target: { value: React.SetStateAction<string | undefined> };
  }) => {
    setInputIntroduction(event?.target.value);
  };

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
                  placeholder="대시보드 제목을 설정해주세요."
                  width="20rem"
                ></Input>
              </RowWrapper>

              <RowWrapper onClick={handleScope}>
                {selectedScope ? (
                  <Scope>
                    <p>나만 보기</p>
                    <FaLock />
                  </Scope>
                ) : (
                  <Scope>
                    <p>전체 공개</p>
                    <FaEarthAsia />
                  </Scope>
                )}
              </RowWrapper>
            </Flex>

            <RowWrapper>
              <Label>설명</Label>
              <Textarea
                placeholder="대시보드 설명을 설정해주세요."
                width="27.1rem"
                maxLength={300}
                value={inputIntroduction}
                onChange={handleIntroduction}
              />
            </RowWrapper>

            <RowWrapper>
              <Label>카테고리</Label>
              <Select value={selectedCategory} onChange={handleChange}>
                <option hidden selected>
                  (선택) 카테고리를 설정해주세요.
                </option>
                <option value="nothing">카테고리 없음</option>
                <option value="userInput">직접 입력</option>
              </Select>
              {selectedCategory === 'userInput' ? (
                <Input
                  type="text"
                  placeholder="카테고리 이름을 설정해주세요."
                  width="12.7rem"
                ></Input>
              ) : null}
            </RowWrapper>
          </CreateForm>

          <SubmitBtn>대시보드 생성</SubmitBtn>
        </CreateDashBoardModal>
      </CreateDashBoardContainer>
    </CreateDashBoardLayout>
  );
};

export default CreatePersonalBoard;

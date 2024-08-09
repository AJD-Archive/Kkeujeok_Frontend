import React, { useState } from 'react';
import Navbar from '../components/Navbar';

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
  RowWrapper,
  Textarea,
  InvitedBtn,
  Member,
  MemberImage,
  MemberEmail,
  MemberState,
  MemberWrapper,
} from '../styles/CreateBoardPageStyled';
import Flex from '../components/Flex';

const CreateTeamBoard: React.FC = () => {
  const [inputIntroduction, setInputIntroduction] = useState<string | undefined>(''); // 팀 소개글 저장
  const [emailInput, setEmailInput] = useState<string>(''); // 팀원 이메일 저장 (input)
  const [members, setMembers] = useState<string[]>([]); // 팀원 이메일 리스트

  // 소개글 입력 함수
  const handleIntroduction = (event: {
    target: { value: React.SetStateAction<string | undefined> };
  }) => {
    setInputIntroduction(event?.target.value);
  };

  // 팀원 이메일 입력 함수
  const handleEmailInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInput(event.target.value);
  };

  // 이메일 전송 처리 함수 : 팀원 리스트에 추가 후 화면에 보여줌
  const handleAddMember = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault(); // 버튼 기본 동작인 새로고침 방지

    if (emailInput) {
      setMembers(prevMembers => [...prevMembers, emailInput]);
      setEmailInput('');
    }
  };

  return (
    <CreateDashBoardLayout>
      <Navbar />
      <CreateDashBoardContainer>
        <CreateDashBoardModal>
          <Title>팀 대시보드 생성</Title>
          <SubTitle>팀 이름과 팀 소개를 설정하고 팀원을 초대하세요.</SubTitle>

          <CreateForm>
            <Flex alignItems="flex-start">
              <Flex flexDirection="column">
                <RowWrapper>
                  <Label>팀 이름</Label>
                  <Input type="text" placeholder="팀 이름을 입력해주세요." width="15rem"></Input>
                </RowWrapper>

                <RowWrapper>
                  <Label>팀 소개</Label>
                  <Textarea
                    placeholder="간단하게 팀을 소개해주세요."
                    width="15rem"
                    maxLength={300}
                    value={inputIntroduction}
                    onChange={handleIntroduction}
                  />
                </RowWrapper>
              </Flex>

              <Flex flexDirection="column" alignItems="center">
                <RowWrapper>
                  <Label>팀원</Label>
                  <Input
                    type="text"
                    placeholder="이메일을 입력해주세요."
                    width="15rem"
                    value={emailInput}
                    onChange={handleEmailInput}
                  ></Input>
                  <InvitedBtn onClick={handleAddMember}>초대</InvitedBtn>
                </RowWrapper>

                <MemberWrapper>
                  {members.map((member, index) => (
                    <Member key={index}>
                      <MemberImage></MemberImage>
                      <MemberEmail>{member}</MemberEmail>
                      <MemberState>전송</MemberState>
                    </Member>
                  ))}
                </MemberWrapper>
              </Flex>
            </Flex>
          </CreateForm>

          <SubmitBtn>대시보드 생성</SubmitBtn>
        </CreateDashBoardModal>
      </CreateDashBoardContainer>
    </CreateDashBoardLayout>
  );
};

export default CreateTeamBoard;

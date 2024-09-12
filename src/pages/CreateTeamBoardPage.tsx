import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useLocation, useNavigate } from 'react-router-dom';

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
  DelBtn,
} from '../styles/CreateBoardPageStyled';
import Flex from '../components/Flex';
import { TeamDashboardInfoResDto } from '../types/TeamDashBoard';
import {
  createTeamDashBoard,
  deleteTeamDashboard,
  getTeamDashboard,
  patchTeamDashBoard,
} from '../api/TeamDashBoardApi';
import useModal from '../hooks/useModal';
import CustomModal from '../components/CustomModal';

const CreateTeamBoard = () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 훅
  const location = useLocation();
  let dashboardId = location.pathname.split('/').pop() || null;
  if (dashboardId === 'createTeamBoard') dashboardId = null; // dashboard 첫 생성시 dashboard id 값을 null로 만들어 줌
  const { isModalOpen, openModal, handleYesClick, handleNoClick } = useModal(); // 모달창 관련 훅 호출
  const [isDelModalOpen, setIsDelModalOpen] = useState<boolean>(false);
  const [isEmptyModalOpen, setIsEmptyModalOpen] = useState<boolean>(false);
  const [emailInput, setEmailInput] = useState<string>(''); // 팀원 이메일 저장 (input)
  const [members, setMembers] = useState<string[]>([]); // 팀원 이메일 리스트
  const [formData, setFormData] = useState<TeamDashboardInfoResDto>({
    title: '',
    description: '',
    invitedEmails: [],
  });

  // * 사용자 대시보드 해시태그 불러오기 & 대시보드 수정이라면 대시보드 상세 데이터 불러오기
  const fetchData = async () => {
    if (dashboardId) {
      const data = await getTeamDashboard(dashboardId);
      setFormData({
        title: data?.title ?? '', // 제목
        description: data?.description ?? '', // 설명
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [dashboardId]);

  // input 데이터 설정 함수 (제목, 설명)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  // 이메일 전송 처리 함수 : 팀원 리스트에 추가 후 화면에 보여줌
  const handleAddMember = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault(); // 버튼 기본 동작인 새로고침 방지

    if (emailInput) {
      setMembers(prevMembers => [...prevMembers, emailInput]);
      setEmailInput('');
    }
  };

  // 제출시 빈 칸이 있나 확인하는 함수 (있다면 true)
  const validateFormData = (formData: TeamDashboardInfoResDto): boolean => {
    return Object.values(formData).some(value => value === '');
  };

  // 대시보드 생성(제출) 함수
  const submitTeamDashboard = async () => {
    // 빈 작성란이 있으면 모달창 띄우기. 모두 작성되었으면 최종 제출
    if (validateFormData(formData)) {
      setIsEmptyModalOpen(true);
      const handleModalClose = () => setIsEmptyModalOpen(false);
      openModal('normal', handleModalClose); // yes, no 모두 모달창 끄도록 호출
    } else {
      try {
        const responseDashboardId = dashboardId
          ? await patchTeamDashBoard(dashboardId, formData) // 기존 대시보드 수정
          : await createTeamDashBoard(formData); // 새 대시보드 생성
        navigate(`/${responseDashboardId}`); // 해당 대시보드 페이지로 이동
      } catch (error) {
        console.error('팀 대시보드 생성 및 수정시 오류 발생!', error);
      }
    }
  };

  // * 팀 대시보드 삭제 api
  const deleteDashboard = async () => {
    if (dashboardId) {
      await deleteTeamDashboard(dashboardId);
      navigate('/');
    }
  };

  // * 팀 대시보드 삭제 모달창
  const submitDelDashboard = () => {
    setIsDelModalOpen(true);
    const handleModalClose = () => setIsDelModalOpen(false);
    openModal('yes', deleteDashboard, handleModalClose); // yes 버튼이 눌릴 때만 대시보드 삭제 api 요청
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
                  <Input
                    type="text"
                    placeholder="팀 이름을 입력해주세요."
                    width="15rem"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                  ></Input>
                </RowWrapper>

                <RowWrapper>
                  <Label>팀 소개</Label>
                  <Textarea
                    placeholder="간단하게 팀을 소개해주세요."
                    width="15rem"
                    maxLength={300}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
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
                    // onChange={handleEmailInput}
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

          <SubmitBtn onClick={submitTeamDashboard}>
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
  );
};

export default CreateTeamBoard;

/*
todo: 팀 대시보드 삭제 코드는 완료. 팀 대시보드 get, patch 추가 해야 함.
?? 팀 수정 코드는 있는데 patch 함수 호출하면 에러남. 500 에러. memberList때문에 그런건가?
*/

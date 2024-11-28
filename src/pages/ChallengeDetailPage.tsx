import Flex from '../components/Flex';
import Navbar from '../components/Navbar';
import * as S from '../styles/ChallengeStyled';
import leftarrow from '../img/leftarrow.png';
import editBtn from '../img/edit.png';
import delBtn from '../img/delete2.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { deleteChallenge, getChallengeDetail, withdrawChallenge } from '../api/ChallengeApi';
import {
  Challenge,
  ChallengeCategory,
  ChallengeCycle,
  ChallengeCycleDetail_Monthly,
  ChallengeCycleDetail_Weekly,
} from '../types/ChallengeType';
import defaultImg from '../img/default.png';
import CustomModal from '../components/CustomModal';
import useModal from '../hooks/useModal';
import JoinChallengeModal from '../components/JoinChallengeModal';
import { Helmet } from 'react-helmet-async';
import { userInfoApi } from '../api/UserApi';
import { useQuery } from '@tanstack/react-query';

const ChallengeDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const challengeId = pathname.split('/').pop();
  const challengeTitle = location.state?.title;

  const [challengeData, setChallengeData] = useState<Challenge>({ representImage: undefined });
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);
  const { isModalOpen, openModal, handleYesClick, handleNoClick } = useModal(); // 모달창 관련 훅 호출
  const [join, setJoin] = useState<boolean>(false);
  const [isDelModalOpen, setIsDelModalOpen] = useState<boolean>(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState<boolean>(false);

  const { data: UserInfo, refetch: refetchTeamDashboard } = useQuery({
    queryKey: ['userinfo'],
    queryFn: userInfoApi,
  });

  // * 챌린지 상세보기 데이터 받아오기
  const fetchedData = async () => {
    if (challengeId) {
      const res = await getChallengeDetail(challengeId);
      if (res) {
        setChallengeData(res);
      }
    }
  };

  useEffect(() => {
    fetchedData();
  }, []);

  // * 파일 이미지 url을 string으로 변환
  useEffect(() => {
    if (challengeData.representImage instanceof File) {
      // File 타입일 경우 URL로 변환
      const objectUrl = URL.createObjectURL(challengeData.representImage);
      setImageSrc(objectUrl);

      // 메모리 누수를 방지하기 위해 컴포넌트가 언마운트될 때 URL 해제
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      // string 타입일 경우 그대로 사용
      setImageSrc(challengeData.representImage);
    }
  }, [challengeData]);

  // * 날짜 포맷 변경
  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-').map(part => part.trim());

    return `${year}년 ${month}월 ${day}일`;
  };

  // * 오늘 날짜와 비교 함수 : 오늘이 챌린지 종료 날짜보다 지났으면 false
  const isDateValid = (dateString?: string) => {
    if (!dateString) return false;
    const today = new Date();
    const givenDate = new Date(dateString);
    return givenDate <= today;
  };

  // * 챌린지 삭제 api
  const delChallenge = async () => {
    if (challengeId) {
      await deleteChallenge(challengeId);
      navigate('/challenge');
    }
  };

  // * 챌린지 삭제 모달창
  const submitDelChallenge = () => {
    setIsDelModalOpen(true);
    const handleModalClose = () => setIsDelModalOpen(false);
    openModal('yes', delChallenge, handleModalClose); // yes 버튼이 눌릴 때만 대시보드 삭제 api 요청
  };

  // * 챌린지 참여
  const joinChallenge = () => {
    setJoin(!join);
  };

  // * 챌린지 탈퇴
  const cancelChallenge = async () => {
    if (challengeId) {
      await withdrawChallenge(challengeId);
      fetchedData();
    }
  };

  // * 챌린지 탈퇴 모달창
  const submitWithdrawChallenge = () => {
    setIsWithdrawModalOpen(true);
    const isWithdrawModalOpen = () => setIsWithdrawModalOpen(false);
    openModal('yes', cancelChallenge, isWithdrawModalOpen);
  };
  const onMypage = () => {
    navigate(`/mypage`);
  };

  const onFriendPage = (id: string) => {
    navigate(`/friendpage/${id}`, {
      state: { wrapper: true },
    });
  };

  return (
    <>
      <Helmet>
        <title>끄적끄적 | &apos;{challengeTitle}&apos; 챌린지</title>
      </Helmet>
      <S.MainDashBoardLayout>
        <Navbar />
        <S.MainDashBoardContainer>
          <S.DetailHeader>
            <Flex>
              <S.BackButton src={leftarrow} onClick={() => navigate(-1)} /> {/* 뒤로가기 버튼 */}
              <Flex flexDirection="column" alignItems="flex-start">
                <S.DetaileSubTitle>
                  {challengeData.category &&
                    ChallengeCategory[challengeData.category as keyof typeof ChallengeCategory]}
                </S.DetaileSubTitle>
                <S.DetailTitle>{challengeData.title}</S.DetailTitle>
              </Flex>
            </Flex>
            <Flex>
              {/* 생성자도 참여하기 버튼을 통해 챌린지에 참여 */}
              {challengeData.isAuthor && (
                <S.EditDelButtonWrapper>
                  <S.EditDelButton
                    src={editBtn}
                    alt="수정 버튼"
                    onClick={() => {
                      navigate(`/challenge/create/${challengeId}`);
                    }}
                  />
                  <S.EditDelButton src={delBtn} alt="삭제 버튼" onClick={submitDelChallenge} />
                </S.EditDelButtonWrapper>
              )}

              {/* 참여하기 or 탈퇴하기 버튼 */}
              {isDateValid(challengeData?.endDate) ? (
                <S.QuitButton>챌린지 마감</S.QuitButton> // 챌린지 종료됨
              ) : challengeData.isParticipant ? ( // 챌린지 종료되지 않음, 참여 여부에 따라 버튼 표시
                <S.QuitButton onClick={submitWithdrawChallenge}>탈퇴하기</S.QuitButton>
              ) : (
                <S.JoinButton onClick={joinChallenge}>참여하기</S.JoinButton>
              )}

              {join && challengeId && (
                <JoinChallengeModal
                  challengeId={challengeId}
                  onNoClick={joinChallenge}
                  fetchedData={fetchedData}
                />
              )}
            </Flex>
          </S.DetailHeader>

          <S.SectionTitle>챌린지 정보</S.SectionTitle>

          <S.ChallengeDetailContainer>
            <Flex>
              <S.ChallengeThumbnail src={imageSrc || defaultImg} />
              <S.DetailContainer>
                <Flex justifyContent="space-between" alignItems="flex-start">
                  <S.DetailContentWrapper>
                    <S.DetailTitle>{challengeData.title}</S.DetailTitle>
                    <S.DetailDate>
                      {`${formatDate(challengeData.startDate ?? '')} ~ ${formatDate(challengeData.endDate ?? '')}`}
                    </S.DetailDate>
                    <S.DetailContent>
                      <p>{challengeData.contents}</p>
                    </S.DetailContent>
                  </S.DetailContentWrapper>
                  <S.DetailSquareWrapper>
                    <S.DetailRealTimeCountSquare>
                      {challengeData?.participantCount}명 참여 중
                    </S.DetailRealTimeCountSquare>
                    <S.DetailTermSquare>
                      {challengeData.cycle
                        ? ChallengeCycle[challengeData.cycle as keyof typeof ChallengeCycle]
                        : '알 수 없는 주기'}{' '}
                      {challengeData.cycle === 'WEEKLY' &&
                        Array.isArray(challengeData.cycleDetails) &&
                        challengeData.cycleDetails
                          .map(
                            (detail: string) =>
                              ChallengeCycleDetail_Weekly[
                                detail as keyof typeof ChallengeCycleDetail_Weekly
                              ]
                          )
                          .join(', ')}
                      {challengeData.cycle === 'MONTHLY' &&
                        Array.isArray(challengeData.cycleDetails) &&
                        challengeData.cycleDetails
                          .map(
                            (detail: string) =>
                              ChallengeCycleDetail_Monthly[
                                detail as keyof typeof ChallengeCycleDetail_Monthly
                              ] + '일'
                          )
                          .join(', ')}
                    </S.DetailTermSquare>
                  </S.DetailSquareWrapper>
                </Flex>

                <Flex justifyContent="space-between" alignItems="flex-end">
                  <Flex flexDirection="column" alignItems="flex-start">
                    <S.SubTitle>블록 미리보기</S.SubTitle>
                    <S.ChallengeBlockPriview>
                      <h3>{challengeData.title}</h3>
                      <p>
                        {challengeData.cycle
                          ? ChallengeCycle[challengeData.cycle as keyof typeof ChallengeCycle]
                          : '알 수 없는 주기'}{' '}
                        {challengeData.cycle === 'WEEKLY' &&
                          Array.isArray(challengeData.cycleDetails) &&
                          challengeData.cycleDetails
                            .map(
                              (detail: string) =>
                                ChallengeCycleDetail_Weekly[
                                  detail as keyof typeof ChallengeCycleDetail_Weekly
                                ]
                            )
                            .join(', ')}
                        {challengeData.cycle === 'MONTHLY' &&
                          Array.isArray(challengeData.cycleDetails) &&
                          challengeData.cycleDetails
                            .map(
                              (detail: string) =>
                                ChallengeCycleDetail_Monthly[
                                  detail as keyof typeof ChallengeCycleDetail_Monthly
                                ] + '일'
                            )
                            .join(', ')}
                      </p>
                    </S.ChallengeBlockPriview>
                  </Flex>

                  <S.ChallengeCreatorContainer>
                    <S.DetaileSubTitle>챌린지 장</S.DetaileSubTitle>
                    <Flex
                      alignItems="center"
                      onClick={() => {
                        if (challengeData.authorId)
                          String(UserInfo?.data.memberId) === String(challengeData.authorId)
                            ? onMypage()
                            : onFriendPage(challengeData.authorId);
                      }}
                    >
                      <S.ProfileImage src={challengeData.authorProfileImage} />
                      <span>{challengeData.authorName}</span>
                    </Flex>
                  </S.ChallengeCreatorContainer>
                </Flex>
              </S.DetailContainer>
            </Flex>
          </S.ChallengeDetailContainer>

          <S.SectionTitle>실시간 완료</S.SectionTitle>

          {/* 사용자 프로필 누르면 프로필 조회 가능해야함 */}
          <S.RealTimeContainer>
            {challengeData?.completedMembers && challengeData.completedMembers.length > 0 ? (
              challengeData.completedMembers.map((member, index) => (
                <S.RealTimeComponent
                  key={index}
                  onClick={() => {
                    if (member.memberId) {
                      String(UserInfo?.data.memberId) === String(member.memberId)
                        ? onMypage()
                        : onFriendPage(member.memberId);
                    }
                  }}
                >
                  <S.RealTimeUserImg src={member.picture} />
                  <S.RealTimeUserName>{member.nickname}</S.RealTimeUserName>
                </S.RealTimeComponent>
              ))
            ) : (
              <S.errorMessage>챌린지를 완료한 첫 번째 주인공이 되어보세요!</S.errorMessage>
            )}
          </S.RealTimeContainer>

          {/* 챌린지 삭제 동의 모달창 */}
          {isModalOpen && isDelModalOpen && (
            <CustomModal
              title="챌린지를 삭제하시겠습니까?"
              subTitle="한 번 삭제된 챌린지는 되돌릴 수 없습니다."
              onYesClick={handleYesClick}
              onNoClick={handleNoClick}
            />
          )}

          {/* 챌린지 탈퇴 동의 모달창 */}
          {isModalOpen && isWithdrawModalOpen && (
            <CustomModal
              title="챌린지를 탈퇴하시겠습니까?"
              subTitle="새로운 도전이 기다리고 있습니다!"
              onYesClick={handleYesClick}
              onNoClick={handleNoClick}
            />
          )}
        </S.MainDashBoardContainer>
      </S.MainDashBoardLayout>
    </>
  );
};

export default ChallengeDetailPage;

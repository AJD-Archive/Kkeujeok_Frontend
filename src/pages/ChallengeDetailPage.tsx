import Flex from '../components/Flex';
import Navbar from '../components/Navbar';
import * as S from '../styles/ChallengeStyled';
import leftarrow from '../img/leftarrow.png';
import editBtn from '../img/edit.png';
import delBtn from '../img/delete2.png';
import { useNavigate } from 'react-router-dom';

const ChallengeDetailPage = () => {
  const navigate = useNavigate();

  return (
    <S.MainDashBoardLayout>
      <Navbar />
      <S.MainDashBoardContainer>
        <S.DetailHeader>
          <Flex>
            <S.BackButton src={leftarrow} onClick={() => navigate(-1)} /> {/* 뒤로가기 버튼 */}
            <Flex flexDirection="column" alignItems="flex-start">
              <S.DetaileSubTitle>카테고리</S.DetaileSubTitle>
              <S.DetailTitle>챌린지 제목</S.DetailTitle>
            </Flex>
          </Flex>
          {/* 생성자는 수정 / 삭제 버튼 */}
          {/* <Flex>
            <S.EditDelButton src={editBtn} alt="수정 버튼" />
            <S.EditDelButton src={delBtn} alt="수정 버튼" />
          </Flex> */}

          {/* 사용자는 참여하기 or 탈퇴하기 버튼 */}
          <S.JoinButton>참여하기</S.JoinButton>
          {/* <S.QuitButton>탈퇴하기</S.QuitButton> */}
        </S.DetailHeader>

        <S.SectionTitle>챌린지 정보</S.SectionTitle>

        <S.ChallengeDetailContainer>
          <Flex>
            <S.ChallengeThumbnail></S.ChallengeThumbnail>
            <S.DetailContainer>
              <Flex justifyContent="space-between" alignItems="flex-start">
                <S.DetailContentWrapper>
                  <S.DetailTitle>챌린지 제목</S.DetailTitle>
                  <S.DetailContent>
                    <p>
                      가나다라 가나다라 가나다라 가나다라 가나다라 가나다라 가나다라 가나다라
                      가나다라 가나다라 가나다라 가나다라 가나다라 가나다라 가나다라 가나다라
                      가나다라 가나다라 가나다라 가나다라 가나다라 가나다라 가나다라 가나다라
                    </p>
                  </S.DetailContent>
                </S.DetailContentWrapper>
                <S.DetailSquareWrapper>
                  <S.DetailRealTimeCountSquare>1422명 참여</S.DetailRealTimeCountSquare>
                  <S.DetailTermSquare>매주 수요일</S.DetailTermSquare>
                </S.DetailSquareWrapper>
              </Flex>

              <Flex justifyContent="space-between" alignItems="flex-end">
                <Flex flexDirection="column" alignItems="flex-start">
                  <S.SubTitle>블록 미리보기</S.SubTitle>
                  <S.ChallengeBlockPriview>
                    <h3>챌린지 제목 챌린지</h3>
                    <p>매주 수요매주 수요매주 수요매주 수요매주 수요일</p>
                  </S.ChallengeBlockPriview>
                </Flex>

                <S.ChallengeCreatorContainer>
                  <S.DetaileSubTitle>챌린지 장</S.DetaileSubTitle>
                  <S.ProfileImage />
                  <span>이름</span>
                </S.ChallengeCreatorContainer>
              </Flex>
            </S.DetailContainer>
          </Flex>
        </S.ChallengeDetailContainer>

        <S.SectionTitle>실시간 완료</S.SectionTitle>
        <S.RealTimeContainer>
          <S.RealTimeComponent>
            <S.RealTimeUserImg />
            <S.RealTimeUserName>이름이름</S.RealTimeUserName>
          </S.RealTimeComponent>

          <S.RealTimeComponent>
            <S.RealTimeUserImg />
            <S.RealTimeUserName>이름이름</S.RealTimeUserName>
          </S.RealTimeComponent>

          <S.RealTimeComponent>
            <S.RealTimeUserImg />
            <S.RealTimeUserName>이름이름</S.RealTimeUserName>
          </S.RealTimeComponent>
        </S.RealTimeContainer>
      </S.MainDashBoardContainer>
    </S.MainDashBoardLayout>
  );
};

export default ChallengeDetailPage;

import { useEffect, useState } from 'react';
import Flex from '../components/Flex';
import Navbar from '../components/Navbar';
import * as S from '../styles/ChallengeStyled';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  ChallengeCategory,
  ChallengeCycleDetail_Monthly,
  ChallengeCycleDetail_Weekly,
} from '../types/ChallengeType';
import { Challenge } from '../types/ChallengeType';
import { createChallenge, getChallengeDetail, patchChallenge } from '../api/ChallengeApi';
import { stringify } from 'querystring';
import { useLocation, useNavigate } from 'react-router-dom';
import useModal from '../hooks/useModal';
import CustomModal from '../components/CustomModal';

// * 날짜 포맷 설정 함수
const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const CreateChallengePage = () => {
  const location = useLocation();
  let challengeId = location.pathname.split('/').pop() || null;
  if (challengeId === 'create') challengeId = null;

  const { isModalOpen, openModal, handleYesClick, handleNoClick } = useModal(); // 모달창 관련 훅 호출
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Challenge>({
    challengeId: '0',
    title: '',
    contents: '',
    category: 'HEALTH_AND_FITNESS',
    cycle: 'DAILY',
    cycleDetails: [],
    startDate: formatDate(new Date()),
    endDate: formatDate(new Date()),
    representImage: '',
    authorName: '',
    authorProfileImage: '',
    blockName: '',
  });
  const [isHovering, setIsHovering] = useState(false); // 미리보기 상태 추가

  // * 챌린지 수정시 챌린지 상세 데이터 불러오기
  const fetchData = async () => {
    if (challengeId) {
      const data = await getChallengeDetail(challengeId);
      setFormData({
        challengeId: data?.challengeId ?? '0',
        title: data?.title ?? '',
        contents: data?.contents ?? '',
        category: data?.category ?? 'HEALTH_AND_FITNESS',
        cycle: data?.cycle ?? 'DAILY',
        cycleDetails: data?.cycleDetails ?? [],
        startDate: data?.startDate ?? formatDate(new Date()),
        endDate: data?.endDate ?? formatDate(new Date()),
        representImage:
          data?.representImage instanceof File
            ? URL.createObjectURL(data.representImage)
            : (data?.representImage ?? ''), // 파일일 때만 URL 생성
        authorName: data?.authorName ?? '',
        authorProfileImage: data?.authorProfileImage ?? '',
        blockName: data?.blockName ?? '',
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [challengeId]);

  // * 폼 데이터 변경 핸들러
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // * 주기 선택 핸들러
  const handleTermChange = (term: string) => {
    setFormData(prevData => ({
      ...prevData,
      cycle: term, // formData.cycle 업데이트
      cycleDetails: [],
    }));
  };

  // * 이미지 파일 선택 핸들러
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // 파일이 없을 수도 있으므로 `undefined` 가능성 있음

    if (file) {
      setFormData(prev => ({ ...prev, representImage: file }));
    }
  };

  // * 날짜 변경 핸들러
  const handleDateChange = (date: Date | null) => {
    setFormData(prev => ({
      ...prev,
      endDate: date ? formatDate(date) : '', // null일 경우 빈 문자열로 설정
    }));
  };

  // * 주기 - '매달'의 렌더링 관련 함수
  // 1부터 31까지의 날짜를 배열로 생성
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
  // 배열을 지정된 크기로 나누는 함수
  const chunkArray = (array: number[], size: number) => {
    const result: number[][] = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };
  const chunks = chunkArray(daysInMonth, 7);

  // * 주기 디테일 변경 핸들러
  const handleCycleDetailClick = (day: number, type: 'day' | 'week') => {
    let dayKey: string | undefined;

    if (type === 'week') {
      // 주간 사이클의 키를 찾음
      dayKey = Object.keys(ChallengeCycleDetail_Weekly).find(
        key =>
          ChallengeCycleDetail_Weekly[key as keyof typeof ChallengeCycleDetail_Weekly] ===
          Object.values(ChallengeCycleDetail_Weekly)[day - 1]
      );
    } else if (type === 'day') {
      // 월간 사이클의 키를 찾음
      dayKey = Object.keys(ChallengeCycleDetail_Monthly).find(
        key =>
          ChallengeCycleDetail_Monthly[key as keyof typeof ChallengeCycleDetail_Monthly] ===
          day.toString()
      );
    }

    if (!dayKey) return;

    setFormData(prevData => {
      // `cycleDetails`가 문자열 배열인지 확인
      const currentCycleDetails = Array.isArray(prevData.cycleDetails) ? prevData.cycleDetails : [];

      // 선택된 상태인지 확인하고 선택 토글
      const isSelected = currentCycleDetails.includes(dayKey);
      const newCycleDetails: string[] = isSelected
        ? currentCycleDetails.filter(d => d !== dayKey) // 선택 해제
        : [...currentCycleDetails, dayKey]; // 선택 추가

      return {
        ...prevData,
        cycleDetails: newCycleDetails,
      };
    });
  };

  // * ChallengeCycleDetail_Monthly의 값에서 키를 찾는 함수
  const getDayKey = (day: number): string | undefined => {
    return Object.keys(ChallengeCycleDetail_Monthly).find(
      key =>
        ChallengeCycleDetail_Monthly[key as keyof typeof ChallengeCycleDetail_Monthly] ===
        day.toString()
    );
  };

  // * isSelected 상태를 결정하는 함수
  const isDaySelected = (day: number): boolean => {
    const dayKey = getDayKey(day);
    return dayKey ? (formData.cycleDetails?.includes(dayKey) ?? false) : false;
  };

  // * 제출시 빈 칸이 있나 확인하는 함수 (있다면 true, 대표 이미지는 선택이라 제외)
  const validateFormData = (formData: Challenge): boolean => {
    return Object.entries(formData).some(([key, value]) => {
      // representImage 필드는 검사에서 제외
      if (key === 'representImage') return false;
      return value === '';
    });
  };

  // * 폼 제출 핸들러
  const handleSubmit = async () => {
    // 빈 작성란이 있으면 모달창 띄우기
    if (validateFormData(formData)) {
      openModal('normal'); // 모달 띄우기 (yes/no 모달)
      return; // 폼 제출 중단
    }

    // 폼 데이터 생성
    const data = new FormData();

    const challengeSaveReqDto = {
      title: formData.title,
      contents: formData.contents,
      category: formData.category,
      cycle: formData.cycle,
      cycleDetails: formData.cycleDetails,
      endDate: formData.endDate,
      blockName: formData.blockName,
    };

    // JSON 데이터를 Blob으로 변환 후 FormData에 추가
    const jsonBlob = new Blob([JSON.stringify(challengeSaveReqDto)], {
      type: 'application/json',
    });
    data.append('challengeSaveReqDto', jsonBlob);

    // 이미지 파일 추가
    if (formData.representImage instanceof File) {
      data.append('representImage', formData.representImage);
    }

    try {
      const responseChallengeId = challengeId
        ? await patchChallenge(challengeId, data) // 기존 대시보드 수정
        : await createChallenge(data); // 새 대시보드 생성

      // 챌린지 페이지로 이동
      navigate(responseChallengeId ? `/challenge/${responseChallengeId}` : `/challenge`);
    } catch (error) {
      console.error('챌린지 생성 및 수정 중 오류 발생!', error);
    }
  };

  return (
    <S.MainDashBoardLayout>
      <Navbar />
      <S.CreateDashBoardContainer>
        <S.CreateDashBoardModal>
          <S.Title>챌린지 {challengeId ? '수정' : '생성'}</S.Title>
          <S.CreateSubTitle>챌린지 팀원 모집 게시글</S.CreateSubTitle>

          <S.RowWrapper>
            <S.Label>제목</S.Label>
            <S.InputForm
              type="text"
              name="title"
              placeholder="챌린지 제목을 설정해주세요."
              width="30rem"
              value={formData.title}
              onChange={handleChange}
            />
          </S.RowWrapper>

          <S.RowWrapper>
            <S.Label>설명</S.Label>
            <S.Textarea
              name="contents"
              placeholder="챌린지 소개를 설정해주세요."
              width="30rem"
              maxLength={800}
              value={formData.contents}
              onChange={handleChange}
            />
          </S.RowWrapper>

          <Flex>
            <S.RowWrapper>
              <S.Label>카테고리</S.Label>
              <S.Select
                name="category"
                width="17.8rem"
                value={formData.category}
                onChange={handleChange}
              >
                {Object.entries(ChallengeCategory).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </S.Select>
            </S.RowWrapper>

            <S.RowWrapper>
              <S.Label>대표 이미지</S.Label>
              <S.FileLabel
                htmlFor="file"
                onMouseEnter={() => setIsHovering(true)} // 마우스 오버 시 상태 업데이트
                onMouseLeave={() => setIsHovering(false)}
              >
                <input type="file" accept="image/*" id="file" onChange={handleFileChange} />
              </S.FileLabel>
              {formData.representImage && (
                <Flex
                  flexDirection="column"
                  style={{
                    position: 'absolute',
                    right: '5rem',
                  }}
                >
                  {/* <p>미리보기</p> */}
                  <img
                    src={
                      typeof formData.representImage === 'string'
                        ? formData.representImage
                        : URL.createObjectURL(formData.representImage)
                    }
                    alt="챌린지 이미지"
                    style={{
                      width: '6rem',
                      height: '6rem',
                      borderRadius: '0.3rem',
                      objectFit: 'cover',
                    }}
                  />
                </Flex>
              )}
            </S.RowWrapper>
          </Flex>

          <S.CreateSubTitle>챌린지 블록</S.CreateSubTitle>
          <S.RowWrapper>
            <S.Label>제목</S.Label>
            <S.InputForm
              type="text"
              name="blockName"
              placeholder="챌린지 블록 제목을 설정해주세요."
              width="30rem"
              value={formData.blockName}
              onChange={handleChange}
            />
          </S.RowWrapper>

          <S.RowWrapper>
            <S.Label>주기</S.Label>
            <S.SelectTerm
              onClick={() => handleTermChange('DAILY')}
              isSelected={formData.cycle === 'DAILY'} // 선택된 상태 확인
            >
              매일
            </S.SelectTerm>
            <S.SelectTerm
              onClick={() => handleTermChange('WEEKLY')}
              isSelected={formData.cycle === 'WEEKLY'} // 선택된 상태 확인
            >
              매주
            </S.SelectTerm>
            <S.SelectTerm
              onClick={() => handleTermChange('MONTHLY')}
              isSelected={formData.cycle === 'MONTHLY'} // 선택된 상태 확인
            >
              매월
            </S.SelectTerm>

            {formData.cycle === 'DAILY' && <S.TermWrapper></S.TermWrapper>}

            {formData.cycle === 'WEEKLY' && (
              <S.TermWrapper>
                {Object.entries(ChallengeCycleDetail_Weekly).map(([key, day], index) => (
                  <S.Week
                    key={key}
                    onClick={() => handleCycleDetailClick(index + 1, 'week')}
                    isSelected={formData.cycleDetails?.includes(key) ?? false} // 키를 사용하여 선택 상태 확인
                  >
                    {day}
                  </S.Week>
                ))}
              </S.TermWrapper>
            )}

            {formData.cycle === 'MONTHLY' && (
              <Flex flexDirection="column">
                {chunks.map((week, index) => (
                  <S.TermWrapper key={index}>
                    {week.map(day => (
                      <S.Month
                        key={day}
                        onClick={() => handleCycleDetailClick(day, 'day')}
                        isSelected={isDaySelected(day)}
                      >
                        {day}
                      </S.Month>
                    ))}
                  </S.TermWrapper>
                ))}
              </Flex>
            )}
          </S.RowWrapper>

          <S.RowWrapper>
            <S.Label>종료 날짜</S.Label>
            <S.EndDateWrapper>
              <S.StyledDatePicker2>
                <DatePicker
                  selected={formData.endDate ? new Date(formData.endDate) : null}
                  onChange={handleDateChange} // 날짜 선택 시 호출될 핸들러
                  showTimeSelect
                  dateFormat="yyyy.MM.dd"
                />
                <p>까지</p>
              </S.StyledDatePicker2>
            </S.EndDateWrapper>
          </S.RowWrapper>

          <S.SubmitBtn onClick={handleSubmit}>챌린지 {challengeId ? '수정' : '생성'}</S.SubmitBtn>
        </S.CreateDashBoardModal>

        {/* 작성되지 않은 부분이 있으면 모달창으로 알림 */}
        {isModalOpen && (
          <CustomModal
            title="모든 칸을 작성해주세요."
            subTitle="잠깐! 작성되지 않은 칸이 있습니다."
            onYesClick={handleYesClick}
            onNoClick={handleNoClick}
          />
        )}
      </S.CreateDashBoardContainer>
    </S.MainDashBoardLayout>
  );
};

export default CreateChallengePage;

import { useState } from 'react';
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
import { createChallenge } from '../api/ChallengeApi';
import { stringify } from 'querystring';

// * 날짜 포맷 설정 함수
const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const CreateChallengePage = () => {
  const [formData, setFormData] = useState<Challenge>({
    title: '',
    contents: '',
    category: 'HEALTH_AND_FITNESS',
    cycle: 'DAILY',
    cycleDetails: [],
    endDate: formatDate(new Date()),
    representImage: '',
    blockName: '',
  });

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
    } else {
      // 파일이 없을 경우 representImage를 빈 문자열로 설정하거나 필요에 따라 다른 처리를 할 수 있습니다
      setFormData(prev => ({ ...prev, representImage: '' }));
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

  // * 폼 제출 핸들러
  const handleSubmit = async () => {
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

    await createChallenge(data);
  };

  return (
    <S.MainDashBoardLayout>
      <Navbar />
      <S.CreateDashBoardContainer>
        <S.CreateDashBoardModal>
          <S.Title>챌린지 생성</S.Title>
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
                width="10rem"
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
              <S.Label>이미지</S.Label>
              <S.FileLabel htmlFor="file">
                <input type="file" accept="image/*" id="file" onChange={handleFileChange} />
              </S.FileLabel>
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

          <S.SubmitBtn onClick={handleSubmit}>챌린지 생성</S.SubmitBtn>
        </S.CreateDashBoardModal>
      </S.CreateDashBoardContainer>
    </S.MainDashBoardLayout>
  );
};

export default CreateChallengePage;

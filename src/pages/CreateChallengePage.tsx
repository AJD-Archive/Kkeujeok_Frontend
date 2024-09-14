import { useState } from 'react';
import Flex from '../components/Flex';
import Navbar from '../components/Navbar';
import * as S from '../styles/ChallengeStyled';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CreateChallengePage = () => {
  // 더미 데이터: 현재 날짜를 기본값으로 설정
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  // 주기 선택 상태
  const [selectedTerm, setSelectedTerm] = useState<string>('매일');

  // 주기 선택 핸들러
  const handleTermChange = (term: string) => {
    setSelectedTerm(term);
  };

  // 날짜 변경 핸들러
  const handleDateChange = (date: Date | null, type: string) => {
    if (type === 'start') {
      setStartDate(date);
    }
  };

  // 더미 parseDate 함수
  const parseDate = (dateString: string): Date => {
    return new Date(dateString);
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
              placeholder="대시보드 제목을 설정해주세요."
              width="30rem"
              // value={formData.title}
              // onChange={handleChange}
            />
          </S.RowWrapper>

          <S.RowWrapper>
            <S.Label>설명</S.Label>
            <S.Textarea
              name="description"
              placeholder="대시보드 설명을 설정해주세요."
              width="30rem"
              maxLength={800}
              // value={formData.description} // 만약 필요하다면
              // onChange={handleChange} // 만약 필요하다면
            />
          </S.RowWrapper>

          <Flex>
            <S.RowWrapper>
              <S.Label>카테고리</S.Label>
              <S.Select width="10rem">
                <option>챌린지</option>
                <option>챌린지</option>
                <option>챌린지</option>
                <option>챌린지</option>
              </S.Select>
            </S.RowWrapper>

            <S.RowWrapper>
              <S.Label>이미지</S.Label>
              <S.FileLabel htmlFor="file">
                <input type="file" accept="image/*" id="file" />
              </S.FileLabel>
            </S.RowWrapper>
          </Flex>

          <S.CreateSubTitle>챌린지 블록</S.CreateSubTitle>
          <S.RowWrapper>
            <S.Label>제목</S.Label>
            <S.InputForm
              type="text"
              name="title"
              placeholder="대시보드 제목을 설정해주세요."
              width="30rem"
              // value={formData.title}
              // onChange={handleChange}
            />
          </S.RowWrapper>

          <S.RowWrapper>
            <S.Label>주기</S.Label>
            <S.SelectTerm onClick={() => handleTermChange('매일')}>매일</S.SelectTerm>
            <S.SelectTerm onClick={() => handleTermChange('매 주')}>매 주</S.SelectTerm>
            <S.SelectTerm onClick={() => handleTermChange('매 월')}>매 월</S.SelectTerm>

            {selectedTerm === '매일' && <S.TermWrapper></S.TermWrapper>}

            {selectedTerm === '매 주' && (
              <S.TermWrapper>
                <S.Week>월</S.Week>
                <S.Week>화</S.Week>
                <S.Week>수</S.Week>
                <S.Week>목</S.Week>
                <S.Week>금</S.Week>
                <S.Week>토</S.Week>
                <S.Week>일</S.Week>
              </S.TermWrapper>
            )}

            {selectedTerm === '매 월' && (
              <S.TermWrapper>
                <S.StyledDatePicker>
                  <DatePicker
                    selected={startDate}
                    onChange={(date: Date | null) => handleDateChange(date, 'start')}
                    showTimeSelect
                    dateFormat="MM.dd"
                  />
                  <p>에 반복</p>
                </S.StyledDatePicker>
              </S.TermWrapper>
            )}
          </S.RowWrapper>

          <S.RowWrapper>
            <S.Label>종료 날짜</S.Label>
            <S.EndDateWrapper>
              <S.StyledDatePicker2>
                <DatePicker
                  selected={startDate}
                  onChange={(date: Date | null) => handleDateChange(date, 'start')}
                  showTimeSelect
                  dateFormat="yyyy.MM.dd"
                />
                <p>까지</p>
              </S.StyledDatePicker2>
            </S.EndDateWrapper>
          </S.RowWrapper>

          <S.SubmitBtn>챌린지 생성</S.SubmitBtn>
        </S.CreateDashBoardModal>
      </S.CreateDashBoardContainer>
    </S.MainDashBoardLayout>
  );
};

export default CreateChallengePage;
